import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm.jsx"; 
import axios from "axios";

export default function Home() {
  //Active Tab & User
  const [activeTab, setActiveTab] = useState("pending");
  const username = localStorage.getItem("username") || "";
  const isAdmin = username.toLowerCase().includes("admin");
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/expenses/getExpenses?status=${activeTab}&page=${page}&limit=10`
        );
        const data = response.data.expenses || [];
        setExpenses(data);
        setTotalPages(response.data.totalPages || 1);
        console.log("Fetched expenses for:", activeTab, "Page:", page);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [activeTab, page]);


useEffect(() => {
  setPage(1);
}, [activeTab]); // ✅ only reset page when the tab changes


  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/expenses/updateStatus/${id}`, {
        actions: "approved",
      });
      setExpenses((prev) =>
        prev.filter((exp) => exp._id !== id) // remove it from the pending list
      );
    } catch (err) {
      console.error("Failed to approve:", err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/expenses/updateStatus/${id}`, {
        actions: "rejected",
      });
      setExpenses((prev) =>
        prev.filter((exp) => exp._id !== id)
      );
    } catch (err) {
      console.error("Failed to reject:", err.message);
    }
  };

  

 

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    setShowForm(false);
  };

  const [loading, setLoading] = useState(true);

  return (
    <>
     {loading && (
      <p className="text-center text-secondary mt-3">Loading expenses...</p>
    )}
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {/* Top Nav */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Expense Management System</h4>
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
                  <tr key={exp._id}>
                    <td>{exp._id}</td>
                    <td>{new Date(exp.date).toISOString().split("T")[0]}</td>
                    <td>{exp.category}</td>
                    <td>${exp.expense.toLocaleString()}</td>
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
                          onClick={() => handleApprove(exp._id)}
                        >
                          ✅
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(exp._id)}
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Buttons */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                ⬅️ Previous
              </button>

              <span className="fw-bold">Page {page} of {totalPages}</span>

              <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next ➡️
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
