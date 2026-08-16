import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

const contactRef = doc(db, "site", "contact");

export async function getContact(): Promise<ContactInfo | null> {
  const snap = await getDoc(contactRef);
  return snap.exists() ? (snap.data() as ContactInfo) : null;
}

export async function saveContact(data: ContactInfo): Promise<void> {
  await setDoc(contactRef, data);
}