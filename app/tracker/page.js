'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [ip, setIp] = useState('Loading...');
  const [ua, setUa] = useState('');
  const [device, setDevice] = useState('Detecting...');

  useEffect(() => {
    setUa(navigator.userAgent);

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip));

    const getDeviceInfo = () => {
      const ua = navigator.userAgent;
      let device = 'Unknown';

      if (/Android/i.test(ua)) {
        const match = ua.match(/Android\s+([\d.]+).*;\s*(.*?)\s+Build/);
        device = match ? match[2] : 'Android Device';
      } else if (/iPhone|iPad|iPod/i.test(ua)) {
        device = 'Apple Device';
      }

      setDevice(device);
    };

    getDeviceInfo();
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      background: '#f4f4f4',
      maxWidth: '600px',
      margin: '4rem auto',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>📡 Tracker Info</h2>
      <p><strong>IP Address:</strong> {ip}</p>
      <p><strong>User Agent:</strong> {ua}</p>
      <p><strong>Device Info:</strong> {device}</p>
    </div>
  );
}
