// src/components/AddExpenseForm.jsx
import React, { useState } from "react";

export default function AddExpenseForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    date: "",
    category: "",
    amount: "",
    reimbursement: "",
    requester: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: +form.amount, reimbursement: +form.reimbursement });
  };

  return (
    <div className="card card-body bg-light mb-4">
      <h5>Add New Expense</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="id"
            placeholder="Expense ID"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="requester"
            placeholder="Requester"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="amount"
            placeholder="Expense"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="reimbursement"
            placeholder="Reimbursement"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
