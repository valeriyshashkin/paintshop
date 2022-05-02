import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  const contacts = await prisma.contact.findMany();

  let preparedContacts = {};
  for (const c of contacts) {
    preparedContacts[c.key] = c.value;
  }

  res.json({ contacts: preparedContacts });
}
