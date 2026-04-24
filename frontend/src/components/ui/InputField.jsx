import { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export default function InputField({ label, type = 'text', placeholder, icon: Icon, value, onChange, name }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-[#1e2d4a]">{label}</label>}
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-[#1e2d4a] transition-colors">
        {Icon && <Icon className="text-gray-400 text-lg flex-shrink-0" />}
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)} className="text-gray-400 hover:text-gray-600">
            {show ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
          </button>
        )}
      </div>
    </div>
  )
}
