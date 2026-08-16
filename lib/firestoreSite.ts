import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface AboutInfo {
  introLine: string;
  paragraph1: string;
  paragraph2: string;
  currently: string[];
  quote: string;
  projectsShipped: string;
  internships: string;
}

export interface HeroInfo {
  name: string;
  roleLine1: string;
  roleLine2: string;
}

const aboutRef = doc(db, "site", "about");
const heroRef = doc(db, "site", "hero");

export async function getAbout(): Promise<AboutInfo | null> {
  const snap = await getDoc(aboutRef);
  return snap.exists() ? (snap.data() as AboutInfo) : null;
}

export async function saveAbout(data: AboutInfo): Promise<void> {
  await setDoc(aboutRef, data);
}

export async function getHero(): Promise<HeroInfo | null> {
  const snap = await getDoc(heroRef);
  return snap.exists() ? (snap.data() as HeroInfo) : null;
}

export async function saveHero(data: HeroInfo): Promise<void> {
  await setDoc(heroRef, data);
}