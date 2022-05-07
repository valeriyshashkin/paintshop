import getContacts from "../../../utils/getContacts";

export default async function handler(req, res) {
  res.json({ contacts: await getContacts() });
}
