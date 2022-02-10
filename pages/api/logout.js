import setCookie from "../../utils/cookies";

export default function handler(req, res) {
  setCookie(res, "auth", "", { maxAge: 0, path: "/" });
  res.end();
}
