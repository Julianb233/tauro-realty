export interface SoldListing {
  address: string;
  price: number;
  soldDate: string;
  neighborhood: string;
}

export interface Agent {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  shortBio: string;
  specialties: string[];
  neighborhoods: string[];
  stats: {
    propertiesSold: number;
    totalVolume: string;
    avgDaysOnMarket: number;
    yearsExperience: number;
  };
  awards: {
    title: string;
    year: number;
    issuer: string;
  }[];
  videoIntroUrl: string | null;
  videoIntroId: string | null;
  activeListingIds: string[];
  soldListingIds: string[];
  soldListings: SoldListing[];
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  certifications: {
    code: string;
    fullName: string;
  }[];
  languages: string[];
  licenseNumber: string;
  testimonials?: {
    quote: string;
    clientName: string;
    rating: number;
    date: string;
  }[];
}

export const agents: Agent[] = [
  // 2026-05-18 (AI-10116): Tony Goodman authorized removal of the entire active roster
  // during the LYL Realty content handoff call. Wait for a fresh, vetted roster from
  // Noah + Dayhna (email: julian@aiacrobatics.com) with the 12 required fields per agent
  // before re-populating: name, title, headshot, phone, email, bio, specialties,
  // neighborhoods, awards, designations, social links, preferred display order.

];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
