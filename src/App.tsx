import { useState } from "react";
import { Button } from "./components/ui/button";
import Modal from "./components/ui/modal";
import "./App.css";
import Sidebar from "./components/ui/sidebar";
import { typeBlock } from "@/types/block";
import { blocksData } from "./utils/staticData";

function App() {
  const [blocks, setBlocks] = useState<typeBlock[]>([]);
  const [modal, setModal] = useState({
    show: false,
    type: "",
    x: 0,
    y: 0,
    idx: 0,
  });

  const [currentBlock, setCurrentBlock] = useState<typeBlock>({} as typeBlock);
  console.log(modal);
  console.log("blcoks data", blocks);
  const handleDrop = (e: any) => {
    e.preventDefault();
    const blockData = JSON.parse(e.dataTransfer.getData("block"));
    setCurrentBlock(blockData);
    setModal((modal) => ({ ...modal, show: true, type: blockData.type, idx:blockData.id }));
  };

  const handleSelect = (block:typeBlock,idx:number) => {
    console.log("type", blocks[idx]);
    setModal({ show: true, type: blocks[idx].type, x: blocks[idx].x, y: blocks[idx].y,idx:idx});
    const selectedBlock = document.querySelector(`.block-item-${block.id}`);
    selectedBlock?.classList.add("selected");
    setCurrentBlock(block);
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleModalSubmit = (x: number, y: number) => {
    console.log("current idx", modal.idx);
    if(blocks[modal.idx]){
      const newBlocks = [...blocks];
      newBlocks[modal.idx] = { ...currentBlock, x, y };
      setBlocks(newBlocks);
    }
    else
    setBlocks([...blocks, { ...currentBlock, x, y }]);
    setModal({ show: false, type: "", x: 0, y: 0 , idx: 0});


  };

  const deSelectBlock = () => {
    setCurrentBlock({} as typeBlock);
    const allBlocks = document.querySelectorAll('.selected');

    allBlocks.forEach(block => block.classList.remove('selected'));
  };

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <div
          className="flex flex-row flex-1 w-full border-4 relative bg-[#F3F3F3]"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {blocks.map((block: typeBlock, idx) => (
            <div
             className={`block-item-${block.id} cursor-pointer`}
              key={idx}
              onClick={()=>handleSelect(block,idx)}
              style={{
                position: "absolute",
                top: `${block.y}px`,
                left: `${block.x}px`,
              }}
            >
              {block.content}
            </div>
          ))}
        </div>
        <Sidebar />
      </div>
      {modal.show && (
        <Modal onSubmit={handleModalSubmit} modal={modal} setModal={setModal} deSelectBlock={deSelectBlock} />
      )}
    </>
  );
}

export default App;
