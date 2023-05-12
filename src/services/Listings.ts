import { Listing } from '@/types/listing'
import axios from 'axios'

export const getListings = () => {
  return axios
    .get('https://642babccd7081590f926e18c.mockapi.io/api/v1/listings')
    .then(({ data }: { data: Listing[] }) => {
      return data
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export const getListingInfo = (listingId: string) => {
  return axios
    .get(
      `https://642babccd7081590f926e18c.mockapi.io/api/v1/listings?listingId=${listingId}`,
    )
    .then(({ data }: { data: Listing[] }) => {
      return data[0]
    })
    .catch((error) => {
      console.log(error.response)
    })
}
