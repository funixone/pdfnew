"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [ip, setIP] = useState("Loading...");
  const [ua, setUA] = useState("");

  useEffect(() => {
    setUA(navigator.userAgent);
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIP(data.ip));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>📡 IP Tracker</h2>
      <p><strong>IP Address:</strong> {ip}</p>
      <p><strong>User Agent:</strong> {ua}</p>
    </div>
  );
}
