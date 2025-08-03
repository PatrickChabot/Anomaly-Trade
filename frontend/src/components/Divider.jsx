function Divider({ text }) {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-1 border-gray-300" />
      <span className="px-3 text-gray-500 text-sm">{text}</span>
      <hr className="flex-1 border-gray-300" />
    </div>
  );
}

export default Divider;