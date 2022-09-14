import { atomWithStorage } from "jotai/utils";

const cartAtom = atomWithStorage("cart", []);

export default cartAtom;
