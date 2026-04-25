import { useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import DynamicList from './DynamicList';
import { uploadImageApi, createRecipeApi } from '../api/recipeApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// ─── Helpers ───────────────────────────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <h2 className="text-lg font-black text-[#1e2d4a] mb-5 flex items-center gap-2">
      <span className="w-1 h-5 bg-[#f5c518] rounded-full inline-block" />
      {title}
    </h2>
  );
}

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

// ─── Normalise initialData ─────────────────────────────────────────────────────
// Backend stores ingredients as [{ order, ingredient }] and steps as [{ order, instruction }]
// The form works with plain string arrays — normalise on the way in.
function normaliseIngredients(raw = []) {
  if (!raw.length) return [''];
  if (typeof raw[0] === 'string') return raw;
  return [...raw].sort((a, b) => a.order - b.order).map(i => i.ingredient);
}

function normaliseSteps(raw = []) {
  if (!raw.length) return [''];
  if (typeof raw[0] === 'string') return raw;
  return [...raw].sort((a, b) => a.order - b.order).map(s => s.instruction);
}

// ─── RecipeForm ────────────────────────────────────────────────────────────────
export default function RecipeForm({ initialData = null, submitLabel = 'Publish Recipe', onCancel }) {
  const imageInputRef = useRef(null);
  const imageFileRef  = useRef(null); // stores the raw File for upload
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title:           initialData?.title           || '',
    description:     initialData?.description     || '',
    cuisineType:     initialData?.cuisineType      || '',
    difficulty:      initialData?.difficulty       || '',
    prepTime:        initialData?.prepTime         ?? '',
    cookTime:        initialData?.cookTime         ?? '',
    youtubeVideoUrl: initialData?.youtubeVideoUrl  || '',
  });

  const [ingredients, setIngredients] = useState(() => normaliseIngredients(initialData?.ingredients));
  const [steps,       setSteps]       = useState(() => normaliseSteps(initialData?.steps));
  const [imagePreview, setImagePreview] = useState(initialData?.mainImage || null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    imageFileRef.current = file;
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (status) => {
    // ── Validation ──────────────────────────────────────────────────────────
    if (!form.title.trim()) { toast.error('Recipe title is required'); return; }
    if (!form.cuisineType.trim()) { toast.error('Cuisine type is required'); return; }
    if (!form.difficulty) { toast.error('Difficulty is required'); return; }
    const filledIngredients = ingredients.filter(i => i.trim());
    const filledSteps = steps.filter(s => s.trim());
    if (!filledIngredients.length) { toast.error('Add at least one ingredient'); return; }
    if (!filledSteps.length) { toast.error('Add at least one step'); return; }

    setSubmitting(true);
    try {
      // ── Step 1: upload image if selected ──────────────────────────────────
      let mainImage = '';
      if (imageFileRef.current) {
        const uploadRes = await uploadImageApi(imageFileRef.current);
        mainImage = uploadRes.data.data.url;
      }

      // ── Step 2: build payload ─────────────────────────────────────────────
      const payload = {
        title:           form.title.trim(),
        description:     form.description.trim(),
        cuisineType:     form.cuisineType.trim(),
        difficulty:      form.difficulty,
        prepTime:        Number(form.prepTime) || 0,
        cookTime:        Number(form.cookTime) || 0,
        youtubeVideoUrl: form.youtubeVideoUrl.trim(),
        mainImage,
        status,
        ingredients: filledIngredients.map((ingredient, i) => ({ order: i + 1, ingredient })),
        steps:       filledSteps.map((instruction, i) => ({ order: i + 1, instruction })),
      };

      // ── Step 3: create recipe ─────────────────────────────────────────────
      const res = await createRecipeApi(payload);
      toast.success(status === 'published' ? 'Recipe published!' : 'Saved as draft!');
      navigate(`/recipes/${res.data.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#1e2d4a]/10 shadow-sm p-6 md:p-8 flex flex-col gap-8">

      {/* ── BASIC INFO ───────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Basic Information" />
        <div className="flex flex-col gap-4">
          <FormInput
            label="Recipe Title" required
            name="title" value={form.title} onChange={handleChange}
            placeholder="e.g., Homemade Ramen"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1e2d4a]">Description *</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              placeholder="Rich and hearty ramen from scratch..."
              rows={3}
              className="w-full px-4 py-2.5 border border-[#1e2d4a]/15 rounded-lg text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/35 focus:outline-none focus:border-[#f5c518] bg-white transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Cuisine Type" required
              name="cuisineType" value={form.cuisineType} onChange={handleChange}
              placeholder="e.g., Japanese, Italian, Mexican"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1e2d4a]">Difficulty *</label>
              <select
                name="difficulty" value={form.difficulty} onChange={handleChange}
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
              label="Prep Time (minutes)" required type="number" min="0"
              name="prepTime" value={form.prepTime} onChange={handleChange}
              placeholder="30"
            />
            <FormInput
              label="Cook Time (minutes)" required type="number" min="0"
              name="cookTime" value={form.cookTime} onChange={handleChange}
              placeholder="120"
            />
          </div>
        </div>
      </section>

      {/* ── MEDIA ────────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Media" />
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#1e2d4a] block mb-2">Recipe Image</label>
            <div className="flex items-start gap-4">
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
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <p className="text-xs text-[#1e2d4a]/40 font-medium leading-relaxed pt-1">
                Upload a main image for your recipe.<br />
                Recommended size: 1200×800px
              </p>
            </div>
          </div>
          <FormInput
            label="YouTube Video URL (optional)"
            name="youtubeVideoUrl" value={form.youtubeVideoUrl} onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      </section>

      {/* ── INGREDIENTS ──────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Ingredients" />
        <DynamicList items={ingredients} setItems={setIngredients} label="Ingredient" />
      </section>

      {/* ── INSTRUCTIONS ─────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Instructions" />
        <DynamicList items={steps} setItems={setSteps} label="Step" isTextarea />
      </section>

      {/* ── ACTIONS ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1e2d4a]/8">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-6 py-2.5 rounded-full border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-sm hover:bg-[#1e2d4a]/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={submitting}
          className="px-6 py-2.5 rounded-full border-2 border-[#1e2d4a]/20 text-[#1e2d4a] font-bold text-sm hover:bg-[#1e2d4a]/5 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('published')}
          disabled={submitting}
          className="px-6 py-2.5 rounded-full bg-[#f5c518] text-[#1e2d4a] font-black text-sm hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Publishing...' : submitLabel}
        </button>
      </div>

    </div>
  );
}
