import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import InitiateButton from "@/app/components/InitiateButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-1 flex flex-col items-center justify-center relative w-full"
        style={{
          backgroundImage: "url('/img/background-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay escuro para melhor contraste */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center">
          {/* Logo completa */}
          <div>
            <Image
              src="/img/logo_completa.png"
              alt="Echeinbetter Logo"
              width={300}
              height={200}
              priority
            />
          </div>

          {/* Botão Iniciar */}
          <InitiateButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
