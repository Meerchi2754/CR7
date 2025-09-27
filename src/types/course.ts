export interface Course {
  id: string;
  title: string;
  provider: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'expert';
  rating: number;
  duration: string;
  price: string;
  url: string;
  description: string;
  skills: string[];
}

export interface SearchFilters {
  topic: string;
  level: 'all' | 'beginner' | 'intermediate' | 'expert';
}