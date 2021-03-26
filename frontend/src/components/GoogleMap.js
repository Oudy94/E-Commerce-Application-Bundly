import React, { useState } from 'react'
import LocationMarker from './LocationMarker'
import GoogleMapReact from 'google-map-react'
import LocationInfoBox from './LocationInfoBox'

const GoogleMap = ({ data, center, zoom }) => {
  const [info, setInfo] = useState(null)
  const markers = data.map((farm) => (
    <LocationMarker
      lat={farm.lat}
      lng={farm.lng}
      onClick={() =>
        setInfo({
          name: farm.name,
          address: farm.address,
          rating: farm.rating
        })
      }
    />
  ))
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {info && <LocationInfoBox info={info} />}
    </div>
  )
}

GoogleMap.defaultProps = {
  center: { lat: 52.36356732300538, lng: 4.913503522065644 },
  zoom: 8
}

export default GoogleMap
