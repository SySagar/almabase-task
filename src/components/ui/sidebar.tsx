import Block from "./block";
import { blocksData } from "@/utils/staticData";
import { Button } from "./button";
import {Download} from 'lucide-react';
import FileSaver from 'file-saver';

export default function Sidebar() {

  const handleExport = () => {
    const exportData = localStorage.getItem('blocks');

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, 'board-data.json');
  };

  return (
    <div className="bg-[#2D2D2D] w-72 h-screen  flex flex-col justify-start items-center text-white p-4 relative">
      <div className="mb-2 w-full">
        <h1 className="text-xl font-medium tracking-wide">BLOCKS</h1>
      </div>
      <div className="blocks flex flex-col gap-2 mt-2  w-full">
        {blocksData.map((block, idx) => (
          <Block key={idx} content={block.content} id={idx} type={block.type} />
        ))}
      </div>
        <Button  onClick={handleExport} variant="outline" size={"lg"} className="text-green-400 outline-green-500 bg-transparent hover:text-green-400 hover:bg-transparent absolute bottom-7 ">
        <Download className="mr-2 h-4 w-4" /> Export File
        </Button>
    </div>
  );
}
