

// function to check whether to save the flow or not and show error 
export function canSaveFlow(nodes, edges) {
  if (nodes.length <= 1) return { error: null, success: "Flow saved successfully!" };
  const nodesWithNoTarget = nodes.filter(
    node => !edges.some(edge => edge.target === node.id)
  );
  if (nodesWithNoTarget.length > 1)
    return { error: "Cannot save Flow", success: null };
  return { error: null, success: "Flow saved successfully!" };
}

// function to edit text of a node 
export function updateNodeText(nodes, selectedNodeId, text) {
  return nodes.map(node =>
    node.id === selectedNodeId
      ? { ...node, data: { ...node.data, text } }
      : node
  );
}

//we need to prevent user from creating more than one source edge as per requirement
export function canAddEdge(edges, params) {
  return !edges.some(
    e => e.source === params.source && e.sourceHandle === params.sourceHandle
  );
}