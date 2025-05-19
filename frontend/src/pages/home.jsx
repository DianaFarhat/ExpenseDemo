import React, { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm.jsx"; 

const dummyExpenses = [
  {
    id: "Exp123",
    date: "2023-03-17",
    category: "Food",
    amount: 3000,
    reimbursement: 3000,
    requester: "David William",
    receipt: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "Exp234",
    date: "2023-04-18",
    category: "Travel",
    amount: 5345,
    reimbursement: 5345,
    requester: "Stella Williams",
    receipt: "https://www.africau.edu/images/default/sample.pdf"
  },
];


export default function Home() {
  const [expenses, setExpenses] = useState(dummyExpenses);
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

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {/* Top Nav */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Expense Management System</h4>
          <nav className="nav nav-pills">
            <a className="nav-link" href="#">Dashboard</a>
            <a className="nav-link active" href="#">Expenses</a>
            <a className="nav-link" href="#">Advances</a>
            <a className="nav-link" href="#">Travel Booking</a>
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
                  <th>Actions</th>
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
