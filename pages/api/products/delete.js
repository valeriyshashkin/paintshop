import prisma from "../../../utils/prisma";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
    } catch {
      res.end();
      return;
    }

    const { publicId } = JSON.parse(req.body);

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const public_id = await prisma.product.findUnique({
      where: {
        publicId,
      },
      select: {
        src: true,
      },
    });

    await cloudinary.v2.uploader.destroy(public_id);

    await prisma.product.delete({
      where: {
        publicId,
      },
    });

    res.end();
  }
}
