import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const logPath = path.resolve('./logs.json');
  if (!fs.existsSync(logPath)) return res.status(200).json([]);
  const logs = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  res.status(200).json(logs);
}
