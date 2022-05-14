import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    Handle,
    Position

} from 'react-flow-renderer';
import Sidebar from './Sidebar';
import './updatenode.css'
import '../index.css';
import { GrAdd } from 'react-icons/gr'
import { imageListClasses } from '@mui/material';

const DynOutputHandle = (props) => {
    const { idx } = props;

    return (
        <Handle
            type={"target"}
            id={`output${idx}`}
            position={Position.Up}
            style={{ left: 10 + idx * 20 }}
        />
    );
};

const DynInputHandle = (props) => {
    const { idx } = props;

    return (
        <Handle
            type={"source"}
            id={`source${idx}`}
            position={Position.Bottom}
            style={{ left: 10 + idx * 20 }}
        />
    );
};

const CustomInputNode = ({ data }, props) => {
    const [outputcount, setOutputCount] = useState(1);

    return (
        <>
            <div
                className=' hover:border-green-500 rounded-md'
            >
                {data.label}
                <hr />
                <div className='text sm fill-purple-700 hover:fill-green-500 my-1'>
                    <GrAdd onClick={() => setOutputCount((i) => i + 1)} />
                </div>

            </div>
            <div >
                {Array(outputcount)
                    .fill(null)
                    .map((_, i) => (
                        <DynInputHandle key={i} idx={i} />
                    ))}
            </div>
        </>
    );
};
const CustomOutputNode = ({ data }, props) => {
    const [outputcount, setOutputCount] = useState(1);

    return (
        <>
            <div
                className='py-1 hover:border-green-500 rounded-md'
            >
                <div >
                    {Array(outputcount)
                        .fill(null)
                        .map((_, i) => (
                            <DynOutputHandle key={i} idx={i} />
                        ))}
                </div>
                {data.label}
                <hr />
                <div className='text sm fill-purple-700 hover:fill-green-500 my-1'>
                    <GrAdd onClick={() => setOutputCount((i) => i + 1)} />
                </div>

            </div>
        </>
    );
};
const CustomFunctionNode = ({ data }, props) => {
    const [outputcount, setOutputCount] = useState(1);
    const [inputcount, setInputCount] = useState(1)

    return (
        <>
            <div
                className='py-1 hover:border-green-500 rounded-md'
            >
                <div className='text sm fill-purple-700 hover:fill-green-500 my-1'>
                    <GrAdd onClick={() => setOutputCount((i) => i + 1)} />
                </div>
                <hr />
                <div >
                    {Array(outputcount)
                        .fill(null)
                        .map((_, i) => (
                            <DynOutputHandle key={i} idx={i} />
                        ))}
                </div>
                <div >
                    {Array(inputcount)
                        .fill(null)
                        .map((_, i) => (
                            <DynInputHandle key={i} idx={i} />
                        ))}
                </div>
                {data.label}
                <hr />
                <div className='text sm fill-purple-700 hover:fill-green-500 my-1'>
                    <GrAdd onClick={() => setInputCount((i) => i + 1)} />
                </div>

            </div>
        </>
    );
};


const initialNodes = [
    {
        id: 'A',
        type: 'customInput',
        data: { label: 'cmoon' },
        position: { x: 50, y: 150 },
        style: {
            width: 200,
            height: 50,
        },
    },

];

let id = 0;
const getId = () => `node_${id++}`;

const Flow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodeName, setNodeName] = useState('NULL');
    const [nodeBg, setNodeBg] = useState('NULL');
    const [selected, setSelected] = useState(false)
    const nodeTypes = useMemo(() => ({ customOutput: CustomOutputNode, customInput: CustomInputNode, customFunction:CustomFunctionNode }), []);
    const [sizeX, setSizeX] = useState(0)
    const [sizeY, setSizeY] = useState(0)

    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }, [setNodes]
    );
    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds))
    }, [setEdges]
    );

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#E80F3D' } }, eds))
    }, []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node, key) => {
                if (node.selected === true) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    node.data = {
                        ...node.data,
                        label: nodeName,
                    };
                    node.style = { ...node.style, backgroundColor: nodeBg };
                    console.log(sizeX)
                    console.log(sizeY)
                    node.style = { ...node.style, width: sizeX, height: sizeY };
                }

                return node;
            })
        );
    }, [nodeName, nodeBg, sizeX, sizeY, setNodes]);



    useEffect(() => {
        setNodes((nds) =>
            nds.map((node, key) => {
                if (node.selected === true) {
                    // when you update a simple type you can just update the value
                    node.type = 'group';
                }

                return node;
            })
        );

    }, [selected, setNodes, setEdges]);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const label = event.dataTransfer.getData('application/reactflow/label');
            console.log(type)
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            let heightl = 50
            if(type === 'customFunction'){
                heightl = 80
            }

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${label}` },
                style: { backgroundColor: '#FFFFFF', width: 200, height:heightl, borderRadius: 6 },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );
    const graphStyles = { width: "100%", height: "500px" };
    return (
        <div>
            <div className='grid grid-cols-4 bg-indigo-800'>
                <ReactFlowProvider>
                    <Sidebar />
                    <div className="col-span-3 bg-indigo-900 rounded-md my-1 mx-2 border-2 border-indigo-400" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}

                            onNodeDragStart={(event, node) => {
                                event.preventDefault()
                                setNodeBg(node.style.backgroundColor)
                                setNodeName(node.data.label)
                                setSizeX(node.style.width)
                                setSizeY(node.style.height)
                            }}
                            nodeTypes={nodeTypes}
                            onNodeClick={(event, node) => {
                                event.preventDefault()
                                setNodeBg(node.style.backgroundColor)
                                setNodeName(node.data.label)
                                setSizeX(node.style.width)
                                setSizeY(node.style.height)
                                if (node.type === 'group') {

                                }
                                console.log(node.type)
                                console.log(node.data.label)
                                console.log(node.style.backgroundColor)
                                console.log('x ' + node.style.width)
                                console.log('y ' + node.style.height)
                            }}
                            style={graphStyles}
                        >

                            <div className="updatenode__controls">
                                <label>Label:</label>
                                <input className='border-2 border-indigo-500/50 rounded-md px-1 text-black' value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
                                <label className="updatenode__bglabel">Background:</label>
                                <input className='border-2 border-indigo-500/50 rounded-md px-1 text-black' value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />
                                <div className="updatenode__checkboxwrapper">
                                    <label>Group</label>
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={(evt) => setSelected(evt.target.checked)}
                                    />
                                </div>
                                <label className="updatenode__bglabel">Width:</label>
                                <input className='border-2 border-indigo-500/50 rounded-md px-1 text-black' value={sizeX} onChange={(evt) => setSizeX(evt.target.value)} />
                                <label className="updatenode__bglabel">Height:</label>
                                <input className='border-2 border-indigo-500/50 rounded-md px-1 text-black' value={sizeY} onChange={(evt) => setSizeY(evt.target.value)} />

                            </div>

                            <Controls />
                            <Background color='#03C875' />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </div>

    );
};

export default Flow;