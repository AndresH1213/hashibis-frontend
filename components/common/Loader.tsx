import Image from 'next/image';

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/loading-plant.gif"
        width="280"
        height="112"
        className="logo"
        alt="Gift Plant Loader"
        priority
      />
    </div>
  );
}
