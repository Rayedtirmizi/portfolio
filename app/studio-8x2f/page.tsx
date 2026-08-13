"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { getProjects, saveProject, deleteProject } from "@/lib/firestoreProjects";
import { Project } from "@/lib/data/projects";

const emptyProject: Project = {
  slug: "",
  title: "",
  description: "",
  longDescription: "",
  tags: [],
  link: "",
  images: [],
  year: "",
  icon: "",
};

export default function StudioPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      getProjects().then(setProjects);
    }
  }, [user]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password");
    }
  }

  function startEdit(project: Project) {
    setEditing(project);
    setTagsInput(project.tags.join(", "));
  }

  function startNew() {
    setEditing({ ...emptyProject });
    setTagsInput("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const toSave: Project = {
      ...editing,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    await saveProject(toSave);
    const updated = await getProjects();
    setProjects(updated);
    setEditing(null);
    setSaving(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(slug);
    setProjects(await getProjects());
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-medium mb-6">Admin Login</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-medium">Log In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <button onClick={() => signOut(auth)} className="text-sm text-[var(--text-muted)] underline">Log Out</button>
      </div>

      {!editing && (
        <>
          <button onClick={startNew} className="mb-8 bg-[var(--accent)] text-black px-5 py-2 rounded-lg font-medium">
            + New Project
          </button>

          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.slug} className="flex justify-between items-center border border-[var(--text-primary)]/10 rounded-xl p-4">
                <div>
                  <p className="font-medium">{p.icon} {p.title}</p>
                  <p className="text-sm text-[var(--text-muted)]">{p.slug}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startEdit(p)} className="text-sm text-[var(--accent)]">Edit</button>
                  <button onClick={() => handleDelete(p.slug)} className="text-sm text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editing && (
        <form onSubmit={handleSave} className="space-y-4">
          <button type="button" onClick={() => setEditing(null)} className="text-sm text-[var(--text-muted)] mb-4">← Back</button>

          <label className="block text-sm text-[var(--text-muted)]">Slug (URL, no spaces, lowercase)</label>
          <input required value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">Title</label>
          <input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">Short Description (shown on homepage card)</label>
          <textarea required value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={2} />

          <label className="block text-sm text-[var(--text-muted)]">Long Description (shown on detail page)</label>
          <textarea required value={editing.longDescription} onChange={(e) => setEditing({ ...editing, longDescription: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={5} />

          <label className="block text-sm text-[var(--text-muted)]">Tags (comma-separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" placeholder="React, Firebase, AI" />

          <label className="block text-sm text-[var(--text-muted)]">Link (optional)</label>
          <input value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)]">Year</label>
              <input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)]">Icon (emoji)</label>
              <input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
            </div>
          </div>

          <button type="submit" disabled={saving} className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">
            {saving ? "Saving..." : "Save Project"}
          </button>
        </form>
      )}
    </div>
  );
}