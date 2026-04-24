import { FcGoogle } from 'react-icons/fc'

export default function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-[#1e2d4a] hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  )
}
