import {useEffect, useRef, useState} from 'react';
import '@trimblemaps/trimble-maps/dist/trimble-maps.css';

function MapInterface() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(12);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const initMap = async () => {
            const { default: trimblemaps } = await import('@trimblemaps/trimble-maps');

            if (mapContainer.current && !map) {
                const newMap = new trimblemaps.Map({
                    container: mapContainer.current,
                    style: trimblemaps.Style.TRANSPORTATION,
                    center: [-98.5795, 39.8283],
                    zoom: zoom,
                    apiKey: process.env.REACT_APP_TRIMBLE_MAPS_API_KEY
                });

                newMap.addControl(new trimblemaps.NavigationControl(), 'top-right');
                newMap.addControl(new trimblemaps.FullscreenControl(), 'top-right');

                newMap.on('moveend', () => {
                    setZoom(newMap.getZoom());
                });

                setMap(newMap);
            }
        };

        initMap();

        return () => {
            if (map) map.remove();
        }
    }, []);

    useEffect(() => {
        if (map) {
            map.on('click', (e) => {
                const coords = e.lngLat;
                addMarker(coords);
            });
        }
    }, [map]);

    const addMarker = (coords) => {
        if (map) {
            const marker = new trimblemaps.Marker().setLngLat(coords).addTo(map);
            setMarkers(prev => [...prev, marker]);
        }
    };

    return (
        <div className="w-full h-[600px] relative">
            <div ref={mapContainer} className="w-full h-full rounded-lg shadow-xl"/>

            <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md">
                <span className="font-semibold"> Zoom: {zoom.toFixed(2)}</span>
            </div>

        </div>
    )
} 

export default MapInterface;