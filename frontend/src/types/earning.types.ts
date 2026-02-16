export interface Earning {
    id: number;
    description: string;
    category: string;
    amount: string;
    date: string;
    type: 'income' | 'expense';
    created_at: string;
}
