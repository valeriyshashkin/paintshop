export default {
  title: "Товары",
  name: "products",
  type: "document",
  fields: [
    {
      title: "Название",
      type: "string",
      name: "name",
    },
    {
      title: "Цена",
      type: "number",
      name: "price",
    },
    {
      title: "Описание",
      type: "array",
      of: [{ type: "block" }],
      name: "description",
    },
    {
      title: "Фотография",
      type: "image",
      name: "photo",
    },
  ],
};
