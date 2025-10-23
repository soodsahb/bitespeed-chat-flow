import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

export default function NodesPanel() {
  return (
    <div style={{
      position: 'absolute',
      right: 0,
      width: 240,
      height: '100%',
      background: '#fff',
      padding: 18,
      borderLeft: '1px solid #ddd',
      zIndex: 10
    }}>
      <div
        style={{
          padding: '24px 0',
          background: '#fff',
          border: '1.5px solid #90caf9',
          borderRadius: 14,
          cursor: 'grab',
          marginBottom: 16,
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}
        draggable
        onDragStart={e => {
          e.dataTransfer.setData('application/reactflow', 'textNode');
          e.dataTransfer.effectAllowed = 'move';
        }}
      >
        <FaRegCommentDots size={12} style={{ color: '#1e6ca9', marginBottom: 10 }} />
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: '#282828',
            marginTop: 0
          }}
        >
          Message
        </div>
      </div>
    </div>
  );
}
