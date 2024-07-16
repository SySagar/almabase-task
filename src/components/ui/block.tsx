import { GripVertical } from "lucide-react";
import { useRef } from "react";
import { nanoid } from 'nanoid';

type BlockProps = {
  content: string;
  id: number;
  type: string;
};

export default function Block({ content, id, type }: BlockProps) {
    const dragImageRef = useRef(null);
  const handleDragStart = (e: any) => {
    const blockId = nanoid()
    e.dataTransfer.setData("block", JSON.stringify({ id:blockId, type, content }));


    e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
  };

  return (
    <div
      className="p-2 py-3 flex items-center gap-2 bg-white text-black rounded-sm cursor-grab"
      key={id}
      ref={dragImageRef}
      draggable
      onDragStart={handleDragStart}
    >
      <GripVertical size={24} color="#D4D4D4" />
      <div className="content font-normal text-sm">{content}</div>
    </div>
  );
}
