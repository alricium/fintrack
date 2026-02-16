import React from 'react';
import MainLayout from '../layouts/MainLayout';
import '../assets/styles/ViewExpenses.css';
import type { Earning } from '../types';
import EarningModal from '../components/EarningModal';
import { useTransactions } from '../features/transactions/hooks/useTransactions';
import TransactionsHeader from '../features/transactions/components/TransactionsHeader';
import TransactionsTable from '../features/transactions/components/TransactionsTable';
import Pagination from '../components/Pagination';

const Transactions: React.FC = () => {
  const {
    modalMode,
    formData,
    searchTerm,
    currentPage,
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
  } = useTransactions();

  return (
    <MainLayout>
      <TransactionsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddIncome={() => openModal('add', { type: 'income' } as Earning)}
        onAddExpense={() => openModal('add', { type: 'expense' } as Earning)}
        onExport={exportToExcel}
      />

      <TransactionsTable
        earnings={paginatedEarnings}
        onSort={handleSort}
        onEdit={(e) => openModal('edit', e)}
        onDelete={handleDelete}
        onView={(e) => openModal('view', e)}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {modalMode && (
        <EarningModal
          mode={modalMode}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </MainLayout>
  );
};

export default Transactions;
