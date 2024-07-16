import { create } from 'zustand';

export type typeBoardState = {
    currentBoardState: string;
    toggleBoardState: () => void;
    }

const useBoardState = create((set) => ({
  currentBoardState: "edit", 
  toggleBoardState: () => set((state:any) => ({
    currentBoardState: state.currentBoardState === "edit" ? "drag" : "edit",
  })),
}));

export default useBoardState;
