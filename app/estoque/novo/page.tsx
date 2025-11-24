"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    categoria: "",
    lote: "",
    observacao: "",
    produto: "",
    quadra: "",
    codigoBarras: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Funcionalidade será adicionada depois
    console.log("Formulário enviado:", formData);
  };

  const handleLimpar = () => {
    setFormData({
      categoria: "",
      lote: "",
      observacao: "",
      produto: "",
      quadra: "",
      codigoBarras: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-1 p-8"
        style={{ backgroundColor: "var(--color-primary-black)" }}
      >
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Primeira linha: Categoria, Lote, Observação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categoria */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="categoria"
                  className="text-white font-semibold"
                >
                  Categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                >
                  <option value="" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Selecione...
                  </option>
                  <option value="eletrônicos" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Eletrônicos
                  </option>
                  <option value="alimentos" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Alimentos
                  </option>
                </select>
              </div>

              {/* Lote */}
              <div className="flex flex-col gap-2">
                <label htmlFor="lote" className="text-white font-semibold">
                  Lote
                </label>
                <select
                  id="lote"
                  name="lote"
                  value={formData.lote}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                >
                  <option value="" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Selecione...
                  </option>
                  <option value="lote1" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Lote 1
                  </option>
                  <option value="lote2" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Lote 2
                  </option>
                </select>
              </div>

              {/* Observação */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="observacao"
                  className="text-white font-semibold"
                >
                  Observação
                </label>
                <input
                  type="text"
                  id="observacao"
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="Digite uma observação..."
                />
              </div>
            </div>

            {/* Segunda linha: Produto, Quadra, Código de Barras */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Produto */}
              <div className="flex flex-col gap-2">
                <label htmlFor="produto" className="text-white font-semibold">
                  Produto
                </label>
                <select
                  id="produto"
                  name="produto"
                  value={formData.produto}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                >
                  <option value="" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Selecione...
                  </option>
                  <option value="produto1" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Produto 1
                  </option>
                  <option value="produto2" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Produto 2
                  </option>
                </select>
              </div>

              {/* Quadra */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quadra" className="text-white font-semibold">
                  Quadra
                </label>
                <select
                  id="quadra"
                  name="quadra"
                  value={formData.quadra}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                >
                  <option value="" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    Selecione...
                  </option>
                  <option value="a" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    A
                  </option>
                  <option value="b" style={{ backgroundColor: "var(--color-primary-black)", color: "white" }}>
                    B
                  </option>
                </select>
              </div>

              {/* Código de Barras */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="codigoBarras"
                  className="text-white font-semibold"
                >
                  Código de Barras
                </label>
                <input
                  type="text"
                  id="codigoBarras"
                  name="codigoBarras"
                  value={formData.codigoBarras}
                  onChange={handleChange}
                  style={{
                    borderColor: "white",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  className="border-2 rounded px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="Escaneie o código..."
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-6 justify-between mt-12 flex-col-reverse sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/estoque")}
                style={{
                  borderColor: "var(--color-primary-teal)",
                }}
                className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer"
              >
                Voltar
              </button>
              <div className="flex gap-6 flex-col-reverse sm:flex-row">
                <button
                  type="submit"
                  style={{
                    borderColor: "var(--color-primary-teal)",
                  }}
                  className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer"
                >
                  Cadastrar
                </button>
                <button
                  type="button"
                  onClick={handleLimpar}
                  style={{
                    borderColor: "var(--color-primary-teal)",
                  }}
                  className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer"
                >
                  Limpar
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

