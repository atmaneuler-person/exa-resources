/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, Eye, Clock, ArrowUpRight, ArrowDownRight, 
  Globe, MessageSquare, Heart, Bookmark, Activity, Calendar
} from 'lucide-react';
import clsx from 'clsx';
import { allBlogs } from 'contentlayer/generated';

// TIGHTER MOCK DATA (History remains mock for now, but metrics are real)
const deviceData = [
  { name: 'Desktop', value: 65 }, { name: 'Mobile', value: 30 }, { name: 'Tablet', value: 5 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981'];

const StatCard = ({ title, value, change, isUp, icon: Icon, color = "orange" }: any) => (
  <div className="bg-white dark:bg-gray-900 px-4 py-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-orange-200">
    <div className="flex justify-between items-center mb-3">
      <div className={clsx(
        "p-2 rounded-lg",
        color === "orange" ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600" :
        color === "green" ? "bg-green-50 dark:bg-green-900/20 text-green-600" :
        "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
      )}>
        <Icon size={18} />
      </div>
      {change && (
        <div className={clsx(
            "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
            isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
            {isUp ? "+" : ""}{change}
        </div>
      )}
    </div>
    <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</h3>
    <p className="text-xl font-bold mt-1 tracking-tight text-gray-900 dark:text-white">{value}</p>
  </div>
);

export default function AdminStatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [dbStats, setDbStats] = useState<any>(null);
  const [period, setPeriod] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  
  const isAdmin = (session?.user as any)?.isAdmin;

  const fetchStats = (p: string) => {
    setIsLoading(true);
    fetch(`/api/admin/stats?period=${p}`)
      .then(res => res.json())
      .then(data => {
          setDbStats(data);
          setIsLoading(false);
      })
      .catch(err => {
          console.error(err);
          setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsClient(true);
    if (status === 'authenticated' && !isAdmin) {
       router.push('/');
    } else if (status === 'unauthenticated') {
       router.push('/login');
    }

    if (isAdmin) {
      fetchStats(period);
    }
  }, [status, isAdmin, router, period]);

  if (status === 'loading' || !isClient) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" /></div>;
  if (!session || !isAdmin) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#020617]">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 px-4 max-w-6xl mx-auto w-full">
        {/* Header & Period Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Insights and analytics for the last {period === 'all' ? 'total' : period}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/comments')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <MessageSquare size={14} />
              댓글 관리
            </button>
            
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1 rounded-lg">
               {['all', 'today', 'week', 'month'].map((p) => (
                 <button
                   key={p}
                   onClick={() => setPeriod(p)}
                   className={clsx(
                     "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                     period === p 
                      ? "bg-orange-600 text-white shadow-sm" 
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                   )}
                 >
                   {p}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Real-time Indicator */}
        <div className="flex items-center gap-2 mb-6 animate-pulse">
           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
           <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
             Live: <span className="text-sm ml-1">{dbStats?.liveVisitors || 0}</span> Users Online
           </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatCard title="Real Views" value={dbStats?.totalViews?.toLocaleString() || "0"} icon={Eye} color="orange" />
          <StatCard title="Bots" value={dbStats?.totalBotViews?.toLocaleString() || "0"} icon={Globe} />
          <StatCard title="Live" value={dbStats?.liveVisitors?.toLocaleString() || "0"} icon={Activity} color="green" />
          <StatCard title="Visitors" value={dbStats?.totalViews ? Math.floor(dbStats.totalViews * 0.4).toLocaleString() : "0"} icon={Users} />
          <StatCard title="Comments" value={dbStats?.totalComments?.toLocaleString() || "0"} icon={MessageSquare} />
          <StatCard title="Likes" value={dbStats?.totalLikes?.toLocaleString() || "0"} icon={Heart} />
        </div>



        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
            {isLoading && (
               <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10 rounded-xl">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
               </div>
            )}
            <h2 className="text-sm font-bold mb-4 flex items-center text-gray-700 dark:text-gray-300">
               Visitor Activity
            </h2>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dbStats?.dailyViews || []}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="views" stroke="#f97316" strokeWidth={2} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">Device Source</h2>
            <div className="h-[140px] w-full">
              {(() => {
                 const currentDeviceData = dbStats?.topDevices && dbStats.topDevices.length > 0
                    ? dbStats.topDevices
                    : [{ name: 'Collecting...', value: 1 }];
                 
                 const total = currentDeviceData.reduce((acc: number, curr: any) => acc + curr.value, 0);

                 return (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie data={currentDeviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={2} dataKey="value">
                            {currentDeviceData.map((e: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="space-y-2 mt-4">
                        {dbStats?.topDevices?.map((d: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-semibold">
                            <div className="flex items-center"><div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: COLORS[i % COLORS.length]}} /> {d.name}</div>
                            <span>{Math.round((d.value / total) * 100)}%</span>
                            </div>
                        )) || <div className="text-[10px] text-gray-400 text-center py-2">Collecting device data...</div>}
                    </div>
                  </>
                 );
              })()}
            </div>
          </div>
        </div>

        {/* Top Countries & Referrers Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Countries */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold mb-4 flex items-center text-gray-700 dark:text-gray-300">
              <Globe size={14} className="mr-2 opacity-70"/> Top Countries
            </h2>
            <div className="space-y-4">
              {dbStats?.topCountries?.map((item: any, i: number) => {
                const max = dbStats?.topCountries?.[0]?.count || 1;
                const percent = Math.round((item.count / max) * 100);
                return (
                  <div key={i} className="relative">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="flex items-center gap-2">
                        <span className="text-gray-400 font-mono text-[10px]">#{i+1}</span>
                        {item.country === 'Unknown' ? '🏳️ Unknown' : item.country}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              }) || (
                <div className="text-[10px] text-gray-400 italic py-4 text-center">No country data yet.</div>
              )}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold mb-4 flex items-center text-gray-700 dark:text-gray-300">
              <ArrowUpRight size={14} className="mr-2 opacity-70"/> Top Referrers
            </h2>
            <div className="space-y-4">
              {dbStats?.topReferrers?.map((item: any, i: number) => {
                const max = dbStats?.topReferrers?.[0]?.count || 1;
                const percent = Math.round((item.count / max) * 100);
                return (
                  <div key={i} className="relative">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="truncate max-w-[200px]" title={item.referrer}>
                         {item.referrer.replace('https://', '').replace('http://', '').split('/')[0] || 'Direct'}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              }) || (
                <div className="text-[10px] text-gray-400 italic py-4 text-center">No referrer data yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Contents & Comments Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold mb-4 flex items-center opacity-70"><Bookmark size={14} className="mr-2"/> Popular Content</h2>
            <div className="space-y-3">
              {dbStats?.topPosts?.map((stat: any, i: number) => {
                const post = allBlogs.find(b => b.path === stat.postId || b._raw.flattenedPath === stat.postId);
                return (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-300">#0{i+1}</span>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                        {post?.title || stat.postId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold">{stat.views.toLocaleString()}</p>
                      <p className="text-[8px] uppercase text-gray-400 font-bold">{stat.likes || 0} likes</p>
                    </div>
                  </div>
                );
              }) || (
                <div className="text-[10px] text-gray-400 italic py-4 text-center">No popular content data yet.</div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold mb-4 flex items-center opacity-70"><MessageSquare size={14} className="mr-2"/> Recent Activity</h2>
            <div className="space-y-4">
              {dbStats?.recentComments?.map((com: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Users size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-[10px] font-bold text-gray-900 dark:text-gray-100 truncate">{com.author}</p>
                      <span className="text-[9px] text-gray-400 font-medium">
                        {new Date(com.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 italic truncate mt-0.5">"{com.content}"</p>
                    <p className="text-[8px] font-bold text-blue-500 uppercase mt-1 truncate">on {com.postId}</p>
                  </div>
                </div>
              )) || (
                <div className="text-[10px] text-gray-400 italic py-4 text-center">No recent comments</div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
