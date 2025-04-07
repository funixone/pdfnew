"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", backgroundColor: "#0f0f0f", color: "#fff" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📡 Tracker Dashboard</h2>
      {logs.length === 0 && <p>No logs yet.</p>}
      {logs.map((log, i) => (
        <div key={i} style={{ background: "#1e1e1e", padding: "1rem", borderRadius: "10px", marginBottom: "1rem", boxShadow: "0 0 10px #222" }}>
          <p>🌐 <strong>IP:</strong> {log.ip}</p>
          <p>📱 <strong>Device:</strong> {log.device}</p>
          <p>🕒 <strong>Time:</strong> {log.time}</p>
          <p><strong>User-Agent:</strong> {log.ua}</p>
        </div>
      ))}
    </div>
  );
}
