import { create } from 'zustand';

export type typeCursor = {
    cursorType: string;
    toggleCursor: () => void;
    }

const useCursor = create((set) => ({
  cursorType: "cursor-auto", 
  toggleCursor: () => set((state:any) => ({ cursorType: state.cursorType === "cursor-grab" ? "cursor-auto" : "cursor-grab" })),
}));

export default useCursor;
