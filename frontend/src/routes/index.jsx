import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import VerifyNoticePage from '../pages/VerifyNotice'
import VerifyEmailPage from '../pages/VerifyEmail'

/**
 * AppRoutes
 * ---------
 * Single source of truth for all application routes.
 * Add new routes here — keep App.jsx clean.
 *
 * Route structure:
 *   /          → LandingPage  (public)
 *   /home      → HomePage     (authenticated)
 *   *          → redirect to /
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public ─────────────────────────────────── */}
      <Route path="/" element={<LandingPage />} />

      {/* ── Authenticated ──────────────────────────── */}
      <Route path="/home" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-notice" element={<VerifyNoticePage />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

      {/* ── Catch-all ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
