import { useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { GrFormAdd } from 'react-icons/gr';
const handleStyle = { left: 10 };

const initialPorts = [
    { type: 'target', id: 'a' }
]
const CustomOutputNode = ({ data }) => {
    const [ports, setPorts] = useState(initialPorts)
    const [arr, setArr] = useState(['a'])
    const [counter, setCounter] = useState(1)

    // const addTodo = useCallback(() => {
    //     setArr((t) => [...t, "New Todo"]);

    // }, [arr]);

    const addPort = useCallback(() => {
        if (counter === 1) {
            setPorts((t) => [...t, { type: 'target', id: 'b' }]);
            setCounter(2)
        } else if (counter === 2) {
            setPorts((t) => [...t, { type: 'target', id: 'c' }]);
            setCounter(3)
        }


    }, [ports]);
    console.log(ports)
    // const addPort = () => {
    //     console.log('adding')
    //     if (ports === 1) {
    //         setPorts([...ports, { type: 'target', style: { left: 10 }}]);
    //         console.log
    //     }else if(ports === 2){
    //         setPorts((t) => [...t, { type: 'target', style: { right: 10 } }]);
    //     }
    //     console.log(ports)
    // };

    return (
        <div>
            {ports.map((port, key) => (
                <Handle key={key} type={port.type} id={port.id} position={counter === 1 ? Position.top : Position.left} style={port.style} />
            ))}


            <div className='border-2 border-black rounded-md grid grid-cols-2 py-2'>
                <div className='px-1 t'><label htmlFor="text">{data.label}</label></div>
                <div className='grid grid-cols-2'>
                    <div>{counter}/3</div>
                    <div className='py-1 text-blue-700' onClick={addPort}><GrFormAdd /></div>
                </div>

            </div>
        </div>
    );
}
export default CustomOutputNode