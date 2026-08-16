import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

const experienceCol = collection(db, "experience");

export async function getExperiences(): Promise<Experience[]> {
  const snapshot = await getDocs(experienceCol);
  return snapshot.docs.map((d) => d.data() as Experience);
}

export async function saveExperience(exp: Experience): Promise<void> {
  const ref = doc(db, "experience", exp.id);
  await setDoc(ref, exp);
}

export async function deleteExperience(id: string): Promise<void> {
  await deleteDoc(doc(db, "experience", id));
}