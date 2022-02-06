import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const { id, slug } = router.query;

  return `На этой странице отображается продукт ${slug} с идентификатором ${id}`;
}
