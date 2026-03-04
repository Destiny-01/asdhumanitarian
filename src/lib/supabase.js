import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[Lumina] Missing Supabase credentials.\n' +
    'Copy .env.example → .env.local and fill in your values.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/* ── Project helpers ── */

export async function getProjects(category = null) {
  let query = supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function insertProject(project) {
  const { data, error } = await supabase.from('projects').insert([project]).select()
  if (error) throw error
  return data[0]
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

/* ── Image upload helper ── */

export async function uploadProjectImage(file) {
  const ext  = file.name.split('.').pop()
  const path = `projects/${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(path, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

/* ── Auth helpers ── */

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
