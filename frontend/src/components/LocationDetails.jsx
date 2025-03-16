function LocationDetails({route}) {
    return (
        <div className="flex-1 border-l border-gray-200 pl-4">
          {/* From Location */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">{route.fromCity}</div>
            <div>{route.fromCompany}</div>
            <div>{route.fromAddress}</div>
            <div>{route.fromFullState}</div>
          </div>
          <div className="mb-4">
            <div className="mb-1 text-gray-700">{route.fromTimeWindow}</div>
            {route.fromInstructions.map((inst, i) => (
              <div key={i} className="text-orange-500">{inst}</div>
            ))}
            <div>Stop {route.fromStopNumber}: Pickup</div>
            <div>Time Zone: {route.timeZone}</div>
          </div>

          {/* To Location */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">{route.toCity}</div>
            <div>{route.toCompany}</div>
            <div>{route.toAddress}</div>
            <div>{route.toFullState}</div>
          </div>
          <div className="mb-4">
            <div className="mb-1 text-gray-700">{route.toTimeWindow}</div>
            {route.toInstructions.map((inst, i) => (
              <div key={i} className="text-orange-500">{inst}</div>
            ))}
            <div>Stop {route.toStopNumber}: Drop</div>
            <div>Time Zone: {route.timeZone}</div>
          </div>
        </div>
    )
}

export default LocationDetails;