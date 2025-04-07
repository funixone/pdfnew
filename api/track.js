import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./logs.json');

export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'] || 'unknown';
  const now = new Date().toLocaleString();

  const newEntry = {
    ip,
    ua,
    device: detectDevice(ua),
    time: now
  };

  let logs = [];
  if (fs.existsSync(logPath)) {
    logs = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  }

  logs.unshift(newEntry);
  fs.writeFileSync(logPath, JSON.stringify(logs.slice(0, 100), null, 2));

  // 1x1 pixel tracking image response
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': transparent.length
  });
  res.end(transparent);
}

const transparent = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  'base64'
);

function detectDevice(ua) {
  ua = ua.toLowerCase();
  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("android")) {
    if (ua.includes("samsung")) return "Samsung Android";
    if (ua.includes("redmi")) return "Xiaomi (Redmi)";
    if (ua.includes("vivo")) return "Vivo Android";
    return "Android Device";
  }
  if (ua.includes("windows")) return "Windows PC";
  if (ua.includes("mac")) return "MacOS";
  return "Unknown Device";
}
