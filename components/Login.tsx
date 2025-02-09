'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image src="/logo.png" width={300} height={300} alt="logo" />
      <button
        onClick={() => signIn('google')}
        className="text-white font-bold text-3xl animate-pulse"
      >
        {"Click to Sign Into Darryl's AI ChatBot"}
      </button>
    </div>
  );
}

export default Login;
