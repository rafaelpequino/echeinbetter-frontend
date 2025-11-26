"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import { inventoryApi } from "@/app/services/inventoryApi";

interface FormData {
  categoria: string;
  lote: string;
  observacao: string;
  produto: string;
  quadra: string;
  codigoBarras: string;
}

export default function EditarItem() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    categoria: "",
    lote: "",
    observacao: "",
    produto: "",
    quadra: "",
    codigoBarras: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setLoading(true);
      const item = await inventoryApi.getById(parseInt(id));
      setFormData({
        categoria: item.categoria,
        lote: item.lote,
        observacao: item.observacao,
        produto: item.produto,
        quadra: item.quadra,
        codigoBarras: item.codigoBarras,
      });
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao carregar item",
        icon: "error",
      }).then(() => {
        router.push("/estoque");
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.categoria || !formData.produto || !formData.lote || !formData.quadra) {
      Swal.fire({
        title: "Validação",
        text: "Por favor, preencha todos os campos obrigatórios",
        icon: "warning",
      });
      return;
    }

    try {
      setSaving(true);
      await inventoryApi.update(parseInt(id), formData);
      Swal.fire({
        title: "Sucesso",
        text: "Item atualizado com sucesso",
        icon: "success",
      }).then(() => {
        router.push("/estoque");
      });
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao atualizar item",
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLimpar = () => {
    loadItem();
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main
          className="flex-1 p-8 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary-black)" }}
        >
          <p className="text-white text-lg">Carregando item...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-1 p-8"
        style={{ backgroundColor: "var(--color-primary-black)" }}
      >
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <div className="flex gap-6 justify-between mt-12 flex-col-reverse sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/estoque")}
                disabled={saving}
                style={{
                  borderColor: "var(--color-primary-teal)",
                  opacity: saving ? 0.5 : 1,
                }}
                className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer disabled:cursor-not-allowed"
              >
                Voltar
              </button>
              <div className="flex gap-6 flex-col-reverse sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    borderColor: "var(--color-primary-teal)",
                    opacity: saving ? 0.5 : 1,
                  }}
                  className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer disabled:cursor-not-allowed"
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
                <button
                  type="button"
                  onClick={handleLimpar}
                  disabled={saving}
                  style={{
                    borderColor: "var(--color-primary-teal)",
                    opacity: saving ? 0.5 : 1,
                  }}
                  className="px-8 sm:px-12 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-900/20 text-sm sm:text-base cursor-pointer disabled:cursor-not-allowed"
                >
                  Resetar
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

