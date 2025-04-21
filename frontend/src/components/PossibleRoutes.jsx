import { useEffect, useState } from "react";

function PossibleRoutes({ currentDestination }) {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentDestination) return;

        const fetchRoutes = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('origin', currentDestination);
                
                const response = await fetch(
                    `http://localhost:8000/api/search-loads/?${queryParams.toString()}`
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setRoutes(data);
            } catch (err) {
                console.error("Failed to fetch next routes:", err);
                setRoutes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [currentDestination]);

    return (
        <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">
                Possible Next Trips from {currentDestination}
            </h3>
            {loading ? (
                <p>Loading...</p>
            ) : routes.length === 0 ? (
                <p className="text-sm text-gray-500">No further trips found from this location.</p>
            ) : (
                <ul className="space-y-2">
                    {routes.map((route, idx) => {
                        const pickup = route.stops.find(s => s.stop_type === "P");
                        const drop = route.stops.find(s => s.stop_type === "D");
                        return (
                            <li key={idx} className="p-2 border rounded shadow-sm bg-white">
                                {pickup?.city} ➜ {drop?.city} ({route.distance_final} {route.distance_uom})
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default PossibleRoutes;
