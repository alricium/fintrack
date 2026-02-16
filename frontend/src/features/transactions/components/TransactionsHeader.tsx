import React from 'react';

interface TransactionsHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddIncome: () => void;
    onAddExpense: () => void;
    onExport: () => void;
}

const TransactionsHeader: React.FC<TransactionsHeaderProps> = ({
    searchTerm,
    onSearchChange,
    onAddIncome,
    onAddExpense,
    onExport,
}) => {
    return (
        <div className="view-expenses-header">
            <div className="search-wrapper">
                <i className="bi bi-search search-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="btn-group">
                <button className="ve-btn" onClick={onAddIncome}>
                    <i className="bi bi-plus" /> Add Income
                </button>
                <button className="ve-btn" onClick={onAddExpense}>
                    <i className="bi bi-plus" /> Add Expense
                </button>
                <button className="ve-btn excel-btn active" onClick={onExport}>
                    <i className="bi bi-file-earmark-spreadsheet" />
                </button>
            </div>
        </div>
    );
};

export default TransactionsHeader;
