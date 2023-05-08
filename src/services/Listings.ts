import axios from 'axios'

export const getListings = () => {
  return axios
    .get(`https://642babccd7081590f926e18c.mockapi.io/api/v1/listings`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.response)
    })
}
