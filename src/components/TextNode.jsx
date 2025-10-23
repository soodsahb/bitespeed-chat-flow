import { Handle, Position } from '@xyflow/react';
import { FaRegCommentDots, FaWhatsapp } from 'react-icons/fa';

export default function TextNode({ data }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #c7f2ef',
        borderRadius: 15,
        minWidth: 240,
        minHeight: 70,
        boxShadow: '0 4px 16px 0 rgba(20, 60, 110, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#b2f1e7',
          padding: '8px 18px',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          fontWeight: 600,
          fontSize: 18,
          borderBottom: '1px solid #aee6e6'
        }}
      >
        <FaRegCommentDots size={18} style={{ marginRight: 9, color: '#08808d' }} />
        <span style={{ flexGrow: 1, color: '#08808d' }}>Send Message</span>
        <FaWhatsapp size={19} style={{ marginLeft: 9, color: '#24e366' }} />
      </div>
      {/* Message */}
      <div
        style={{
          padding: '16px 18px 16px 18px',
          fontSize: 17,
          whiteSpace: 'pre-line',
          color: '#222'
        }}
      >
        {data.text}
      </div>
      {/* Handles */}
      {/* handles are being used for source and target handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#24e366', width: 10, height: 10, borderRadius: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ background: '#08808d', width: 10, height: 10, borderRadius: '50%' }}
      />
    </div>
  );
}
