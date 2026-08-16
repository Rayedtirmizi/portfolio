"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { getProjects, saveProject, deleteProject } from "@/lib/firestoreProjects";
import { Project } from "@/lib/data/projects";
import { getExperiences, saveExperience, deleteExperience, Experience } from "@/lib/firestoreExperience";
import { getContact, saveContact, ContactInfo } from "@/lib/firestoreContact";
import { getAbout, saveAbout, AboutInfo, getHero, saveHero, HeroInfo } from "@/lib/firestoreSite";
import { uploadProjectImage } from "@/lib/firestoreStorage";

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

const emptyExperience: Experience = { id: "", role: "", company: "", dates: "", bullets: [] };

export default function StudioPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [bulletsInput, setBulletsInput] = useState("");

  // Contact state
  const [contact, setContact] = useState<ContactInfo>({ email: "", linkedin: "", github: "" });
  const [contactSaving, setContactSaving] = useState(false);

  // About state
  const [about, setAbout] = useState<AboutInfo>({
    introLine: "", paragraph1: "", paragraph2: "", currently: [], quote: "", projectsShipped: "", internships: "",
  });
  const [currentlyInput, setCurrentlyInput] = useState("");
  const [aboutSaving, setAboutSaving] = useState(false);

  // Hero state
  const [hero, setHero] = useState<HeroInfo>({ name: "", roleLine1: "", roleLine2: "" });
  const [heroSaving, setHeroSaving] = useState(false);

  useEffect(() => {
    if (user) {
      getProjects().then(setProjects);
      getExperiences().then(setExperiences);
      getContact().then((data) => data && setContact(data));
      getAbout().then((data) => {
        if (data) {
          setAbout(data);
          setCurrentlyInput(data.currently.join("\n"));
        }
      });
      getHero().then((data) => data && setHero(data));
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

  // Project handlers
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

  // Experience handlers
  function startEditExp(exp: Experience) {
    setEditingExp(exp);
    setBulletsInput(exp.bullets.join("\n"));
  }

  function startNewExp() {
    setEditingExp({ ...emptyExperience });
    setBulletsInput("");
  }

  async function handleSaveExp(e: React.FormEvent) {
    e.preventDefault();
    if (!editingExp) return;
    const toSave: Experience = {
      ...editingExp,
      bullets: bulletsInput.split("\n").map((b) => b.trim()).filter(Boolean),
    };
    await saveExperience(toSave);
    setExperiences(await getExperiences());
    setEditingExp(null);
  }

  async function handleDeleteExp(id: string) {
    if (!confirm("Delete this experience?")) return;
    await deleteExperience(id);
    setExperiences(await getExperiences());
  }

  // Contact handler
  async function handleSaveContact(e: React.FormEvent) {
    e.preventDefault();
    setContactSaving(true);
    await saveContact(contact);
    setContactSaving(false);
  }

  // About handler
  async function handleSaveAbout(e: React.FormEvent) {
    e.preventDefault();
    setAboutSaving(true);
    const toSave: AboutInfo = {
      ...about,
      currently: currentlyInput.split("\n").map((c) => c.trim()).filter(Boolean),
    };
    await saveAbout(toSave);
    setAboutSaving(false);
  }

  // Hero handler
  async function handleSaveHero(e: React.FormEvent) {
    e.preventDefault();
    setHeroSaving(true);
    await saveHero(hero);
    setHeroSaving(false);
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

      {/* Projects Section */}
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

          <label className="block text-sm text-[var(--text-muted)]">Project Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files || !editing) return;
              const urls = await Promise.all(
                Array.from(files).map((file) => uploadProjectImage(file))
              );
              setEditing({ ...editing, images: [...editing.images, ...urls] });
            }}
            className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {editing?.images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
            ))}
          </div>

          <button type="submit" disabled={saving} className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">
            {saving ? "Saving..." : "Save Project"}
          </button>
        </form>
      )}

      {/* Experience Section */}
      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">Experience</h2>

        {!editingExp && (
          <>
            <button onClick={startNewExp} className="mb-6 bg-[var(--accent)] text-black px-5 py-2 rounded-lg font-medium">
              + New Experience
            </button>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center border border-[var(--text-primary)]/10 rounded-xl p-4">
                  <div>
                    <p className="font-medium">{exp.role}</p>
                    <p className="text-sm text-[var(--text-muted)]">{exp.company}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEditExp(exp)} className="text-sm text-[var(--accent)]">Edit</button>
                    <button onClick={() => handleDeleteExp(exp.id)} className="text-sm text-red-500">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {editingExp && (
          <form onSubmit={handleSaveExp} className="space-y-4">
            <button type="button" onClick={() => setEditingExp(null)} className="text-sm text-[var(--text-muted)] mb-4">← Back</button>

            <label className="block text-sm text-[var(--text-muted)]">ID (unique, no spaces)</label>
            <input required value={editingExp.id} onChange={(e) => setEditingExp({ ...editingExp, id: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

            <label className="block text-sm text-[var(--text-muted)]">Role</label>
            <input required value={editingExp.role} onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

            <label className="block text-sm text-[var(--text-muted)]">Company</label>
            <input required value={editingExp.company} onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

            <label className="block text-sm text-[var(--text-muted)]">Dates</label>
            <input required value={editingExp.dates} onChange={(e) => setEditingExp({ ...editingExp, dates: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

            <label className="block text-sm text-[var(--text-muted)]">Bullets (one per line)</label>
            <textarea value={bulletsInput} onChange={(e) => setBulletsInput(e.target.value)} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={5} />

            <button type="submit" className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">Save Experience</button>
          </form>
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">Contact Info</h2>
        <form onSubmit={handleSaveContact} className="space-y-4">
          <label className="block text-sm text-[var(--text-muted)]">Email</label>
          <input required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">LinkedIn URL</label>
          <input required value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">GitHub URL</label>
          <input required value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <button type="submit" disabled={contactSaving} className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">
            {contactSaving ? "Saving..." : "Save Contact Info"}
          </button>
        </form>
      </div>

      {/* About Section */}
      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">About Section</h2>
        <form onSubmit={handleSaveAbout} className="space-y-4">
          <label className="block text-sm text-[var(--text-muted)]">Intro Line</label>
          <textarea required value={about.introLine} onChange={(e) => setAbout({ ...about, introLine: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={2} />

          <label className="block text-sm text-[var(--text-muted)]">Paragraph 1</label>
          <textarea required value={about.paragraph1} onChange={(e) => setAbout({ ...about, paragraph1: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={3} />

          <label className="block text-sm text-[var(--text-muted)]">Paragraph 2</label>
          <textarea required value={about.paragraph2} onChange={(e) => setAbout({ ...about, paragraph2: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={3} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)]">Projects Shipped</label>
              <input value={about.projectsShipped} onChange={(e) => setAbout({ ...about, projectsShipped: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)]">Internships</label>
              <input value={about.internships} onChange={(e) => setAbout({ ...about, internships: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />
            </div>
          </div>

          <label className="block text-sm text-[var(--text-muted)]">Currently (one per line)</label>
          <textarea value={currentlyInput} onChange={(e) => setCurrentlyInput(e.target.value)} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" rows={3} />

          <label className="block text-sm text-[var(--text-muted)]">Quote</label>
          <input value={about.quote} onChange={(e) => setAbout({ ...about, quote: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <button type="submit" disabled={aboutSaving} className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">
            {aboutSaving ? "Saving..." : "Save About"}
          </button>
        </form>
      </div>

      {/* Hero Section */}
      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">Hero Section</h2>
        <form onSubmit={handleSaveHero} className="space-y-4">
          <label className="block text-sm text-[var(--text-muted)]">Name</label>
          <input required value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">Role Line 1</label>
          <input required value={hero.roleLine1} onChange={(e) => setHero({ ...hero, roleLine1: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <label className="block text-sm text-[var(--text-muted)]">Role Line 2</label>
          <input required value={hero.roleLine2} onChange={(e) => setHero({ ...hero, roleLine2: e.target.value })} className="w-full border border-[var(--text-primary)]/20 rounded-lg px-4 py-3" />

          <button type="submit" disabled={heroSaving} className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-medium">
            {heroSaving ? "Saving..." : "Save Hero"}
          </button>
        </form>
      </div>
    </div>
  );
}