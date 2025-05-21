import React, { useState } from "react";
import axios from "axios";

export default function AddExpenseForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    date: "",
    category: "",
    expense: "",
    reimbursement: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("📎 File selected:", e.target.files[0]?.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requester = localStorage.getItem("name") || "Unknown";

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("requester", requester);
    if (file) formData.append("invoice", file);

    try {
      const res = await axios.post("http://localhost:5000/api/expenses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onAdd(res.data);
    } catch (err) {
      if (err.response) {
        console.error("❌ Server responded with:", err.response.status, err.response.data);

        const { message, errors } = err.response.data;

        if (Array.isArray(errors)) {
          alert(`🚫 ${message}:\n\n${errors.map((e) => `• ${e}`).join("\n")}`);
        } else {
          alert(`🚫 ${message || "Server error occurred"}`);
        }
      } else {
        console.error("❌ Network or client error:", err.message);
        alert("❌ Could not upload expense. Check network and console.");
      }
    }
  };

  return (
    <div className="card card-body bg-light mb-4">
      <h5>Add New Expense</h5>
      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
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
            type="number"
            className="form-control"
            name="expense"
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
        <div className="col-md-6">
          <label className="form-label">Attach Invoice (optional)</label>
          <div className="input-group">
            <span className="input-group-text">📎</span>
            <input
              type="file"
              className="form-control"
              accept=".pdf,image/*"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <small className="text-success mt-1 d-block">
              Selected: {file.name}
            </small>
          )}
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