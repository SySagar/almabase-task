import { useState } from "react";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import Modal from "./components/ui/modal";
import "./App.css";
import Sidebar from "./components/ui/sidebar";
import useBoardState, {type typeBoardState} from "./store/useBoardState";
import useBlockList, {type typeBlock, type typeBlockList} from "./store/useBlockList";
import Switch from "./components/ui/switch";

function App() {
  // const [blocks, setBlocks] = useState<typeBlock[]>([]);
  const {blocks , setBlocks} = useBlockList<typeBlockList>((state:any) => ({
    blocks: state.blocks,
    setBlocks: state.setBlocks,
  }));
  const [modal, setModal] = useState({
    show: false,
    type: "",
    x: 0,
    y: 0,
    idx: 0,
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { currentBoardState, toggleBoardState } = useBoardState<typeBoardState>(
    (state:any) => ({
      currentBoardState: state.currentBoardState,
      toggleBoardState: state.toggleBoardState,
    })
  );
  
  const [currentBlock, setCurrentBlock] = useState<typeBlock>({} as typeBlock);
  // console.log(modal.show);
  // console.log("blcoks data", blocks);
  const handleDrop = (e: any) => {

    e.preventDefault();
    const blockData = JSON.parse(e.dataTransfer.getData("block"));
    console.log("newBlocks", blockData);
    if(blocks.filter((block) => block.id === blockData.id).length > 0) {
      const [newX, newY] = [e.clientX-dragOffset.x, e.clientY-dragOffset.y];
      const newBlocks = [...blocks];
      const blockIdx = newBlocks.findIndex((block) => block.id === blockData.id);
      newBlocks[blockIdx] = { ...blockData, x: newX, y: newY, type: blockData.type };
      
      setBlocks(newBlocks);
      return;
    }

    setCurrentBlock(blockData);
    setModal((modal) => ({ ...modal, show: true, type: blockData.type, idx:blockData.id }));
  };

  const handleSelect = (block:typeBlock,idx:number) => {
    setModal({ show: true, type: blocks[idx].type, x: blocks[idx].x, y: blocks[idx].y,idx:idx});
    const selectedBlock = document.querySelector(`.block-${block.type}-${block.id}`);
    selectedBlock?.classList.add("selected");
    setCurrentBlock(block);
  }

  const handleDrag = (e:any) => {
    // const selectedBlock = document.querySelector(`.block-item-${block.id}`);
    // selectedBlock?.classList.add("selected");
    const rect = e.target.getBoundingClientRect();
    console.log("rect",rect);
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });

    e.dataTransfer.setData("block", JSON.stringify({ id: e.target.id, type: e.target.className.split('-')[1], content: e.target.innerText }));
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleModalSubmit = (x: number, y: number) => {
    // console.log("current idx", modal.idx);
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

  const renderBlockContent = (block: typeBlock) => {
    console.log("block", block);
    switch (block.type) {
      case "button":
        return <Button>{block.content}</Button>;
      case "label":
        return <Label htmlFor="label">{block.content}</Label>;
      case "input":
        return <input placeholder={block.content} />;
      default:
        return <div>{block.content}</div>;
    }
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
             className={`block-${block.type}-${block.id}`}
              key={idx}
              id={block.id.toString()}
              draggable={currentBoardState=='drag'?true:false}
              onDragStart={handleDrag}
              onClick={()=>currentBoardState=='edit'?handleSelect(block,idx):handleDrag}
              style={{
                position: "absolute",
                top: `${block.y}px`,
                left: `${block.x}px`,
              }}
            >
              {renderBlockContent(block)}
            </div>
          ))}
           <div className="flex flex-col p-4">
          <Switch  toggleBoardState={toggleBoardState} currentBoardState={currentBoardState} />
        </div>
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
