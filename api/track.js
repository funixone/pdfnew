export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'];
  console.log(`IP: ${ip} | UA: ${ua}`);

  // Return a transparent 1x1 PNG
  const img = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGAAAAAEAAGjChWDAAAAAElFTkSuQmCC",
    'base64'
  );
  res.setHeader("Content-Type", "image/png");
  res.send(img);
}
