import { useMemo, useEffect, useState, useCallback } from "react";
import { componentRegistry } from "./utils/componentRegistry";
import Modal from "./components/ui/modal";
import { Button } from "./components/ui/button";
import "./App.css";
import Sidebar from "./components/ui/sidebar";
import useBoardState, { type typeBoardState } from "./store/useBoardState";
import useBlockList, {
  type typeBlock,
  type typeBlockList,
} from "./store/useBlockList";
import useCursor, { type typeCursor } from "./store/useCursor";
import Switch from "./components/ui/switch";
import { cn } from "./lib/utils";
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { time } from "console";

function App() {
  const { blocks, setBlocks } = useBlockList<typeBlockList>((state: any) => ({
    blocks: state.blocks,
    setBlocks: state.setBlocks,
  }));
  const [modal, setModal] = useState({
    show: false,
    type: "",
    x: 0,
    y: 0,
    idx: 0,
    blockId: 0,
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { currentBoardState, toggleBoardState } = useBoardState<typeBoardState>(
    (state: any) => ({
      currentBoardState: state.currentBoardState,
      toggleBoardState: state.toggleBoardState,
    })
  );
  const { cursorType, toggleCursor } = useCursor<typeCursor>((state: any) => ({
    cursorType: state.cursorType,
    toggleCursor: state.toggleCursor,
  }));
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveToWorkspace();
    }, 3000); 

    return () => clearTimeout(timeout);
  }, [blocks]);

  const saveToWorkspace = useCallback(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
    toast({
      description: "Workspace saved",
    });
  }
  , [blocks]);

  console.log("blocks", blocks);
  const [currentBlock, setCurrentBlock] = useState<typeBlock>({} as typeBlock);

  const handleDrop = (e: any) => {
    e.preventDefault();
    const blockData = JSON.parse(e.dataTransfer.getData("block"));
    if (blocks.filter((block) => block.id === blockData.id).length > 0) {
      const [newX, newY] = [e.clientX - dragOffset.x, e.clientY - dragOffset.y];
      const newBlocks = [...blocks];
      const blockIdx = newBlocks.findIndex(
        (block) => block.id === blockData.id
      );
      newBlocks[blockIdx] = {
        ...blockData,
        x: newX,
        y: newY,
        type: blockData.type,
      };
      console.log("blockDat", blockData);
      console.log("newBlocks", newBlocks[blockIdx]);
      setBlocks(newBlocks);
      return;
    }

    setCurrentBlock(blockData);
    setModal((modal) => ({
      ...modal,
      show: true,
      type: blockData.type,
      idx: blockData.id,
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    }));
  };

  const handleSelect = (block: typeBlock, idx: number) => {
    const updatedBlock = {
      ...block,
      show: true,
      type: block.type,
      idx: idx,
      x: block.x,
      y: block.y,
      blockId: block.id,
    };

    setModal(updatedBlock);
    const selectedBlock = document.querySelector(
      `.block-${block.type}-${block.id}`
    );
    selectedBlock?.classList.add("selected");
    setCurrentBlock(block);
  };

  const handleDragStart = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });

    const blockId = e.target.id;
    const blockData = blocks.find((block) => block.id.toString() === blockId);

    e.dataTransfer.setData(
      "block",
      JSON.stringify(blockData)
    );

    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: any) => {
    const blockId = e.target.id;
    const blockData = blocks.find((block) => block.id.toString() === blockId);

    if (blockData) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const newBlocks = [...blocks];
      const blockIdx = newBlocks.findIndex(
        (block) => block.id.toString() === blockId
      );
      newBlocks[blockIdx] = {
        ...blockData,
        x: newX,
        y: newY,
      };
      setBlocks(newBlocks);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleModalSubmit = (updatedModal: any) => {
    // console.log("current idx", modal.idx);
    if (blocks[modal.idx]) {
      const newBlocks = [...blocks];
      newBlocks[modal.idx] = { ...currentBlock, ...updatedModal };
      setBlocks(newBlocks);
    } else setBlocks([...blocks, { ...currentBlock, ...updatedModal }]);
    setModal({ show: false, type: "", x: 0, y: 0, idx: 0, blockId: 0 });
  };

  const deSelectBlock = () => {
    setCurrentBlock({} as typeBlock);
    const allBlocks = document.querySelectorAll(".selected");

    allBlocks.forEach((block) => block.classList.remove("selected"));
  };

  const renderBlockContent = (block: typeBlock) => {
    const registryEntry = componentRegistry[block.type];
    return registryEntry.render(block);
  };

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <div
          className={cn(
            "board flex flex-row flex-1 w-full border-4 relative bg-[#F3F3F3]",
            cursorType
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {blocks.map((block: typeBlock, idx) => (
            <div
              className={`block-${block.type}-${block.id} flex flex-row justify-center items-center gap-1`}
              key={idx}
              id={block.id.toString()}
              draggable={currentBoardState == "drag" ? true : false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onClick={() =>
                currentBoardState == "edit"?handleDragStart : null
              }
              style={{
                position: "absolute",
                top: `${block.y}px`,
                left: `${block.x}px`,
              }}
            >
              {renderBlockContent(block)}
              { currentBoardState == "edit" &&
                    <Button variant={"ghost"} size={"sm"} className="cursor-pointer p-1 rounded-xl w-7 h-7 " onClick={()=>handleSelect(block,idx)}>
                    <Pencil className="h-4 w-4 hover:stroke-blue-700"  />
                  </Button>
              
              }
            </div>
          ))}
          <div className="flex flex-col p-4">
            <Switch
              toggleBoardState={toggleBoardState}
              toggleCursor={toggleCursor}
              currentBoardState={currentBoardState}
            />
          </div>
        </div>
        <Sidebar />
      </div>
      {modal.show && (
        <Modal
          onSubmit={handleModalSubmit}
          modal={modal}
          setModal={setModal}
          deSelectBlock={deSelectBlock}
        />
      )}
    </>
  );
}

export default App;
