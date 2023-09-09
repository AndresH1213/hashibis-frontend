import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getCurrentUser } from '@/lib/session';
import ProfileMenu from './ProfileMenu';
import AuthButton from './AuthButton';

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={155} height={43} alt="Flexibble" />
        </Link>
        {NavLinks.map((link) => {
          return (
            <Link
              href={link.href}
              className="hover:text-primary-cognac"
              key={link.key}
            >
              {link.text}
            </Link>
          );
        })}
        <ul className="xl:flex hidden text-small gap-7"></ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={`/profile`}>Profile</Link>
          </>
        ) : (
          <AuthButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
