import { useState } from "react";
import { X } from 'lucide-react';
import { Button } from "./button";

export default function Modal({ onSubmit,modal,setModal, deSelectBlock }:any) {
  const [x, setX] = useState(modal.x);
  const [y, setY] = useState(modal.y);

  const handleSubmit = () => {
    onSubmit(x, y);
    deSelectBlock();
  };

  const handleCloseModal = () => {
    setModal({show:false,type:"",x:0,y:0});
    deSelectBlock();
  }

  const handleDelete = () => {
    deSelectBlock();
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-md  min-w-72">
  <div className="flex justify-between item-center mb-8">
  <h2 className="text-xl">Edit {modal.type}</h2>
      <div className="button bg-black bg-opacity-0 rounded-full p-1  hover:bg-gray-200 hover:cursor-pointer" onClick={handleCloseModal}>
  <X size={20} />
</div>
  </div>
        <div className="p-2 flex flex-col gap-2">
            
        
        <div className="mb-2">
          <label className="block mb-1">X:</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(parseInt(e.target.value))}
            className="border p-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Y:</label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(parseInt(e.target.value))}
            className="border p-1 w-full"
          />
        </div>
        <div className="flex flex-row gap-2 mt-4">
        <Button onClick={handleSubmit} className="bg-[#0044C1] flex flex-1 text-white px-4 py-2 rounded-md">
          Save Changes
        </Button>
        <Button onClick={handleDelete} className="bg-[#e32636] flex flex-1 text-white px-4 py-2 rounded-md">
          Delete
        </Button>
        </div>
        
        </div>
      </div>
    </div>
  );
}
