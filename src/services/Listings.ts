import axios from 'axios';

export interface Listing {
  listingId: string;
  listPrice?: number;
  customTags?: string[];
  estimateHistory?: Record<string, number>;
  beds?: number;
  baths?: number;
  primaryImageUrl?: string;
  annualRevenue?: number;
  daysListed?: number;
  agent?: string;
  city?: string;
  state?: string;
  rentEstimate?: number;
  yearBuilt?: number;
}

export const getAllListings = async (): Promise<Listing[] | null> => {
  try {
    const result = await axios.get(process.env.LISTINGS_API_URL ?? '');
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
