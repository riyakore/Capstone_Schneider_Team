import {useEffect, useRef, useState} from 'react';
import TrimbleMaps from '@trimblemaps/trimblemaps-js';

function MapInterface({routes, expandedRouteId}) {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(5);
    const [displayedRouteId, setDisplayedRouteId] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [originCoords, setOriginCoords] = useState([]);
    const [destCoords, setDestCoords] = useState([]);
    const [displayedRoute, setDisplayedRoute] = useState(null);

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
        if (!map || !expandedRouteId) {
            setOriginCoords([]);
            setDestCoords([]);
            return;
        }
        const route = routes.find(r => r.load_id == expandedRouteId.substring(0, expandedRouteId.indexOf("-")));
        TrimbleMaps.Geocoder.geocode({
            address: {
                addr: route.pickupStop.address_line_1,
                city: route.pickupStop.city,
                state: route.pickupStop.state,
                zip: route.pickupStop.postal_code,
                region: TrimbleMaps.Common.Region.NA
            },
            listSize: 1,
            success: function(response) {
                setOriginCoords([response[0].Coords.Lat, response[0].Coords.Lon])
            },
            failure: function(response) {
                console.log(response);
            }
        });

        TrimbleMaps.Geocoder.geocode({
            address: {
                addr: route.dropStop.address_line_1,
                city: route.dropStop.city,
                state: route.dropStop.state,
                zip: route.dropStop.postal_code,
                region: TrimbleMaps.Common.Region.NA
            },
            listSize: 1,
            success: function(response) {
                setDestCoords([response[0].Coords.Lat, response[0].Coords.Lon])
            },
            failure: function(response) {
                console.log(response);
            }
        });

    }, [expandedRouteId, map, routes]);

    useEffect(() => {
        if (!map || !expandedRouteId ) return;

        if (originCoords.length == 0 || destCoords.length == 0) return;
        const myRoute = new TrimbleMaps.Route({
            routeId:expandedRouteId,
            stops: [
                new TrimbleMaps.LngLat(Number(originCoords[1]), Number(originCoords[0])),
                new TrimbleMaps.LngLat(Number(destCoords[1]), Number(destCoords[0]))
            ],
            routeColor: '#f3601c'
        });
        displayedRoute?.remove();
        myRoute.addTo(map);
        setDisplayedRoute(myRoute);
        setDisplayedRouteId(expandedRouteId);
    }, [originCoords, destCoords]);

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
        <div className="w-full h-full relative">
            <div id='map' className="w-full h-full rounded-lg shadow-xl"/>

            <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md">
                <span className="font-semibold"> Zoom: {zoom.toFixed(2)}</span>
            </div>

        </div>
    )
} 

export default MapInterface;