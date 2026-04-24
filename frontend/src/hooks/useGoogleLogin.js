import { useEffect, useRef } from 'react'

const CLIENT_ID = '858750478654-np915s1eoqe6gk0hnibjv2p40oj3sr0b.apps.googleusercontent.com'
let initialized = false

export default function useGoogleLogin(onToken) {
  const buttonRef = useRef(null)

  useEffect(() => {
    function initGoogle() {
      if (!buttonRef.current) return
      if (!initialized) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res) => onToken(res.credential),
        })
        initialized = true
      }
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: buttonRef.current.offsetWidth || 400,
      })
    }

    if (window.google) {
      initGoogle()
      return
    }

    const existing = document.getElementById('gsi-script')
    if (existing) {
      existing.addEventListener('load', initGoogle)
      return
    }

    const script = document.createElement('script')
    script.id = 'gsi-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = initGoogle
    document.body.appendChild(script)
  }, [])

  return buttonRef
}
