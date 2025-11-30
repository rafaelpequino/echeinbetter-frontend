"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { inventoryApi } from "@/app/services/inventoryApi";

interface Item {
  id: number;
  categoria: string;
  lote: string;
  observacao: string;
  produto: string;
  quadra: string;
  codigoBarras: string;
}

export default function Estoque() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchBarCode, setSearchBarCode] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao carregar itens do estoque",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBarCode = async (barCode: string) => {
    setSearchBarCode(barCode);
    try {
      const data = await inventoryApi.searchByBarCode(barCode);
      setItems(data);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao buscar itens por código de barras",
        icon: "error",
      });
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/estoque/editar/${id}`);
  };

  const handleDelete = async (id: number, productName: string) => {
    const result = await Swal.fire({
      title: "Confirmar exclusão",
      text: `Tem certeza que deseja deletar "${productName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await inventoryApi.delete(id);
        setItems(items.filter(item => item.id !== id));
        Swal.fire({
          title: "Sucesso",
          text: "Item deletado com sucesso",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erro",
          text: "Erro ao deletar item",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main
          className="flex-1 p-8 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary-black)" }}
        >
          <p className="text-white text-lg">Carregando estoque...</p>
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
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho com título e botão */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Estoque</h1>
            <button
              onClick={() => router.push("/estoque/novo")}
              style={{
                borderColor: "var(--color-primary-teal)",
                backgroundColor: "var(--color-primary-teal)",
              }}
              className="px-8 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-700 cursor-pointer text-sm sm:text-base"
            >
              + Novo Item
            </button>
          </div>

          {/* Input de busca por código de barras */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por código de barras..."
              value={searchBarCode}
              onChange={(e) => handleSearchBarCode(e.target.value)}
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: "var(--color-primary-teal)",
              }}
              className="w-full px-4 py-3 border-2 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
            />
            {searchBarCode && (
              <p className="mt-3 text-sm" style={{ color: "var(--color-primary-teal)" }}>
                Buscando pelo código: <span className="font-semibold">{searchBarCode}</span>
              </p>
            )}
          </div>

          {/* Tabela responsiva */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottomColor: "var(--color-primary-teal)" }} className="border-b-2">
                  <th className="px-4 py-3 text-left text-white font-semibold">Categoria</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Produto</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Lote</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Quadra</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Código de Barras</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Observação</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottomColor: "var(--color-primary-teal)" }}
                    className="border-b border-opacity-20 hover:bg-teal-900/10 transition-colors"
                  >
                    <td className="px-4 py-3 text-white">{item.categoria}</td>
                    <td className="px-4 py-3 text-white">{item.produto}</td>
                    <td className="px-4 py-3 text-white">{item.lote}</td>
                    <td className="px-4 py-3 text-white">{item.quadra}</td>
                    <td className="px-4 py-3 text-white font-mono text-sm">{item.codigoBarras}</td>
                    <td className="px-4 py-3 text-white text-sm">{item.observacao}</td>
                    <td className="px-4 py-3 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(item.id)}
                        style={{
                          borderColor: "var(--color-primary-teal)",
                          color: "var(--color-primary-teal)",
                        }}
                        className="px-4 py-1 border rounded font-semibold transition-all hover:bg-teal-900/20 text-xs sm:text-sm cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.produto)}
                        style={{
                          borderColor: "#ef4444",
                          color: "#ef4444",
                        }}
                        className="px-4 py-1 border rounded font-semibold transition-all hover:bg-red-900/20 text-xs sm:text-sm cursor-pointer"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mensagem se não houver itens */}
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-lg mb-6">Nenhum item cadastrado ainda</p>
              <button
                onClick={() => router.push("/estoque/novo")}
                style={{
                  borderColor: "var(--color-primary-teal)",
                  backgroundColor: "var(--color-primary-teal)",
                }}
                className="px-8 py-2 border-2 rounded font-semibold transition-all text-white hover:bg-teal-700 cursor-pointer"
              >
                Cadastrar Primeiro Item
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

