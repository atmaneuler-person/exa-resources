'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/shared/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const translations = {
  en: {
    title: "Authorized Access",
    desc: "Please sign in to view the documentation.",
    email_label: "Email address",
    password_label: "Password",
    email_placeholder: "Email address",
    password_placeholder: "Password",
    submit_btn: "Sign in",
    loading_btn: "Signing in...",
    error_msg: "Invalid email or password.",
    generic_error: "An error occurred. Please try again."
  },
  ko: {
    title: "로그인",
    desc: "문서 및 서비스에 액세스하려면 로그인하십시오.",
    email_label: "이메일 주소",
    password_label: "비밀번호",
    email_placeholder: "이메일 주소",
    password_placeholder: "비밀번호",
    submit_btn: "로그인",
    loading_btn: "로그인 중...",
    error_msg: "이메일 또는 비밀번호가 올바르지 않습니다.",
    generic_error: "오류가 발생했습니다. 다시 시도하십시오."
  },
  ja: {
    title: "ログイン",
    desc: "ドキュメントやサービスにアクセスするにはサインインしてください。",
    email_label: "メールアドレス",
    password_label: "パスワード",
    email_placeholder: "メールアドレス",
    password_placeholder: "パスワード",
    submit_btn: "サインイン",
    loading_btn: "サインイン中...",
    error_msg: "メールアドレスまたはパスワードが無効です。",
    generic_error: "エラーが発生しました。もう一度お試しください。"
  },
  zh: {
    title: "授权访问",
    desc: "请登录以查看文档和服务。",
    email_label: "电子邮件地址",
    password_label: "密码",
    email_placeholder: "电子邮件地址",
    password_placeholder: "密码",
    submit_btn: "登录",
    loading_btn: "登录中...",
    error_msg: "电子邮件或密码无效。",
    generic_error: "发生错误。请重试。"
  },
  vi: {
    title: "Truy cập được Ủy quyền",
    desc: "Vui lòng đăng nhập để xem tài liệu và dịch vụ.",
    email_label: "Địa chỉ Email",
    password_label: "Mật khẩu",
    email_placeholder: "Địa chỉ Email",
    password_placeholder: "Mật khẩu",
    submit_btn: "Đăng nhập",
    loading_btn: "Đang đăng nhập...",
    error_msg: "Email hoặc mật khẩu không hợp lệ.",
    generic_error: "Đã xảy ra lỗi. Vui lòng thử lại."
  }
};



// ... (translations object remains the same)

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  // @ts-ignore
  const t = translations[lang] || translations['en'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t.error_msg);
      } else {
        router.push('/category/Docs'); // Redirect to docs on success
        router.refresh();
      }
    } catch (err) {
      setError(t.generic_error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="text-center">
            <span className="text-4xl">🔒</span>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t.desc}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">{t.email_label}</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder={t.email_placeholder}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">{t.password_label}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder={t.password_placeholder}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                variant="default" 
              >
                {isLoading ? t.loading_btn : t.submit_btn}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
