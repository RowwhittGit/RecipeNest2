import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function DynamicList({ items, setItems, label, isTextarea = false }) {
  const update = (index, value) =>
    setItems(prev => prev.map((item, i) => (i === index ? value : item)));

  const add = () => setItems(prev => [...prev, '']);

  const remove = (index) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const inputClass =
    'flex-1 px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors';

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className={`flex gap-2 ${isTextarea ? 'items-start' : 'items-center'}`}>
          <span className={`w-7 h-7 rounded-full bg-[#1e2d4a] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 ${isTextarea ? 'mt-2.5' : ''}`}>
            {index + 1}
          </span>
          {isTextarea ? (
            <textarea
              value={item}
              onChange={(e) => update(index, e.target.value)}
              placeholder={`e.g., ${index === 0 ? 'Boil the broth for 2 hours.' : 'Cook noodles separately.'}`}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          ) : (
            <input
              type="text"
              value={item}
              onChange={(e) => update(index, e.target.value)}
              placeholder={`e.g., Pork belly 500g`}
              className={inputClass}
            />
          )}
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[#1e2d4a]/30 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0 ${isTextarea ? 'mt-2' : ''}`}
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-sm font-bold text-[#1e2d4a]/60 hover:text-[#1e2d4a] transition-colors mt-1 w-fit"
      >
        <FiPlus className="w-4 h-4" />
        Add {label}
      </button>
    </div>
  );
}
