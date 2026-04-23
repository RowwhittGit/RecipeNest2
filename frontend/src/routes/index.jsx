import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/Home'

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

      {/* ── Catch-all ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
