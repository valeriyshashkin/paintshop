import prisma from "./prisma";

export default async function getContacts() {
  const contacts = await prisma.contact.findMany();

  let preparedContacts = {};
  for (const c of contacts) {
    preparedContacts[c.key] = c.value;
  }

  return preparedContacts;
}
