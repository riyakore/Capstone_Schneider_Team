// LocationDetails.jsx
function LocationDetails({ route }) {
  // Suppose route.pickupStop is the "pickup" stop data
  // and route.dropStop is the "drop" stop data for this route.
  // You can rename them based on how you build your sub-routes.

  const { pickupStop, dropStop } = route;

  return (
    <div className="p-4">
      {/* 
        We'll use a grid with 1 column by default, 2 columns on medium screens and above.
        "gap-4" adds spacing between columns, "w-full" ensures it fits the container width.
      */}
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



// // LocationDetails.jsx
// function LocationDetails({ route }) {
//   const { pickupStop, dropStop } = route;
//   if (!pickupStop || !dropStop) return null;

//   return (
//     <div className="flex-1 border-l border-gray-200 pl-4">
//       <h2 className="font-bold text-lg mb-2">Detailed Stop Info</h2>

//       {/* Pickup Info */}
//       <div className="mb-3">
//         <div className="font-bold">Pickup Stop:</div>
//         <div>{pickupStop.location_name}</div>
//         <div>{pickupStop.address_line_1}</div>
//         <div>{pickupStop.city}, {pickupStop.state} {pickupStop.postal_code}</div>
//         <div>Appt Window: {pickupStop.appointment_from} → {pickupStop.appointment_to}</div>
//         <div>Time Zone: {pickupStop.time_zone}</div>
//       </div>

//       {/* Drop Info */}
//       <div className="mb-3">
//         <div className="font-bold">Drop Stop:</div>
//         <div>{dropStop.location_name}</div>
//         <div>{dropStop.address_line_1}</div>
//         <div>{dropStop.city}, {dropStop.state} {dropStop.postal_code}</div>
//         <div>Appt Window: {dropStop.appointment_from} → {dropStop.appointment_to}</div>
//         <div>Time Zone: {dropStop.time_zone}</div>
//       </div>
//     </div>
//   );
// }

// export default LocationDetails;


// function LocationDetails({route}) {
//     return (
//         <div className="flex-1 border-l border-gray-200 pl-4">
//           {/* From Location */}
//           <div className="mb-3">
//             <div className="font-bold text-lg mb-1">{route.origin.city}, {route.origin.state} {route.origin.postal_code}</div>
//             <div>{route.location_name}</div>
//             <div>{route.address_line_1}</div>
//             <div>{route.transport_mode}</div>
//           </div>
//           <div className="mb-4">
//             <div className="mb-1 text-gray-700">{route.appointment_from}</div>
//             <div>{route.transport_mode}</div>
//             <div>Stop {route.stop_sequence}: Pickup</div>
//             <div>Time Zone: {route.time_zone}</div>
//           </div>
// D
//           {/* To Location */}
//           <div className="mb-3">
//             <div className="font-bold text-lg mb-1">{route.destination}</div>
//             <div>{route.location_name}</div>
//             <div>{route.address_line_1}</div>
//             <div>{route.state}</div>
//           </div>
//           <div className="mb-4">
//             <div className="mb-1 text-gray-700">{route.appointment_to}</div>
//             <div>{route.transport_mode}</div>
//             <div>Stop {route.stop_sequence}: Drop</div>
//             <div>Time Zone: {route.time_zone}</div>
//           </div>
//         </div>
//     )
// }

// export default LocationDetails;