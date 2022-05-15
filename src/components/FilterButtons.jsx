import React from "react";


const FilterButtons = ({ setItem, menuItems, filterItem }) => {
    const Data = [
        { style: 'bg-blue-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customInput', text: 'INPUT_1', color: '#42a5f5' },
        { style: 'bg-blue-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'customInput', text: 'INPUT_2', color: '#90caf9' },
        { style: 'bg-teal-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'customFunction', text: 'NODE_EXEC_1', color: '#80cbc4' },
        { style: 'bg-teal-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customFunction', text: 'NODE_EXEC_2', color: '#26a69a' },
        { style: 'bg-indigo-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'customOutput', text: 'OUTPUT_1', color:'#7986cb' },
        { style: 'bg-indigo-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customOutput', text: 'OUTPUT_2', color:'#5c6bc0' },
    ]
  return (
    <>
      <div className="d-flex justify-content-center">
        {menuItems.map((Val, id) => {
          return (
            <button
              className="btn-dark text-white border-2 rounded-md my-1 px-1 mx-2 btn fw-bold hover:cursor-pointer hover:border-slate-500 hover:text-slate-500"
              key={id}
              onClick={() => filterItem(Val)}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white border-2 rounded-md px-1 mx-2 my-1fw-bold btn hover:cursor-pointer hover:border-slate-500 hover:text-slate-500"
          onClick={() => setItem(Data)}
        >
          All
        </button>
       </div>
    </>
  );
};
 
export default FilterButtons;