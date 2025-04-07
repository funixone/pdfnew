"use client";

import { useEffect, useState } from "react";

export default function TrackerPage() {
  const [ip, setIp] = useState("Loading...");
  const [ua, setUa] = useState("");
  const [device, setDevice] = useState("Detecting...");

  useEffect(() => {
    setUa(navigator.userAgent);

    // Get IP address
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip));

    // Parse user agent
    const parser = require("ua-parser-js");
    const result = parser(navigator.userAgent);
    setDevice(`${result.device.vendor || "Unknown"} ${result.device.model || ""}`.trim());
  }, []);

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "2rem",
      background: "#f8f9fa",
      maxWidth: "600px",
      margin: "5rem auto",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>📡 Tracker Result</h2>
      <p><strong>IP Address:</strong> {ip}</p>
      <p><strong>User Agent:</strong> {ua}</p>
      <p><strong>Device Info:</strong> {device || "Unknown Device"}</p>
    </div>
  );
}
