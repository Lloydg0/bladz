import { MapContainer, TileLayer } from "react-leaflet";
import NewMarkers from "./newMarkers";

export default function Routes() {
    return (
        <div className="map-title-container">
            <h1>Routes</h1>
            <div className="map-container">
                <MapContainer center={[52.520008, 13.404954]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <NewMarkers />
                </MapContainer>
            </div>
        </div>
    );
}
