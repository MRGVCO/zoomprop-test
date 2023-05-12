export type Estimate = {
  [key: string]: number
}

export interface Listing {
  listingId: string
  agent: null | string
  city: string
  state: string
  streetAddress: string
  latitude: number
  longitude: number
  primaryImageUrl: string
  estimateHistory: Estimate
  estimatePrediction: Estimate
  zipcode: number
  beds: number
  baths: number
  yearBuilt: number
}
