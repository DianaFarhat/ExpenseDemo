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

  const [file, setFile] = useState(null); // 👈 for invoice file

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("invoice", file); // 👈 include the file

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onAdd(data); // update UI with newly added expense
    } catch (err) {
      alert("Error uploading expense.");
    }
  };

  return (
    <div className="card card-body bg-light mb-4">
      <h5>Add New Expense</h5>
      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
        <div className="col-md-3">
          <input type="text" className="form-control" name="id" placeholder="Expense ID" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" name="date" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" name="category" placeholder="Category" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" name="requester" placeholder="Requester" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" name="amount" placeholder="Expense" onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" name="reimbursement" placeholder="Reimbursement" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
            <label className="form-label">Attach Invoice</label>
            <div className="input-group">
                <span className="input-group-text">
                📎
                </span>
                <input
                type="file"
                className="form-control"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                required
                />
            </div>
            {file && (
                <small className="text-success mt-1 d-block">
                Selected: {file.name}
                </small>
            )}
            </div>

        <div className="col-md-6 d-flex gap-2">
          <button type="submit" className="btn btn-primary">Add Expense</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
