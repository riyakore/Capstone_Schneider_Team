// LocationDetails.jsx
function LocationDetails({ route }) {
  const { pickupStop, dropStop } = route;
  if (!pickupStop || !dropStop) return null;

  return (
    <div className="flex-1 border-l border-gray-200 pl-4">
      <h2 className="font-bold text-lg mb-2">Detailed Stop Info</h2>

      {/* Pickup Info */}
      <div className="mb-3">
        <div className="font-bold">Pickup Stop:</div>
        <div>{pickupStop.location_name}</div>
        <div>{pickupStop.address_line_1}</div>
        <div>{pickupStop.city}, {pickupStop.state} {pickupStop.postal_code}</div>
        <div>Appt Window: {pickupStop.appointment_from} → {pickupStop.appointment_to}</div>
        <div>Time Zone: {pickupStop.time_zone}</div>
      </div>

      {/* Drop Info */}
      <div className="mb-3">
        <div className="font-bold">Drop Stop:</div>
        <div>{dropStop.location_name}</div>
        <div>{dropStop.address_line_1}</div>
        <div>{dropStop.city}, {dropStop.state} {dropStop.postal_code}</div>
        <div>Appt Window: {dropStop.appointment_from} → {dropStop.appointment_to}</div>
        <div>Time Zone: {dropStop.time_zone}</div>
      </div>
    </div>
  );
}

export default LocationDetails;


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