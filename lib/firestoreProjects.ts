import { db } from "@/lib/firebase";
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Project } from "@/lib/data/projects";

const projectsCol = collection(db, "projects");

export async function getProjects(): Promise<Project[]> {
  const snapshot = await getDocs(projectsCol);
  return snapshot.docs.map((d) => d.data() as Project);
}

export async function getProject(slug: string): Promise<Project | null> {
  const ref = doc(db, "projects", slug);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Project) : null;
}

export async function saveProject(project: Project): Promise<void> {
  const ref = doc(db, "projects", project.slug);
  await setDoc(ref, project);
}

export async function deleteProject(slug: string): Promise<void> {
  await deleteDoc(doc(db, "projects", slug));
}