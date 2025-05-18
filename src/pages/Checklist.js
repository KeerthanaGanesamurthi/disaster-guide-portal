import React, { useState } from "react";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      setTasks([...tasks, trimmedInput]);
      setInput("");
    }
  };

  const deleteTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Emergency Preparedness Checklist", 10, 10);
    tasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task}`, 10, 20 + index * 10);
    });
    doc.save("disaster_checklist.pdf");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-3">Disaster Preparedness Checklist</h2>

      {/* Input + Add button side by side */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add checklist item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center"
          style={{ width: "150px", height: "38px" }}
          onClick={addTask}
        >
          Add Item
        </button>
      </div>

      {/* Checklist Display */}
      {tasks.length > 0 ? (
        <ul className="list-group mb-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No items added yet.</p>
      )}

      {/* Smaller Download Button aligned left */}
      <button
        className="btn btn-success d-flex align-items-center justify-content-center"
        style={{ width: "200px", height: "38px" }}
        onClick={downloadPDF}
        disabled={tasks.length === 0}
      >
        Download Checklist
      </button>
    </div>
  );
}
