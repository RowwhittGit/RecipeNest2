import { forwardRef } from 'react'

const GoogleButton = forwardRef(function GoogleButton(_, ref) {
  return (
    <div
      ref={ref}
      className="w-full flex justify-center"
    />
  )
})

export default GoogleButton
