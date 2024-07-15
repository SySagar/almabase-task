import Block from "./block";
import { blocksData } from "@/utils/staticData";
export default function Sidebar() {
  return (
    <div className="bg-[#2D2D2D] w-72 h-screen text-white p-4">
      <div className="mb-4">
        <h1 className="text-xl font-medium tracking-wide">BLOCKS</h1>
      </div>
      <div className="blocks flex flex-col gap-2 mt-6">
        {blocksData.map((block, idx) => (
          <Block key={idx} content={block.content} id={idx} type={block.type} />
        ))}
      </div>
    </div>
  );
}
