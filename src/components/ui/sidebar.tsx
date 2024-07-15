import React from 'react';

export default function Sidebar() {
  return (
    <div className="bg-[#2D2D2D] w-72 h-screen text-white p-4">
      <div className="mb-4">
        <h1 className="text-xl font-medium tracking-wide">BLOCKS</h1>
      </div>
      <ul>
        <li className="mb-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
        </li>
        <li className="mb-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
        </li>
        <li className="mb-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Services</a>
        </li>
        <li className="mb-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Contact</a>
        </li>
      </ul>
    </div>
  );
}
