// RouteDetails.jsx
function RouteDetails({ route }) {
    const { pickupStop, dropStop } = route;

    if (!pickupStop || !dropStop) {
        return (
        <div className="p-4 text-red-500">
            Missing pickupStop or dropStop data.
        </div>
        );
    }

    return (
        <div className="flex justify-between p-4 gap-4">
        {/* Origin side */}
        <div className="flex flex-col w-[45%]">
            <div className="font-bold mb-1">
            Origin: {pickupStop.city}, {pickupStop.state} {pickupStop.postal_code}
            </div>
            <div className="text-gray-600 mb-2">{pickupStop.location_name}</div>
            <div>{pickupStop.address_line_1}</div>
            {/* If you want appointment times: */}
            <div className="text-sm text-gray-500">
            {pickupStop.appointment_from} → {pickupStop.appointment_to}
            </div>
        </div>

        {/* Destination side */}
        <div className="flex flex-col w-[45%]">
            <div className="font-bold mb-1">
            Destination: {dropStop.city}, {dropStop.state} {dropStop.postal_code}
            </div>
            <div className="text-gray-600 mb-2">{dropStop.location_name}</div>
            <div>{dropStop.address_line_1}</div>
            <div className="text-sm text-gray-500">
            {dropStop.appointment_from} → {dropStop.appointment_to}
            </div>
        </div>
        </div>
    );
}

export default RouteDetails;