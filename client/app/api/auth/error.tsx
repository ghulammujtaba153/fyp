'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (router.query.error) {
      setErrorMessage(router.query.error as string);
    }
  }, [router.query.error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Authentication Error</h1>
      <p className="mt-4 text-xl">{errorMessage || 'An unknown error occurred'}</p>
      <Link href="/login">
        <a className="mt-4 text-blue-500 underline">Go back to login</a>
      </Link>
    </div>
  );
};

export default ErrorPage;
