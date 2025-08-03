// ButtonComponent.jsx
function ButtonComponent({ labelText, onClick }) {
  return (
    <div className="shadow-sm border border-gray-300">
      <button onClick={onClick}>{labelText}</button>
    </div>
  );
}
export default ButtonComponent