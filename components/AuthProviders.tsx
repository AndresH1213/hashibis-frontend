'use client';

import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Provider = {
  id: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
  siginUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div className="flexCenter">
        <button
          className="border-2 mx-1"
          onClick={() => signIn(providers['cognito'].id)}
        >
          <Image src="/simbol.png" alt="Hashibis Logo" width={36} height={40} />
        </button>
        <button
          className="border-2 mx-1"
          onClick={() => signIn(providers['cognito_facebook'].id)}
        >
          <Image
            src="/facebook-logo.svg"
            alt="Facebook Logo"
            width={40}
            height={40}
          />
        </button>
        <button
          className="border-2 mx-1"
          onClick={() => signIn(providers['cognito_google'].id)}
        >
          <Image
            src="/google-logo.svg"
            alt="Google Logo"
            width={40}
            height={40}
          />
        </button>
      </div>
    );
  } else {
    return (
      <div className="flexCenter">
        <Image
          src="/loading-plant.gif"
          width={36}
          height={42}
          alt="loading plant icon"
        />
      </div>
    );
  }
}

export default AuthProviders;
