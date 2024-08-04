// pages/auth/error.tsx
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <p className="mt-4">Error: {error}</p>
      <Link href="/auth/signin">
        <a className="mt-4 text-blue-500">Try Again</a>
      </Link>
    </div>
  );
}
