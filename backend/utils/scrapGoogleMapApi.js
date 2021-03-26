import fetch from 'node-fetch'
import fs from 'fs'

const API_KEY_GOOGLE_MAP = `AIzaSyCrKfxnTqkik3g4Ops_DNuNrsgzUgHWOCM`

const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=local+farm+detail+netherlands&key=${API_KEY_GOOGLE_MAP}`

async function getScraping() {
  try {
    const reponse = await fetch(url)
    const data = await reponse.json()
    // console.log(data.results)
    const FarmsDetails = data.results.map((farm) => {
      let name = farm.name
      let rating = farm.rating
      let address = farm.formatted_address
      let lat = farm.geometry.location.lat
      let lng = farm.geometry.location.lng
      return { name, rating, lat, lng, address }
    })
    return FarmsDetails
  } catch (error) {
    console.log('err', error)
  }
}
async function scraping() {
  const results = await getScraping()
  return results
}
const data = await scraping(url)

fs.appendFile('farmeDetails.js', JSON.stringify(data), function (err) {
  if (err) throw err
  console.log('Data Saved!')
})
