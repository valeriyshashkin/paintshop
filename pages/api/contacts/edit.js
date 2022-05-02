import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);

    await prisma.contact.update({
      where: {
        key: "email",
      },
      data: {
        value: email,
      },
    });

    res.end();
  }
}
