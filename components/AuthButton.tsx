import Image from 'next/image';
import Link from 'next/link';

const AuthButton = () => {
  return (
    <Link href="/login" className="border-2 mx-1">
      <Image src="/user-logo.svg" alt="User Logo" width={40} height={40} />
    </Link>
  );
};

export default AuthButton;
