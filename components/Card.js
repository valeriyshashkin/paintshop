import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

export default function Card({ name, price, image }) {
  return (
    <div>
      <Link href={`/product/${slugify(name).toLowerCase()}`}>
        <a>
          <div className="py-2 flex items-center">
            <div className="max-w-[100px] md:max-w-[200px] w-full">
              <div className="w-full pb-full relative block">
                <Image src={image} layout="fill" objectFit="cover" alt="" />
              </div>
            </div>
            <div className="px-5">
              <h5 className="text-2xl pb-2 font-semibold tracking-tight">
                {name}
              </h5>
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-3xl font-bold">{price} ₽</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
