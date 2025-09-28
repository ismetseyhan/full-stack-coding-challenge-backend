export interface Airport {
  id: number;
  name: string;
  iata: string;
  city: string;
  country: string;
  longitude: number | null;
  latitude: number | null;
}

export interface AirportSearchResult {
  airports: Airport[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
}
