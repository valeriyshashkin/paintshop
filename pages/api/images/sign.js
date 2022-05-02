import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
  } catch {
    res.end();
    return;
  }

  const timestamp = new Date().getTime();
  const signature = await cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({ timestamp, signature });
}