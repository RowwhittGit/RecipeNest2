export default function RecipeCard({ image, tag, tagColor, title, time, servings, rating, placeholder }) {
  return (
    <div className="bg-[#f0eee4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image area */}
      <div className="relative h-52 flex items-center justify-center">
        {/* Tag */}
        <span
          className="absolute top-4 right-4 z-10 rounded-full px-4 py-1.5 text-[#1e2d4a] font-bold text-sm"
          style={{ backgroundColor: tagColor || '#f5c518' }}
        >
          {tag}
        </span>

        {image ? (
          <img src={image} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="flex items-center justify-center w-40 h-40 text-6xl">
            {placeholder}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-white p-5">
        <h3 className="text-[#1e2d4a] font-black text-base mb-3">{title}</h3>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#f5c518]" fill="#f5c518" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-[#1e2d4a] font-bold">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}