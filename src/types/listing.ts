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
  listPrice: number
  livingArea: number
  yoy1: number
  yoy3: number
  yoy5: number
  yoy10: number
  months1: number
  months3: number
  months6: number
  nextMonths1: number
  nextMonths3: number
  nextMonths6: number
}
