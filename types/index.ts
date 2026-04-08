export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  duration: string;
  category: string | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GameFormData {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  duration: string;
  category: string;
  available: boolean;
}
