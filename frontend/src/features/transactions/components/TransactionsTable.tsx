import React from 'react';
import type { Earning } from '../../../types';
import { truncateDescription, formatAmount, formatEarningDateTime } from '../../../utils';

interface TransactionsTableProps {
    earnings: Earning[];
    onSort: (key: keyof Earning) => void;
    onEdit: (earning: Earning) => void;
    onDelete: (id: number) => void;
    onView: (earning: Earning) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
    earnings,
    onSort,
    onEdit,
    onDelete,
    onView,
}) => {
    return (
        <div className="table-responsive">
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th onClick={() => onSort('id')}>#</th>
                        <th onClick={() => onSort('description')}>Description</th>
                        <th onClick={() => onSort('category')}>Category</th>
                        <th onClick={() => onSort('amount')}>Amount</th>
                        <th onClick={() => onSort('date')}>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {earnings.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{truncateDescription(e.description, 10)}</td>
                            <td>{e.category}</td>
                            <td>{formatAmount(parseFloat(e.amount))}</td>
                            <td>{formatEarningDateTime(e.date, e.created_at)}</td>
                            <td className="table-actions">
                                <button className="ve-btn edit-btn" title="Edit" onClick={() => onEdit(e)}>
                                    <i className="bi bi-pencil" />
                                </button>
                                <button className="ve-btn delete-btn" title="Delete" onClick={() => onDelete(e.id)}>
                                    <i className="bi bi-trash" />
                                </button>
                                <button className="ve-btn view-btn" title="View" onClick={() => onView(e)}>
                                    <i className="bi bi-file-text" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
