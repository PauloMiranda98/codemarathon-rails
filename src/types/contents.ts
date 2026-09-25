export interface Subject {
  name: string;
  slug: string;
  obi_frequency: number;
  icpc_frequency: number;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  subjects: Subject[];
}
