import {useEffect, useRef, useState} from 'react';
import TrimbleMaps from '@trimblemaps/trimblemaps-js';

function MapInterface() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(12);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const initMap = async () => {
            TrimbleMaps.APIKey=import.meta.env.VITE_FPC_API_KEY;
        
            const newMap = new TrimbleMaps.Map({
                container: 'map',
                style: TrimbleMaps.Common.Style.TRANSPORTATION,
                center: [-89.38622, 43.07475],
                zoom: zoom,
            });

            newMap.addControl(new TrimbleMaps.NavigationControl(), 'top-right');
            newMap.addControl(new TrimbleMaps.FullscreenControl(), 'top-right');

            newMap.on('moveend', () => {
                setZoom(newMap.getZoom());
            });

            setMap(newMap);
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
            const marker = new TrimbleMaps.Marker().setLngLat(coords).addTo(map);
            setMarkers(prev => [...prev, marker]);
        }
    };

    return (
        <div className="w-full h-[600px] relative">
            <div id='map' className="w-full h-full rounded-lg shadow-xl"/>

            <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md">
                <span className="font-semibold"> Zoom: {zoom.toFixed(2)}</span>
            </div>

        </div>
    )
} 

export default MapInterface;