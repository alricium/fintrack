import React from 'react';
import type { Earning } from '../types';
import { formatAmount } from '../utils';

interface Props {
  mode: 'add' | 'edit' | 'view';
  formData: Partial<Earning>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const EarningModal: React.FC<Props> = ({ mode, formData, onChange, onSubmit, onClose }) => (
  <div className="ve-modal-backdrop" onClick={onClose}>
    <div className="ve-modal" onClick={(e) => e.stopPropagation()}>
      <h5>
        {mode === 'add' && (formData.type === 'income' ? 'Add Income' : 'Add Expense')}
        {mode === 'edit' && 'Edit Earning'}
        {mode === 'view' && 'Earning Details'}
      </h5>

      {(mode === 'add' || mode === 'edit') && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" className="form-control" value={formData.description || ''} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" className="form-control" value={formData.category || ''} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              min={0}
              step={0.01}
              name="amount"
              className="form-control"
              value={formData.amount || 0}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" className="form-control" value={formData.date || ''} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="type" className="form-control" value={formData.type || 'income'} onChange={onChange} required>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button type="button" className="ve-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="ve-btn active">Save</button>
          </div>
        </form>
      )}

      {mode === 'view' && (
        <div>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Amount:</strong> {formatAmount(parseFloat(formData.amount as string) || 0)}</p>
          <p><strong>Date:</strong> {formData.date}</p>
          <p><strong>Type:</strong> {formData.type}</p>
          <div className="d-flex justify-content-end mt-2">
            <button className="ve-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default EarningModal;