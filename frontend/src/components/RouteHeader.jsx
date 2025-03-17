function RouteHeader({route}) {

    return (
        <div className="flex justify-between border-b border-gray-200 p-4">
            <div className="flex flex-col">
                <div className="text-lg font-bold">Load ID: {route.load_id}</div>
                <div className="text-gray-600 mt-1">
                {route.distance_final} miles | {route.total_weight} {route.weight_uom}
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-xl font-bold">${route.total_price}</div>
                <div className="text-sm text-gray-500 mt-1">
                Loaded RPM: {route.loaded_rpm} $/mi
                </div>
            </div>
        </div>
    );
}

export default RouteHeader;