import '../index'

const Sidebar = () => {
    const onDragStart = (event, nodeType, label) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.effectAllowed = 'move';
    };
    const objects = [
        { style: 'bg-red-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'input', text: 'Input' },
        { style: 'bg-lime-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'input', text: 'Start' },
        { style: 'bg-teal-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'default', text: 'Encrypt' },
        { style: 'bg-indigo-200 w-40 my-2 py-2 mx-2 rounded-md', type: 'default', text: 'Decrypt' },
        { style: 'bg-stone-300 w-40 my-2 py-2 mx-2 rounded-md', type: 'output', text: 'send' },
        { style: 'bg-zinc-400 w-40 my-2 py-2 mx-2 rounded-md', type: 'output', text: 'print' },
    ]

    return (
        <div>
            {objects.map((object, key) => (
                <div className={object.style} onDragStart={(event) => onDragStart(event, object.type, object.text)} draggable>
                    <div key={key} className='text-center'>{object.text}</div>
                </div>
            ))}

        </div>
    );
};
export default Sidebar