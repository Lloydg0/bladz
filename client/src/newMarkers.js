import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function NewMarkers() {
    const [markers, setMarkers] = useState([
        {
            lat: 52.520008,
            lng: 13.404954,
        },
    ]);

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
