import { FiAward, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function FeaturedChefCard({ image, name, specialty, experience, rating, bio }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-md shadow-xl overflow-hidden border-[4px] border-[#fdd228] mb-12 flex flex-col md:flex-row min-h-[460px]">
      {/* Image half */}
      <div className="relative md:w-[45%] overflow-hidden bg-[#f4f4f4]">
        <img src={image} className="w-full h-full object-cover absolute inset-0" alt={name} />
        {/* Top-left pill */}
        <div className="absolute top-5 left-5 z-10 bg-[#fdd228] border-[2.5px] border-[#2b3d63] px-4 py-1.5 rounded-full font-black text-[#2b3d63] flex items-center justify-center gap-1.5 shadow-sm text-xs tracking-wide">
          <FiAward className="w-4 h-4 text-[#2b3d63]" />
          Featured Chef
        </div>
      </div>

      {/* Info half */}
      <div className="md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-white">
        <h2 className="text-3xl font-black text-[#2b3d63] mb-2">{name}</h2>
        <p className="text-base text-[#2b3d63]/70 italic mb-5 font-medium">{specialty}</p>

        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-1.5 text-[#2b3d63] font-bold">
            <FiStar className="w-4 h-4 text-[#fdd228]" fill="#fdd228" />
            <span>{rating} Rating</span>
          </div>
          <div className="text-[#2b3d63] font-bold text-xs">{experience}+ years experience</div>
        </div>

        <p className="text-sm text-[#2b3d63]/80 mb-8 leading-loose font-medium max-w-lg">
          {bio}
        </p>

        <button
          onClick={() => navigate('/chef/1')}
          className="px-8 py-2.5 bg-[#2b3d63] hover:bg-[#1f2d4a] text-white rounded-full font-bold transition-all shadow-md w-fit text-sm"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
