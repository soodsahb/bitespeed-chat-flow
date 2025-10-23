import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextNode from './components/TextNode';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';



const initialNodes = [
  {
    id: '1',
    type: 'textNode', // i will create a custom node for text type 
    position: { x: 250, y: 100 },
    data: { text: 'test message 1' }
  }
];

const initialEdges = [];



const App = () => {
   const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [error,setError]=useState(null);
  const [success, setSuccess] = useState(null);

   
 const [selectedNodeId, setSelectedNodeId] = useState(null);
    const reactFlowWrapper = useRef(null);

    const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  //we need to add a new node at mouse's drop position however mouse position and bounds calculation does'nt work correctly it seems screentoflow position is being used from library's hook

  const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    //directly using client x and y
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${+new Date()}`,
      type,
      position,
      data: { text: 'New message' },
    };

    setNodes((nds) => nds.concat(newNode));
  },
  [screenToFlowPosition, setNodes]
);

 // default functions to make flow work 
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

//we need to prevent user from creating more than one source edge as per requirement
  const onConnect = useCallback(
  (params) => {
   
    const existing = edges.some(
      (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    if (existing) return; 
    setEdges((eds) => addEdge(params, eds));
  },
  [edges]
);

   //we need to specify node types here so we can pass it to reactflow
  const nodeTypes = {textNode: TextNode}; 



  // we need to track selected node so we are able to edit the text inside it also we i faced issue where node is draggable when selected which closes setting panel so selected node must be set to draggable false

const onSelectionChange = useCallback(({ nodes }) => {
  setSelectedNodeId(nodes.length ? nodes[0].id : null);
}, []);


// function to edit text of a node 

const handleTextChange = (text) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === selectedNodeId
        ? { ...node, data: { ...node.data, text } }
        : node
    )
  );
};

const selectedNode = nodes.find(node => node.id === selectedNodeId);


//we need to make sure that we do not allow editing mode while dragging 
const onNodeClick = useCallback((event, node) => {
  setSelectedNodeId(node.id);
  setIsEditing(true);
}, []);

const onNodeDragStart = useCallback(() => {
  setIsEditing(false);
}, []);


// function to check where to save the flow or not and show error 


function handleSave() {
  
  //if only one node save
  if (nodes.length <= 1) {
   
    setError(null);
    setSuccess('Flow saved successfully!');
   
    return;
  }

  // checking if some node does not have a target handle
  const nodesWithNoTarget = nodes.filter(
    (node) => !edges.some(edge => edge.target === node.id)
  );

  if (nodesWithNoTarget.length > 1) {
    setError('Cannot save Flow');
    setSuccess(null);
   
  } else {
    setError(null);
    setSuccess('Flow saved successfully!');
   
  }
}


  //basic react flow setup
  return (
    <>
    <div
  style={{
    width: '100vw',
    top:0,
    height: 56,
    background: '#f4f3f3d8',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 200
  }}
>
  {/* Error Banner */}
  {error && (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(250 41 28 / 50%)',
        color: 'black',
        padding: '8px 32px',
        borderRadius: 6,
        fontWeight: 'bold'
      }}
    >
      {error}
    </div>
  )}

  {success && !error && (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(76, 175, 80, 0.2)',
      color: '#28782c',
      padding: '8px 32px',
      borderRadius: 6,
      fontWeight: 'bold'
    }}
  >
    {success}
  </div>
)}

  {/* Save Button */}
  <button
    style={{
      marginLeft: 'auto',
      marginRight: 24,
      padding: '10px 24px',
      fontSize: '16px',
      background: '#fff',
      border: '1px solid #90caf9',
      borderRadius: 8,
      cursor: 'pointer'
    }}
    onClick={handleSave}
  >
    Save Changes
  </button>
</div>

    <div style={{ width: '100vw', height: `calc(100vh - 56px)`, position: 'relative' }} ref={reactFlowWrapper}
     onDrop={onDrop}
      onDragOver={onDragOver}
      >
      {isEditing && selectedNode && <SettingsPanel node={selectedNode} onChange={handleTextChange} />}
{(!selectedNode ||!isEditing)&& <NodesPanel />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        fitView
        onNodeClick={onNodeClick}
  onNodeDragStart={onNodeDragStart}
      >
        <Background />
      </ReactFlow>

  


    </div>
    </>
  )
}

export default App