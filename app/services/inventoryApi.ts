interface Inventory {
  id?: number;
  category: string;
  product: string;
  batch: string;
  quad: string;
  barCode: string;
  note: string;
}

interface Item {
  id: number;
  categoria: string;
  lote: string;
  observacao: string;
  produto: string;
  quadra: string;
  codigoBarras: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7240';

const mapToInventory = (item: Item): Inventory => ({
  id: item.id,
  category: item.categoria,
  product: item.produto,
  batch: item.lote,
  quad: item.quadra,
  barCode: item.codigoBarras,
  note: item.observacao,
});

const mapFromInventory = (inventory: Inventory): Item => ({
  id: inventory.id || 0,
  categoria: inventory.category,
  produto: inventory.product,
  lote: inventory.batch,
  quadra: inventory.quad,
  codigoBarras: inventory.barCode,
  observacao: inventory.note,
});

export const inventoryApi = {
  async getAll(): Promise<Item[]> {
    const response = await fetch(`${API_URL}/inventory`);
    if (!response.ok) throw new Error('Erro ao buscar itens');
    const data = await response.json();
    return data.map(mapFromInventory);
  },

  async getById(id: number): Promise<Item> {
    const response = await fetch(`${API_URL}/inventory/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar item');
    const data = await response.json();
    return mapFromInventory(data);
  },

  async create(item: Omit<Item, 'id'>): Promise<Item> {
    const inventory = mapToInventory({ ...item, id: 0 });
    const response = await fetch(`${API_URL}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventory),
    });
    if (!response.ok) throw new Error('Erro ao criar item');
    const data = await response.json();
    return mapFromInventory(data);
  },

  async update(id: number, item: Omit<Item, 'id'>): Promise<Item> {
    const inventory = mapToInventory({ ...item, id });
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventory),
    });
    if (!response.ok) throw new Error('Erro ao atualizar item');
    const data = await response.json();
    return mapFromInventory(data);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar item');
  },
};

