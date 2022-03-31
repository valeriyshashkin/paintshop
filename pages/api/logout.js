import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader("Set-Cookie", serialize("auth", "", { maxAge: 0, path: "/" }));
  res.end();
}
