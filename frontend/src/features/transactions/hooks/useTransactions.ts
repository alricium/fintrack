import { useState, useEffect, useMemo } from 'react';
import type { Earning } from '../../../types';
import { transactionsService } from '../services/transactionsService';

const ITEMS_PER_PAGE = 8;

interface UseTransactionsReturn {
    earnings: Earning[];
    modalMode: 'add' | 'edit' | 'view' | null;
    formData: Partial<Earning>;
    searchTerm: string;
    currentPage: number;
    sortConfig: { key: keyof Earning; direction: 'asc' | 'desc' } | null;
    paginatedEarnings: Earning[];
    totalPages: number;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    handleSort: (key: keyof Earning) => void;
    openModal: (mode: 'add' | 'edit' | 'view', data?: Earning) => void;
    closeModal: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleDelete: (id: number) => Promise<void>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    exportToExcel: () => void;
}

export const useTransactions = (): UseTransactionsReturn => {
    const [earnings, setEarnings] = useState<Earning[]>([]);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | null>(null);
    const [formData, setFormData] = useState<Partial<Earning>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Earning; direction: 'asc' | 'desc' } | null>(null);

    useEffect(() => {
        fetchEarnings();
    }, []);

    const fetchEarnings = async () => {
        try {
            const data = await transactionsService.fetchAll();
            setEarnings(data);
        } catch (err) {
            console.error(err);
        }
    };

    const openModal = (mode: 'add' | 'edit' | 'view', data?: Earning) => {
        if (data) {
            setFormData({ ...data });
        } else {
            setFormData({ date: new Date().toISOString().split('T')[0], type: 'income' });
        }
        setModalMode(mode);
    };

    const closeModal = () => setModalMode(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({ ...formData, [name]: type === 'number' ? parseFloat(value) : value });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Do you approve the deletion?')) return;
        try {
            await transactionsService.delete(id);
            fetchEarnings();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await transactionsService.create(formData);
            }
            if (modalMode === 'edit' && formData.id) {
                await transactionsService.update(formData.id, formData);
            }
            closeModal();
            fetchEarnings();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredEarnings = useMemo(
        () =>
            earnings.filter(
                (e) =>
                    e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.type.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [earnings, searchTerm]
    );

    const sortedEarnings = useMemo(() => {
        if (!sortConfig) return filteredEarnings;
        return [...filteredEarnings].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredEarnings, sortConfig]);

    const totalPages = Math.ceil(sortedEarnings.length / ITEMS_PER_PAGE);
    const paginatedEarnings = useMemo(
        () => sortedEarnings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
        [sortedEarnings, currentPage]
    );

    const handleSort = (key: keyof Earning) => {
        setSortConfig((prev) =>
            prev?.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
        );
    };

    const exportToExcel = async () => {
        const XLSX = await import('xlsx');
        const { saveAs } = await import('file-saver');
        const { formatEarningDateTime } = await import('../../../utils');

        const data = earnings.map((e) => ({
            ID: e.id,
            Description: e.description,
            Category: e.category,
            Amount: e.amount,
            Date: formatEarningDateTime(e.date, e.created_at),
            Type: e.type,
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Earnings');
        saveAs(
            new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' }),
            'earnings.xlsx'
        );
    };

    return {
        earnings,
        modalMode,
        formData,
        searchTerm,
        currentPage,
        sortConfig,
        paginatedEarnings,
        totalPages,
        setSearchTerm,
        setCurrentPage,
        handleSort,
        openModal,
        closeModal,
        handleInputChange,
        handleDelete,
        handleSubmit,
        exportToExcel,
    };
};
