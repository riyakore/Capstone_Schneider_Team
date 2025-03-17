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
function RouteDetails({ route }) {
const { origin, destination } = route;

    return (
        <div className="flex justify-between p-4 gap-4">
        {/* Origin side */}
        <div className="flex flex-col w-[45%]">
            <div className="font-bold mb-1">
            Origin: {origin.city}, {origin.state} {origin.postal_code}
            </div>
            {/* You can show more about the pickupStop if you want: 
                e.g. route.stops.find(s => s.stop_type === 'P') 
                to get appointment times, location_name, etc. */}
        </div>

        {/* Destination side */}
        <div className="flex flex-col w-[45%]">
            <div className="font-bold mb-1">
            Destination: {destination.city}, {destination.state} {destination.postal_code}
            </div>
            {/* Similarly, you can show the relevant 'D' stop details, 
                or just keep it minimal. */}
        </div>
        </div>
    );
}

export default RouteDetails;
