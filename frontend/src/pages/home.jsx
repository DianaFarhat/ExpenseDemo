import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm.jsx"; 
import axios from "axios";

export default function Home() {
  //Active Tab & User
  const [activeTab, setActiveTab] = useState("pending");
  const username = localStorage.getItem("username") || "";
  const isAdmin = username.toLowerCase().includes("admin");

  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleApprove = (id) => {
    alert(`✅ Approved: ${id}`);
  };

  const handleReject = (id) => {
    alert(`❌ Rejected: ${id}`);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    setShowForm(false);
  };

  useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/expenses?status=${activeTab}`);
      setExpenses(response.data.expenses || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err.message);
    }
  };

  fetchExpenses();
}, [activeTab]);


  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {/* Top Nav */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Expense Management System</h4>
         {/*  <nav className="nav nav-pills">
            <a className="nav-link active" href="#">Pending Expenses</a>
            <a className="nav-link" href="#">Approved Expenses</a>
            <a className="nav-link" href="#">Rejected Expenses</a>
          </nav> */}
          <nav className="nav nav-pills">
            <button className={`nav-link ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
              Pending Expenses
            </button>
            <button className={`nav-link ${activeTab === "approved" ? "active" : ""}`} onClick={() => setActiveTab("approved")}>
              Approved Expenses
            </button>
            <button className={`nav-link ${activeTab === "rejected" ? "active" : ""}`} onClick={() => setActiveTab("rejected")}>
              Rejected Expenses
            </button>
          </nav>
        </div>

        {/* Header with Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>My Expenses</h5>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            ➕ New Expense
          </button>
        </div>

        {/* Conditionally Show Form */}
        {showForm && (
          <AddExpenseForm onAdd={handleAddExpense} onCancel={() => setShowForm(false)} />
        )}

        {/* Table */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Exp ID</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Expense</th>
                  <th>Reimbursement</th>
                  <th>Receipt</th>
                  <th>Requester</th>
                  {activeTab === "pending" && isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.id}</td>
                    <td>{exp.date}</td>
                    <td>{exp.category}</td>
                    <td>${exp.amount.toLocaleString()}</td>
                    <td>${exp.reimbursement.toLocaleString()}</td>
                    <td>
                      <a
                        href={exp.receipt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-success btn-sm"
                        >
                        📄 View
                      </a>

                    </td>
                    <td>{exp.requester}</td>
                    {activeTab === "pending" && isAdmin && (
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(exp.id)}
                        >
                          ✅
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(exp.id)}
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
