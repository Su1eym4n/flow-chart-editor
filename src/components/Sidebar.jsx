import '../index'
import { useState } from 'react';
import FilterButtons from './FilterButtons';
// import Data from './Data'


const Sidebar = () => {

    const onDragStart = (event, nodeType, label, color) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.setData('application/reactflow/color', color);
        event.dataTransfer.effectAllowed = 'move';
    };
    const Data = [
        { style: 'bg-blue-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customInput', text: 'INPUT_1', color: '#42a5f5' },
        { style: 'bg-blue-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'customInput', text: 'INPUT_2', color: '#90caf9' },
        { style: 'bg-teal-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'customFunction', text: 'NODE_EXEC_1', color: '#80cbc4' },
        { style: 'bg-teal-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customFunction', text: 'NODE_EXEC_2', color: '#26a69a' },
        { style: 'bg-indigo-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'customOutput', text: 'OUTPUT_1', color: '#7986cb' },
        { style: 'bg-indigo-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customOutput', text: 'OUTPUT_2', color: '#5c6bc0' },
    ]

    const menuItems = [...new Set(Data.map((val) => val.type))]
    const [item, setItem] = useState(Data);
    const filterItem = (curcat) => {
        const newItem = Data.filter((newVal) => {
            return newVal.type === curcat;
        });

        setItem(newItem);
    };

    return (
        <div className='static'>
            <FilterButtons filterItem={filterItem}
                setItem={setItem}
                menuItems={menuItems}
            />
            {item.map((object, key) => (
                <div key={key} className={object.style} onDragStart={(event) => onDragStart(event, object.type, object.text, object.color)} draggable>
                    <div key={key} className='text-center'>{object.text}</div>
                </div>
            ))}
        </div>
    );
};
export default Sidebar