import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import VerifyNoticePage from '../pages/VerifyNotice'
import VerifyEmailPage from '../pages/VerifyEmail'
import ForgotPasswordPage from '../pages/ForgotPassword'
import ResetPasswordPage from '../pages/ResetPassword'
import ChefsPage from '../pages/ChefsPage'
import RecipeDetail from '../pages/RecipeDetail'
import CreateRecipePage from '../pages/CreateRecipe'

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
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/recipes/create" element={<CreateRecipePage />} />
      <Route path="/chefs" element={<ChefsPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-notice" element={<VerifyNoticePage />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* ── Catch-all ──────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
