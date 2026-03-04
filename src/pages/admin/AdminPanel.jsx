import { useState, useEffect, useRef } from 'react'
import { getProjects, insertProject, deleteProject, uploadProjectImage } from '../../lib/supabase'
import { useNotify } from '../../App'

const CAT_COLORS = {
  education:      '#2a4a37',
  health:         '#5c4a32',
  livelihoods:    '#2a3e5c',
  infrastructure: '#4a3a2a',
}

const EMPTY_FORM = {
  title: '', category: 'education', year: new Date().getFullYear(), description: '', location: '',
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : '' }

export default function AdminPanel({ email, onLogout }) {
  const notify = useNotify()
  const fileRef = useRef()

  const [projects, setProjects] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [saving, setSaving]     = useState(false)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [imgFile, setImgFile]   = useState(null)
  const [imgPreview, setImgPreview] = useState(null)

  useEffect(() => { loadProjects() }, [])

  async function loadProjects() {
    setLoadingList(true)
    try { setProjects(await getProjects()) }
    catch { notify('Could not load projects.', 'error') }
    finally { setLoadingList(false) }
  }

  function handleField(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleImgChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImgFile(file)
    const reader = new FileReader()
    reader.onload = ev => setImgPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      notify('Title and description are required.', 'error'); return
    }
    setSaving(true)
    try {
      let image_url = null
      if (imgFile) {
        try { image_url = await uploadProjectImage(imgFile) }
        catch (err) { notify('Image upload failed — project saved without image.', 'error') }
      }

      const colors = Object.values(CAT_COLORS)
      await insertProject({
        title:       form.title.trim(),
        category:    form.category,
        year:        parseInt(form.year),
        description: form.description.trim(),
        location:    form.location.trim() || null,
        image_url,
        color: colors[Math.floor(Math.random() * colors.length)],
      })

      setForm(EMPTY_FORM)
      setImgFile(null)
      setImgPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      notify('✓ Project added and live on the site!')
      loadProjects()
    } catch (err) {
      notify('Failed to save: ' + err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      await deleteProject(id)
      notify('Project removed.')
      loadProjects()
    } catch (err) {
      notify('Delete failed: ' + err.message, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-canvas pt-[140px] px-[60px] pb-20">
      {/* Header */}
      <div className="flex justify-between items-start mb-16 pb-7 border-b border-[rgba(28,28,26,0.1)]">
        <div>
          <div className="font-serif text-[2.6rem] font-light text-charcoal leading-tight">Content Manager</div>
          <div className="text-[0.85rem] text-muted mt-1.5">Signed in as {email}</div>
        </div>
        <button className="btn-outline" onClick={onLogout}>Sign Out</button>
      </div>

      <div className="grid grid-cols-[1fr_1.4fr] gap-10 items-start">

        {/* ── Add Form ── */}
        <div className="bg-cream rounded-md p-9">
          <div className="font-serif text-[1.6rem] font-semibold text-charcoal mb-7">Add New Project</div>

          <form onSubmit={handleAdd} noValidate>
            <label className="field-label !mt-0">Title *</label>
            <input className="field-input" name="title" value={form.title} onChange={handleField} placeholder="e.g. Solar Panels in Kisumu" />

            <label className="field-label">Category *</label>
            <select className="field-input cursor-pointer" name="category" value={form.category} onChange={handleField}>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="livelihoods">Livelihoods</option>
              <option value="infrastructure">Infrastructure</option>
            </select>

            <label className="field-label">Year *</label>
            <input className="field-input" name="year" type="number" value={form.year} onChange={handleField} />

            <label className="field-label">Description *</label>
            <textarea
              className="field-input resize-y min-h-[100px]"
              name="description"
              value={form.description}
              onChange={handleField}
              placeholder="Brief summary of the project and its impact…"
            />

            <label className="field-label">Location</label>
            <input className="field-input" name="location" value={form.location} onChange={handleField} placeholder="e.g. Lagos, Nigeria" />

            <label className="field-label">Project Image</label>
            <label
              className="block border-2 border-dashed border-[rgba(28,28,26,0.15)] rounded-sm
                         p-5 text-center cursor-pointer text-muted text-[0.85rem]
                         transition-colors duration-200 hover:border-green hover:text-green"
            >
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
              {imgFile ? `✓ ${imgFile.name}` : '📷 Click to upload an image'}
            </label>
            {imgPreview && (
              <img src={imgPreview} alt="Preview" className="w-full h-[100px] object-cover rounded-sm mt-2.5" />
            )}

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full justify-center mt-6 py-4"
            >
              {saving && <span className="spinner" />}
              {saving ? 'Saving…' : 'Add to Our Work'}
            </button>
          </form>
        </div>

        {/* ── Projects List ── */}
        <div className="bg-cream rounded-md p-9">
          <div className="font-serif text-[1.6rem] font-semibold text-charcoal mb-7">
            All Projects
            <span className="ml-3 text-[1rem] font-sans text-muted font-normal">({projects.length})</span>
          </div>

          {loadingList ? (
            <div className="text-center py-10 text-muted text-[0.9rem]">
              <span className="spinner spinner-dark" /> Loading…
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-muted text-[0.9rem]">
              No projects yet. Add your first one →
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {projects.map(p => (
                <div key={p.id} className="admin-row">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Color swatch */}
                    <div
                      className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-white/40 text-xs"
                      style={{ background: p.color || CAT_COLORS[p.category] || '#2a4a37' }}
                    >✦</div>
                    <div className="min-w-0">
                      <div className="font-medium text-[0.92rem] text-charcoal truncate">{p.title}</div>
                      <div className="text-[0.74rem] text-muted mt-0.5">
                        {capitalize(p.category)} · {p.year}{p.location ? ` · ${p.location}` : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-shrink-0 text-[0.72rem] tracking-[0.08em] uppercase px-3.5 py-1.5
                               border border-red-400 text-red-500 rounded-sm cursor-pointer
                               transition-all duration-200 hover:bg-red-500 hover:text-white font-sans"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
