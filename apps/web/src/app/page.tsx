import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <Link href="/login" className="text-white">Login</Link>
        </div>
      </nav>
      <main>
        <h1>Hello Valet</h1>
      </main>
    </>
  );
}
