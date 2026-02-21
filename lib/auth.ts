/**
 * ===================================================================
 * Auth Configuration — DB-Based Authentication + EXAWin DB Fallback
 * ===================================================================
 *
 * [GRAND PRINCIPLE] Authentication Flow:
 * 1. Super Admin ENV fallback (always available)
 * 2. Check Neon DB (homepage users)
 * 3. If not found, query EXAWin PostgreSQL DB directly
 * 4. If EXAWin verifies, auto-register in homepage DB (source: 'exawin')
 *
 * [SECURITY] bcryptjs for password hashing, NextAuth v5 sessions.
 * [ROBUST] Direct DB query — no HTTP API dependency, no threading issues.
 * [NO BREAKING CHANGE] Existing session logic preserved.
 * ===================================================================
 */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { Pool } from "pg"

const prisma = new PrismaClient()

// EXAWin DB connection pool (lazy init)
let exawinPool: Pool | null = null
function getExawinPool(): Pool | null {
  if (!process.env.EXAWIN_DATABASE_URL) return null
  if (!exawinPool) {
    // Parse EXAWIN_DATABASE_URL or use individual params
    // Local: unix socket (/var/run/postgresql), Production: TCP connection string
    const dbUrl = process.env.EXAWIN_DATABASE_URL
    const isLocalSocket = !dbUrl.includes('@') && !dbUrl.includes('://')

    exawinPool = isLocalSocket
      ? new Pool({
        host: process.env.EXAWIN_DB_HOST || '/var/run/postgresql',
        database: dbUrl, // Just the DB name for local
        user: process.env.EXAWIN_DB_USER || process.env.USER || 'exaeuler',
        max: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      })
      : new Pool({
        connectionString: dbUrl,
        max: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      })
  }
  return exawinPool
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const email = (credentials.email as string).toLowerCase().trim()
        const password = credentials.password as string

        // ─── Step 1: Super Admin ENV Fallback (always available) ───
        const adminEmail = process.env.ADMIN_EMAIL || "admin@exaeuler.com"
        const adminPassword = process.env.ADMIN_PASSWORD || "exa123456"
        if (email === adminEmail && password === adminPassword) {
          let adminUser = await prisma.user.findUnique({ where: { email } })
          if (!adminUser) {
            const hashed = await bcrypt.hash(password, 12)
            adminUser = await prisma.user.create({
              data: { email, name: "Administrator", password: hashed, role: "ADMIN", emailVerified: true, source: "homepage" }
            })
          }
          await prisma.user.update({ where: { id: adminUser.id }, data: { lastLoginAt: new Date() } })
          return { id: adminUser.id, name: adminUser.name, email: adminUser.email, role: "ADMIN", isAdmin: true }
        }

        // ─── Step 2: Homepage DB Lookup ───
        const dbUser = await prisma.user.findUnique({ where: { email } })
        if (dbUser) {
          if (!dbUser.isActive) return null
          if (!dbUser.emailVerified) return null

          const valid = await bcrypt.compare(password, dbUser.password)
          if (!valid) return null

          await prisma.user.update({ where: { id: dbUser.id }, data: { lastLoginAt: new Date() } })
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            isAdmin: dbUser.role === "ADMIN",
          }
        }

        // ─── Step 3: EXAWin DB Direct Query (no HTTP dependency) ───
        const pool = getExawinPool()
        if (pool) {
          try {
            const result = await pool.query(
              `SELECT id, email, name, password_digest, is_active
               FROM users WHERE LOWER(email) = $1 LIMIT 1`,
              [email]
            )

            if (result.rows.length > 0) {
              const exaUser = result.rows[0]

              if (!exaUser.is_active) return null

              // bcrypt verify (Rails $2a$ == bcryptjs compatible)
              const valid = await bcrypt.compare(password, exaUser.password_digest)
              if (!valid) return null

              // Auto-register EXAWin user in homepage DB
              const hashed = await bcrypt.hash(password, 12)
              const newUser = await prisma.user.create({
                data: {
                  email,
                  name: exaUser.name || "EXAWin User",
                  password: hashed,
                  role: "USER",
                  source: "exawin",
                  emailVerified: true,
                  lastLoginAt: new Date(),
                },
              })
              return { id: newUser.id, name: newUser.name, email: newUser.email, role: "USER", isAdmin: false }
            }
          } catch (err) {
            console.error("[Auth] EXAWin DB query failed:", err)
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.isAdmin = (user as any).isAdmin || (user as any).role === "ADMIN"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
          ; (session.user as any).role = token.role
          ; (session.user as any).isAdmin = token.isAdmin
      }
      return session
    },
  },
})
