import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

export default function NewMarkers() {
    const [markers, setMarkers] = useState([
        {
            lat: 52.520008,
            lng: 13.404954,
        },
    ]);

    useEffect(() => {}, []);

    useMapEvents({
        click: (e) => {
            setMarkers([...markers, e.latlng]);
        },
    });
    console.log("markers", markers);

    return (
        <>
            {markers.map((marker, index) => (
                <Marker key={index} position={marker}>
                    <Popup>
                        <span>Point</span>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}
