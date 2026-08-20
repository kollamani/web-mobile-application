"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

interface Task {
  _id?: string;
  title: string;
  description?: string;
  status?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      setError("");
      const response = await API.get("/tasks");
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks || [];
      setTasks(list);
    } catch (err: any) {
      console.error("Failed to load tasks", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setError(err.response?.data?.message || "Failed to fetch tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      setShowForm(false);
      fetchTasks();
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        alert(err.response?.data?.message || "Failed to create task");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading tasks...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Dashboard</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

      {showForm && (
        <form
          onSubmit={handleCreateTask}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h3>Create New Task</h3>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Task Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)"
              rows={3}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {submitting ? "Saving..." : "Save Task"}
          </button>
        </form>
      )}

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <div style={{ padding: "30px", textAlign: "center", background: "#f8f9fa", borderRadius: "8px", border: "1px dashed #ccc" }}>
          <p style={{ margin: 0, color: "#6c757d" }}>
            No tasks found. Click <strong>+ Add Task</strong> to create your first task!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {tasks.map((task) => (
            <div
              key={task._id || task.title}
              style={{
                padding: "15px",
                border: "1px solid #eee",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h4 style={{ margin: "0 0 5px 0" }}>{task.title}</h4>
              <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
                {task.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}