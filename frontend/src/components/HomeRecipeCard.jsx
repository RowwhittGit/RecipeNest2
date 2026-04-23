const tagColors = {
  'Spicy': '#e74c3c',
  'Pulse': '#f5c518',
  'Surprise': '#9b59b6',
  'American': '#3498db',
  'Italian': '#27ae60',
  'Mexican': '#e67e22',
  'New': '#f5c518',
  'Popular': '#1e2d4a',
}

export default function HomeRecipeCard({ index, image, tag, title, time, servings }) {
  const tagBg = tagColors[tag] || '#f5c518'
  const tagTextColor = ['#1e2d4a', '#f5c518'].includes(tagBg) ? (tagBg === '#f5c518' ? '#1e2d4a' : 'white') : 'white'

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group">
      {/* Image area */}
      <div className="relative h-48 bg-[#f0eee4] overflow-hidden">
        {/* Index badge */}
        <span className="absolute top-3 left-3 z-10 w-6 h-6 rounded-md bg-white/90 text-[#1e2d4a] font-black text-xs flex items-center justify-center shadow-sm">
          {index}
        </span>

        {/* Tag badge */}
        <span
          className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: tagBg, color: tagTextColor }}
        >
          {tag}
        </span>

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#e0ddd0] flex items-center justify-center text-3xl">
              🍽️
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[#1e2d4a] font-black text-sm mb-3 leading-tight">{title}</h3>
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          {/* Time */}
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
            <span>{time}</span>
          </div>
          {/* Servings */}
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{servings}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
