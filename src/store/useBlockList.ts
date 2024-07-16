import { create } from "zustand";

export type typeBlock = {
  id: number;
  content: string;
  type: string;
  x: number;
  y: number;
};

export type typeBlockList = {
  blocks: typeBlock[];
  setBlocks: (blocks: typeBlock[]) => void;
};

const useBlockList = create((set) => ({
  blocks: [],
  setBlocks: (blocks: typeBlock[]) => set({ blocks }),
}));

export default useBlockList;
