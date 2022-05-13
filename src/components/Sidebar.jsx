import '../index'

const Sidebar = () => {
    const onDragStart = (event, nodeType, label) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.effectAllowed = 'move';
    };
    const objects = [
        { style: 'bg-red-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'input', text: 'INPUT' },
        { style: 'bg-lime-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'input', text: 'START' },
        { style: 'bg-teal-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'default', text: 'NODE_01' },
        { style: 'bg-indigo-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'default', text: 'NODE_02' },
        { style: 'bg-stone-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'output', text: 'SEND' },
        { style: 'bg-zinc-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'output', text: 'PRINT' },
       // { style: 'bg-blue-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customInput', text: 'INPUT_1' },
        //{ style: 'bg-blue-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'customOutput', text: 'INPUT_2' },
    ]

    return (
        <div>
            {objects.map((object, key) => (
                <div key={key} className={object.style} onDragStart={(event) => onDragStart(event, object.type, object.text)} draggable>
                    <div key={key} className='text-center'>{object.text}</div>
                </div>
            ))}

        </div>
    );
};
export default Sidebar