import { useState } from "react";
import {TaskCreateType} from "daddys-personal-manager";


export function Notepad(){
  // State to handle the content of the Notepad
  const [content, setContent] = useState('');
    
  // Handler for input changes
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Handler for clearing the Notepad
  const handleClear = () => {
    setContent('');
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-5">Notepad</h2>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your notes here..."
        className="w-3/4 md:w-1/2 h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <button
        onClick={handleClear}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Clear
      </button>
    </div>
  );
}


