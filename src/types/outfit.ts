export type OutfitItemType = 'top' | 'bottom' | 'outerwear' | 'dress' | 'shoes' | 'accessory';

export type SeasonType = 'spring' | 'summer' | 'fall' | 'winter';

export type OccasionType = 'casual' | 'formal' | 'business' | 'sport' | 'funeral' | 'wedding' | 'party' | 'beach' | 'hiking' | 'concert' | 'date' | 'interview';

export interface OutfitItem {
  id: string;
  name: string;
  type: OutfitItemType;
  color: string;
  season: SeasonType[];
  occasion: OccasionType[];
  gender?: 'male' | 'female' | 'unisex';
  imageUrl?: string;
}

export interface Outfit {
  id: string;
  items: OutfitItem[];
  occasion: OccasionType;
  season: SeasonType;
  notes?: string;
}

export interface UserPreferences {
  style?: string[];
  colors?: string[];
  occasions?: OccasionType[];
  weatherPreferences?: {
    coldThreshold: number;
    hotThreshold: number;
  };
  lastMessage?: string;
  gender?: 'male' | 'female' | null;
}

export interface OutfitRecommendation {
  outfit: Outfit;
  weatherContext: {
    temperature: number;
    description: string;
  };
  reasoning: string;
}

export interface WeatherData {
  date?: Date;
  temperature: number;
  description: string;
  humidity?: number;
  windSpeed?: number;
  icon?: string;
  city?: string;
  country?: string;
  season?: string;
  timeOfDay?: string;
} 