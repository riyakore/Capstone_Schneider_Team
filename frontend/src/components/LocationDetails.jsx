// LocationDetails.jsx
function LocationDetails({ route }) {

  const { pickupStop, dropStop } = route;

  return (
    <div className="p-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        
        {/* Left Column: Pickup info */}
        <div className="bg-white border border-gray-300 rounded-lg p-3">
          <h2 className="font-bold text-lg mb-2">Pickup Stop</h2>
          {pickupStop ? (
            <div className="flex flex-col gap-1 text-sm">
              <p>
                <span className="font-semibold">City/State:</span>{" "}
                {pickupStop.city}, {pickupStop.state}
              </p>
              <p>
                <span className="font-semibold">Postal Code:</span>{" "}
                {pickupStop.postal_code}
              </p>
              <p>
                <span className="font-semibold">Location Name:</span>{" "}
                {pickupStop.location_name}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {pickupStop.address_line_1}
              </p>
              <p>
                <span className="font-semibold">Time Window:</span>{" "}
                {pickupStop.appointment_from} - {pickupStop.appointment_to}
              </p>
              <p>
                <span className="font-semibold">Time Zone:</span>{" "}
                {pickupStop.time_zone}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No pickup data found.</p>
          )}
        </div>

        {/* Right Column: Drop-off info */}
        <div className="bg-white border border-gray-300 rounded-lg p-3">
          <h2 className="font-bold text-lg mb-2">Drop-off Stop</h2>
          {dropStop ? (
            <div className="flex flex-col gap-1 text-sm">
              <p>
                <span className="font-semibold">City/State:</span>{" "}
                {dropStop.city}, {dropStop.state}
              </p>
              <p>
                <span className="font-semibold">Postal Code:</span>{" "}
                {dropStop.postal_code}
              </p>
              <p>
                <span className="font-semibold">Location Name:</span>{" "}
                {dropStop.location_name}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {dropStop.address_line_1}
              </p>
              <p>
                <span className="font-semibold">Time Window:</span>{" "}
                {dropStop.appointment_from} - {dropStop.appointment_to}
              </p>
              <p>
                <span className="font-semibold">Time Zone:</span>{" "}
                {dropStop.time_zone}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No drop-off data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;