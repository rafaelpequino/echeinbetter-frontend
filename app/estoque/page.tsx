"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  
  // Dados de exemplo
  const [items] = useState<Item[]>([
    {
      id: 1,
      categoria: "Eletrônicos",
      lote: "Lote 1",
      observacao: "Em bom estado",
      produto: "Produto 1",
      quadra: "A",
      codigoBarras: "123456789",
    },
    {
      id: 2,
      categoria: "Alimentos",
      lote: "Lote 2",
      observacao: "Verificar validade",
      produto: "Produto 2",
      quadra: "B",
      codigoBarras: "987654321",
    },
    {
      id: 3,
      categoria: "Eletrônicos",
      lote: "Lote 1",
      observacao: "Requer manutenção",
      produto: "Produto 3",
      quadra: "A",
      codigoBarras: "555666777",
    },
  ]);

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
                        style={{
                          borderColor: "var(--color-primary-teal)",
                          color: "var(--color-primary-teal)",
                        }}
                        className="px-4 py-1 border rounded font-semibold transition-all hover:bg-teal-900/20 text-xs sm:text-sm cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
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

