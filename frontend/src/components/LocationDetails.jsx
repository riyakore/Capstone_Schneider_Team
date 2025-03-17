function LocationDetails({route}) {
    return (
        <div className="flex-1 border-l border-gray-200 pl-4">
          {/* From Location */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">{route.origin}</div>
            <div>{route.location_name}</div>
            <div>{route.address_line_1}</div>
            <div>{route.state}</div>
          </div>
          <div className="mb-4">
            <div className="mb-1 text-gray-700">{route.appointment_from}</div>
            <div>{route.transport_mode}</div>
            <div>Stop {route.stop_sequence}: Pickup</div>
            <div>Time Zone: {route.time_zone}</div>
          </div>

          {/* To Location */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">{route.destination}</div>
            <div>{route.location_name}</div>
            <div>{route.address_line_1}</div>
            <div>{route.state}</div>
          </div>
          <div className="mb-4">
            <div className="mb-1 text-gray-700">{route.appointment_to}</div>
            <div>{route.transport_mode}</div>
            <div>Stop {route.stop_sequence}: Drop</div>
            <div>Time Zone: {route.time_zone}</div>
          </div>
        </div>
    )
}

export default LocationDetails;