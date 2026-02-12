import React from "react";

export default function ExpensesModal({ expenses, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} 
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Expenses</h2>
       
        <ul>
          {expenses.map((t) => (
            <li key={t.id}>
              [{t.date}] ${parseFloat(t.amount).toFixed(2)} ({t.category})
            </li>
          ))}
        </ul>

         <button
          onClick={onClose}
          style={{
            padding: "0.3rem 0.6rem",
            marginBottom: "1rem",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
