import ReactMapGL,{Marker,Popup} from "react-map-gl";
import {useState } from "react";
import getCenter from "geolib/es/getCenter";

const  Map = ({searchResults}) => {

    const [selectedLocation,  setSelectedLocation] = useState({});

  // transform the search results object
  const coordinates = searchResults.map((result) => ({
    longitude: result.longitude,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useSate({
      width:"100%",
      height:"100%",
      latitude:37.7577,
      longitude: -122.4376,
      zoom:11
  });
  console.log(center);

  return (
    <ReactMapGL
      mapStyle=""
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
              <p 
                 role='img'
                 onClick={() => setSelectedLocation(result)} 
                 className='cursor-pointer text-2xl animate-bounce'
                 aria-label='push-pin'
                 >

              </p>
          </Marker>

         {selectedLocation.long === result.long ? (
            <Popup
               onClose={() => setSelectedLocation({})}
               closeOnClick={true}
               latitude={result.lat}
               longitude={result.long}
              >
               {result.title}
            </Popup>
           ): (
               false
           )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
