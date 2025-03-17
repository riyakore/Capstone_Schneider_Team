function RouteHeader({route}) {
    return (
        <div className="flex justify-between border-b border-gray-200 p-4">
            <div className="flex flex-col">
                <div className="text-lg font-bold">{route.id}</div>
                <div className="text-gray-600 mt-1">
                {route.miles} | {route.weight}
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-xl font-bold">{route.price}</div>
                <div className="text-sm text-gray-500 mt-1">
                Loaded RPM: {route.loadedRPM}
                </div>
            </div>
        </div>
    );
}

export default RouteHeader;