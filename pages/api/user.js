import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
  } catch {
    res.json({ error: true });
    return;
  }

  res.json({ error: false });
}
