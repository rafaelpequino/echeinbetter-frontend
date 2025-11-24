import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b-2 border-teal-600 py-4 px-6 flex items-center justify-center" style={{ backgroundColor: "var(--color-primary-black)" }}>
      <Link href="/">
        <Image
          src="/img/logo-simples.png"
          alt="EB Logo"
          width={80}
          height={80}
          priority
        />
      </Link>
    </header>
  );
}

