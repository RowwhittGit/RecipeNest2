import { useState, useRef } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import tomato from '../images/tomato.png';
import lemon from '../images/lemon.png';
import redChilly from '../images/red_chilly.png';
import greenHerb from '../images/green_herb.png';

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <h2 className="text-lg font-black text-[#1e2d4a] mb-5 flex items-center gap-2">
      <span className="w-1 h-5 bg-[#f5c518] rounded-full inline-block" />
      {title}
    </h2>
  );
}

// ─── Form Input ────────────────────────────────────────────────────────────────
function FormInput({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[#1e2d4a]">
          {label}{required && ' *'}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors"
      />
    </div>
  );
}

// ─── CreateRecipe ──────────────────────────────────────────────────────────────
export default function CreateRecipePage() {
  const imageInputRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    cuisineType: '',
    difficulty: '',
    prepTime: '',
    cookTime: '',
    youtubeVideoUrl: '',
  });

  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFormChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // ── Ingredients ──────────────────────────────────────────────────────────
  const updateIngredient = (index, value) => {
    setIngredients(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addIngredient = () => {
    setIngredients(prev => [...prev, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length === 1) return;
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  // ── Steps ─────────────────────────────────────────────────────────────────
  const updateStep = (index, value) => {
    setSteps(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addStep = () => {
    setSteps(prev => [...prev, '']);
  };

  const removeStep = (index) => {
    if (steps.length === 1) return;
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  // ── Image ─────────────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col">
      <HomeNavbar />

      <main className="flex-1 py-10 px-4 relative overflow-hidden">
        {/* Decorative images */}
        <img src={tomato} alt="" className="hidden lg:block absolute top-6 left-4 w-20 opacity-60 pointer-events-none select-none" />
        <img src={lemon} alt="" className="hidden lg:block absolute top-10 right-6 w-16 opacity-60 pointer-events-none select-none -rotate-12" />
        <img src={redChilly} alt="" className="hidden lg:block absolute bottom-24 left-8 w-10 opacity-50 pointer-events-none select-none" />
        <img src={greenHerb} alt="" className="hidden lg:block absolute bottom-32 right-8 w-16 opacity-50 pointer-events-none select-none rotate-12" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Page heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#1e2d4a] flex items-center justify-center gap-2">
              <span className="text-2xl">🍳</span> Create New Recipe
            </h1>
            <p className="text-sm text-[#1e2d4a]/50 mt-1 font-medium">
              Share your culinary masterpiece with the recipeNest community
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#1e2d4a]/10 shadow-sm p-6 md:p-8 flex flex-col gap-8">

            {/* ── BASIC INFO ─────────────────────────────────────────────── */}
            <section>
              <SectionHeader title="Basic Information" />
              <div className="flex flex-col gap-4">
                <FormInput
                  label="Recipe Title"
                  required
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g., Homemade Ramen"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#1e2d4a]">Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Rich and hearty ramen from scratch..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Cuisine Type"
                    required
                    name="cuisineType"
                    value={form.cuisineType}
                    onChange={handleFormChange}
                    placeholder="e.g., Japanese, Italian, Mexican"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1e2d4a]">Difficulty *</label>
                    <select
                      name="difficulty"
                      value={form.difficulty}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] focus:outline-none focus:border-[#f5c518] bg-white transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Prep Time (minutes)"
                    required
                    name="prepTime"
                    type="number"
                    min="0"
                    value={form.prepTime}
                    onChange={handleFormChange}
                    placeholder="30"
                  />
                  <FormInput
                    label="Cook Time (minutes)"
                    required
                    name="cookTime"
                    type="number"
                    min="0"
                    value={form.cookTime}
                    onChange={handleFormChange}
                    placeholder="120"
                  />
                </div>
              </div>
            </section>

            {/* ── MEDIA ──────────────────────────────────────────────────── */}
            <section>
              <SectionHeader title="Media" />
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#1e2d4a] block mb-2">Recipe Image</label>
                  <div className="flex items-start gap-4">
                    {/* Upload box */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-20 h-20 rounded-xl border-2 border-dashed border-[#1e2d4a]/20 flex items-center justify-center hover:border-[#f5c518] hover:bg-[#f5c518]/5 transition-colors flex-shrink-0 overflow-hidden"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FiPlus className="w-6 h-6 text-[#1e2d4a]/40" />
                      )}
                    </button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-[#1e2d4a]/40 font-medium leading-relaxed pt-1">
                      Upload a main image for your recipe.<br />
                      Recommended size: 1200×800px
                    </p>
                  </div>
                </div>
                <FormInput
                  label="YouTube Video URL (optional)"
                  name="youtubeVideoUrl"
                  value={form.youtubeVideoUrl}
                  onChange={handleFormChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </section>

            {/* ── INGREDIENTS ────────────────────────────────────────────── */}
            <section>
              <SectionHeader title="Ingredients" />
              <div className="flex flex-col gap-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1e2d4a] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder="e.g., Pork belly 500g"
                      className="flex-1 px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#1e2d4a]/30 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#1e2d4a]/60 hover:text-[#1e2d4a] transition-colors mt-1 w-fit"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Ingredient
                </button>
              </div>
            </section>

            {/* ── INSTRUCTIONS ───────────────────────────────────────────── */}
            <section>
              <SectionHeader title="Instructions" />
              <div className="flex flex-col gap-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1e2d4a] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2.5">
                      {index + 1}
                    </span>
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder={`e.g., ${index === 0 ? 'Boil the broth for 2 hours.' : 'Cook noodles separately.'}`}
                      rows={2}
                      className="flex-1 px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors resize-none"
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#1e2d4a]/30 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0 mt-2"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#1e2d4a]/60 hover:text-[#1e2d4a] transition-colors mt-1 w-fit"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Step
                </button>
              </div>
            </section>

            {/* ── SUBMIT BUTTONS ─────────────────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1e2d4a]/8">
              <button
                type="button"
                className="px-6 py-2.5 rounded-full border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-sm hover:bg-[#1e2d4a]/5 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="px-6 py-2.5 rounded-full bg-[#f5c518] text-[#1e2d4a] font-black text-sm hover:opacity-90 transition-opacity shadow-sm"
              >
                Publish Recipe
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
