function RouteDetails({route}) {
    return (
        <div className="flex justify-between p-4 gap-4">
            <div className="flex flex-col w-[45%]">
                <div className="font-bold mb-1">{route.fromCity}</div>
                <div className="text-gray-600 mb-2">{route.fromTimeWindow}</div>
                {route.fromInstructions.map((inst, i) => (
                <div key={i}>{inst}</div>
                ))}
            </div>
            <div className="flex flex-col w-[45%]">
                <div className="font-bold mb-1">{route.toCity}</div>
                <div className="text-gray-600 mb-2">{route.toTimeWindow}</div>
                {route.toInstructions.map((inst, i) => (
                <div key={i}>{inst}</div>
                ))}
            </div>
        </div>
    )
}

export default RouteDetails;