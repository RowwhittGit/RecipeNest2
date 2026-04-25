import { FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ChefCard({ image, name, specialty, experience, rating }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-md overflow-hidden border-[3px] border-[#2b3d63] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-2.5">
      <div className="relative h-60 w-full bg-[#f4f4f4] overflow-hidden">
        <img src={image} className="w-full h-full object-cover" alt={name} />
        
        {/* Rating Pill */}
        <div className="absolute top-2 right-2 z-10 bg-[#fdd228] border-2 border-[#2b3d63] px-2.5 py-1 rounded-full font-black text-[#2b3d63] flex items-center gap-1 text-[11px] shadow-sm tracking-wide">
          <FiStar className="w-3 h-3" fill="currentColor" />
          {rating}
        </div>
      </div>

      <div className="pt-5 pb-1 px-1 flex-1 flex flex-col bg-white text-left">
        <h3 className="text-[#2b3d63] font-bold text-[1.05rem] mb-1">{name}</h3>
        <p className="text-[#2b3d63]/60 italic text-sm mb-2 font-medium">{specialty}</p>
        <p className="text-[#2b3d63]/70 text-xs font-bold mb-5 tracking-wide">{experience}+ years exp.</p>

        <button
          onClick={() => navigate('/chef/1')}
          className="w-full py-2.5 mt-auto bg-[#2b3d63] hover:bg-[#1f2d4a] text-white rounded-full font-bold transition-all shadow-md text-sm"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
