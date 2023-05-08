import axios from 'axios'

export const getListing = (id: any) => {
  // ?listingId=2937526470
  return axios
    .get(
      `https://642babccd7081590f926e18c.mockapi.io/api/v1/listings?listingId=${id}`,
    )
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.response)
    })
}
