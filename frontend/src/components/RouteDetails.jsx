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
    



// function RouteDetails({route}) {

//     const pickupStop = route.stops.find((s) => s.stop_type === "P");
//     const dropStops = route.stops.filter((s) => s.stop_type === "D");

//     return (
//         <div className="flex justify-between p-4 gap-4">
//             <div className="flex flex-col w-[45%]">
//                 <div className="font-bold mb-1">
//                     Origin: {route.origin?.city}, {route.origin?.state}{" "}
//                     {route.origin?.postal_code}
//                 </div>
            
//                 <div className="text-gray-600 mb-2">{route.appointment_from}</div>
//                 <div>{route.transport_mode}</div>
//             </div>
//             <div className="flex flex-col w-[45%]">
//                 <div className="font-bold mb-1">{route.destination}</div>
//                 <div className="text-gray-600 mb-2">{route.appointment_to}</div>
//                 <div>{route.transport_mode}</div>
//             </div>
//         </div>
//     )
// }

// export default RouteDetails;

// RouteDetails.jsx
// function RouteDetails({ route }) {
//     console.log(route);
//     console.log(route.origin);
//     console.log(route.destination);
// // const { origin, destination } = route;

//     return (
//         <div className="flex justify-between p-4 gap-4">
//         {/* Origin side */}
//         <div className="flex flex-col w-[45%]">
//             <div className="font-bold mb-1">
//             Origin: {route.origin.city}, {route.origin.state} {route.origin.postal_code}
//             </div>
//             {/* You can show more about the pickupStop if you want: 
//                 e.g. route.stops.find(s => s.stop_type === 'P') 
//                 to get appointment times, location_name, etc. */}
//         </div>

//         {/* Destination side */}
//         <div className="flex flex-col w-[45%]">
//             <div className="font-bold mb-1">
//             Destination: {route.destination.city}, {route.destination.state} {route.destination.postal_code}
//             </div>
//             {/* Similarly, you can show the relevant 'D' stop details, 
//                 or just keep it minimal. */}
//         </div>
//         </div>
//     );
// }

// export default RouteDetails;
