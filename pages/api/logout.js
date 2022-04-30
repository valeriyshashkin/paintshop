import { removeCookies } from "cookies-next";

export default function handler(req, res) {
  removeCookies("auth", { req, res });
  res.end();
}
