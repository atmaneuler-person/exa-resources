'use client';

import { Button } from '@/components/shared/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useRouter } from 'next/navigation';

interface RestrictedContentGateProps {
  postTitle: string;
}

export default function RestrictedContentGate({ postTitle }: RestrictedContentGateProps) {
  const router = useRouter();

  const handleLogin = () => {
      // Redirect to login page
      router.push('/login');
  };

  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <Header />
      <div className="w-full max-w-4xl px-6 py-20 text-center">
        <div className="mb-8">
          <span className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-6xl">
            🔒
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          {postTitle}
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          This content is restricted to authorized personnel only.<br/>
          Please log in to access the full documentation.
        </p>
        
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50 max-w-md mx-auto space-y-4">
            <Button className="w-full h-12 text-lg" onClick={handleLogin}>
              Log In to Continue
            </Button>
            <Button variant="outline" className="w-full h-12 text-lg" onClick={() => router.back()}>
              Cancel
            </Button>
            <p className="mt-4 text-sm text-gray-400">
              Don't have an account? Contact your administrator.
            </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
