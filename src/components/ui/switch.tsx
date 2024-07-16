import React from 'react';

type SwitchProps = {
  toggleBoardState: (newState: 'edit' | 'drag') => void;
  toggleCursor: (newState: 'cursor-grab' | 'cursor-auto') => void;
  currentBoardState: string;
};

const Switch: React.FC<SwitchProps> = ({ toggleBoardState, currentBoardState,toggleCursor }) => {


  const handleClick = (newState: 'edit' | 'drag') => {
    if (newState === currentBoardState) return; 

    toggleBoardState(newState);
    toggleCursor(newState === 'drag' ? 'cursor-grab' : 'cursor-auto');
  };

  return (
    <div
      className={`flex items-center space-x-2 md:absolute md:end-10 md:bottom-5 rounded-xl border-2 p-1 px-2 fixed bottom-10 right-10`}
    >
      <label
        htmlFor="edit"
        className={`font-medium text-sm cursor-pointer mr-2 ${currentBoardState === 'edit' ? 'text-blue-500 font-medium ' : ''}`}
        onClick={() => handleClick('edit')}
      >
        Edit
      </label>
      <label
        htmlFor="drag"
        className={`font-medium text-sm cursor-pointer ${currentBoardState === 'drag' ? 'text-blue-500 font-medium ' : ''}`}
        onClick={() => handleClick('drag')}
      >
        Drag
      </label>
    </div>
  );
};

export default Switch;
