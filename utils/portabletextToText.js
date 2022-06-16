// https://www.sanity.io/schemas/portable-text-to-plain-text-cc845843
const defaults = { nonTextBehavior: "remove" };

export default function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}
