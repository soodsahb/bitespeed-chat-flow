
export default function SettingsPanel({ node, onChange }) {
  if (!node) return null;
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 320,
        height: '100%',
        background: '#fafafa',
        borderLeft: '1px solid #ddd',
        padding: 24,
        zIndex: 100 
      }}
      onMouseDown={(e) => e.stopPropagation()} // Prevent deselection on click
    >
      <h3>Message</h3>
      <div>
        <label>Text:</label>
        <textarea
          value={node.data.text}
          onChange={e => onChange(e.target.value)}
          rows={4}
          style={{ width: '100%', marginTop: 8 }}
        />
      </div>
    </div>
  );
}
