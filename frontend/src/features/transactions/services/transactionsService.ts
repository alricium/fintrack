import { api } from '../../../api';
import type { Earning } from '../../../types';

export const transactionsService = {
  async fetchAll(): Promise<Earning[]> {
    const response = await api.get('/earnings');
    return response.data;
  },

  async create(data: Partial<Earning>): Promise<Earning> {
    const response = await api.post('/earnings', data);
    return response.data;
  },

  async update(id: number, data: Partial<Earning>): Promise<Earning> {
    const response = await api.put(`/earnings/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/earnings/${id}`);
  },
};
