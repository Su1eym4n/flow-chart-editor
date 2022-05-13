import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges

} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import Info from './Info';
import './updatenode.css'
import '../index.css';

const initialNodes = [
    // {
    //     id: 'A',
    //     type: 'group',
    //     data: { label: null },
    //     position: { x: 0, y: 0 },
    //     style: {
    //         width: 170,
    //         height: 140,
    //     },
    // },

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

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#E80F3D' } }, eds)),
        []
      );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.selected === true) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    node.data = {
                        ...node.data,
                        label: nodeName,
                    };
                }

                return node;
            })
        );
    }, [nodeName, setNodes]);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.selected === true) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    node.style = { ...node.style, backgroundColor: nodeBg };
                }

                return node;
            })
        );
    }, [nodeBg, setNodes]);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const label = event.dataTransfer.getData('application/reactflow/label');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
           
            

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${label} node` },
                style:{backgroundColor:'#FFFFFF'},
        
                
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );
    const graphStyles = { width: "100%", height: "100%" };
    return (
        <div>
            <div className='grid grid-cols-4 '>
                <ReactFlowProvider>
                    <Sidebar />
                    <div className="col-span-3" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onNodeClick={(event , node)=>{
                                event.preventDefault()
                                setNodeBg(node.style.backgroundColor)
                                setNodeName(node.data.label)
                                console.log(node.type)
                                console.log(node.data.label)
                                console.log(node.style.backgroundColor)
                            }}
                            style={graphStyles}
                        >

                            <div className="updatenode__controls">
                                <label>label:</label>
                                <input className='border-2 border-indigo-500/50' value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
                                <label className="updatenode__bglabel">background:</label>
                                <input className='border-2 border-indigo-500/50' value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />
                            </div>

                            <Controls />
                            <Background/>
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </div>

    );
};

export default Flow;