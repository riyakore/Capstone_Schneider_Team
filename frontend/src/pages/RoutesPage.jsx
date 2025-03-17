// after you press search
import React, { useState, useEffect } from "react";
import MapInterface from "../components/MapInterface";
import ExpandedCard from "../components/ExpandedCard";
import Route from '../components/Route';


const route_data = [
  {
    "load_id": "12345",
    "stops": [
        {
            "id": 14542,
            "stop_id": "stopidforload123451",
            "stop_sequence": 1,
            "stop_type": "P",
            "activity_type": null,
            "appointment_from": "2025-03-21T03:13:41Z",
            "appointment_to": "2025-03-31T03:13:44Z",
            "city": "Madison",
            "state": "WI",
            "postal_code": "53715",
            "time_zone": "US/Central",
            "country": "USA",
            "location_name": "GRAINGER HALL",
            "address_line_1": "975 University Ave, Madison, WI 53715",
            "address_line_2": null,
            "appointment_state": "A",
            "created_date": "2025-03-20T03:14:29Z",
            "updated_date": "2025-03-20T03:14:32Z",
            "load_posting": "12345"
        },
        {
            "id": 14543,
            "stop_id": "stopidforload123452",
            "stop_sequence": 2,
            "stop_type": "D",
            "activity_type": null,
            "appointment_from": "2025-03-21T03:15:02Z",
            "appointment_to": "2025-03-31T03:15:08Z",
            "city": "Milwaukee",
            "state": "WI",
            "postal_code": "53202",
            "time_zone": "US/Central",
            "country": "USA",
            "location_name": "MILWAUKEE CITY HALL",
            "address_line_1": "200 E Wells St, Milwaukee, WI 53202",
            "address_line_2": null,
            "appointment_state": "A",
            "created_date": "2025-03-20T03:15:59Z",
            "updated_date": "2025-03-20T03:16:02Z",
            "load_posting": "12345"
        },
        {
            "id": 14544,
            "stop_id": "stopidforload123453",
            "stop_sequence": 3,
            "stop_type": "D",
            "activity_type": null,
            "appointment_from": "2025-03-21T03:16:30Z",
            "appointment_to": "2025-03-31T03:16:33Z",
            "city": "Chicago",
            "state": "IL",
            "postal_code": "60606",
            "time_zone": "US/Central",
            "country": "USA",
            "location_name": "BEATRIX MARKET",
            "address_line_1": "155 N Wacker Dr Suite 102, Chicago, IL 60606",
            "address_line_2": null,
            "appointment_state": "A",
            "created_date": "2025-03-20T03:17:29Z",
            "updated_date": "2025-03-20T03:17:32Z",
            "load_posting": "12345"
        },
        {
            "id": 14545,
            "stop_id": "stopidforload123454",
            "stop_sequence": 4,
            "stop_type": "D",
            "activity_type": null,
            "appointment_from": "2025-03-21T03:18:09Z",
            "appointment_to": "2025-03-31T03:18:12Z",
            "city": "Rockford",
            "state": "IL",
            "postal_code": "61107",
            "time_zone": "US/Central",
            "country": "USA",
            "location_name": "FEDEX DROP BOX",
            "address_line_1": "124 N Water St, Rockford, IL 61107",
            "address_line_2": null,
            "appointment_state": "A",
            "created_date": "2025-03-20T03:18:54Z",
            "updated_date": "2025-03-20T03:18:57Z",
            "load_posting": "12345"
        }
    ],
    "origin": {
        "city": "Madison",
        "state": "WI",
        "postal_code": "53715"
    },
    "destination": [
        {
            "city": "Milwaukee",
            "state": "WI",
            "postal_code": "53202"
        },
        {
            "city": "Chicago",
            "state": "IL",
            "postal_code": "60606"
        },
        {
            "city": "Rockford",
            "state": "IL",
            "postal_code": "61107"
        }
    ],
    "loaded_rpm": 25,
    "distance_final": 216,
    "total_price": 5400,
    "posting_status": "NEW",
    "source_system": "MASTERMIND",
    "has_appointments": true,
    "is_hazardous": true,
    "is_high_value": true,
    "is_temperature_controlled": true,
    "total_distance": null,
    "distance_uom": null,
    "total_weight": 840.0,
    "weight_uom": "lb",
    "number_of_stops": 4,
    "transport_mode": "Power Only",
    "created_date": "2025-03-20T03:12:17Z",
    "updated_date": "2025-03-20T03:12:20Z",
    "managed_equipment": true,
    "load_number_alias": null,
    "is_carb": true,
    "fpc": false,
    "fpo": true,
    "division": "Power Only",
    "capacity_type": "Power Only",
    "extended_network": false
}
];


export default function RoutesPage() {
// export default function RoutesPage({ routes }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const subRoutes = [];
  route_data.forEach((load) => {
    load.destination.forEach((dest, index) => {
      subRoutes.push({
        // Inherit from the original load:
        load_id: load.load_id,
        stops: load.stops,
        origin: load.origin,
        // This single sub-route has one destination object:
        destination: dest,
        loaded_rpm: load.loaded_rpm,
        distance_final: load.distance_final,
        total_price: load.total_price,
        is_hazardous: load.is_hazardous,
        is_high_value: load.is_high_value,
        is_temperature_controlled: load.is_temperature_controlled,
        total_weight: load.total_weight,
        
        // etc. Add other fields as needed.
      });
    });
  });

  const handleToggle = (subRouteKey) => {
    setExpandedCard((prev) => (prev === subRouteKey ? null : subRouteKey));
  };

  // return (
  //   <div style={{ display: "flex", width: "100%", height: "calc(100vh - 80px)" }}>
  //     <div style={{ width: "45%", overflowY: "auto", padding: "1rem", backgroundColor: "#f5f5f5" }}>
  //       {/* 
  //         If routes is empty, show a message. Otherwise map each route.
  //         If your backend returns e.g. route.load_id, we must use that as the key. 
  //       */}
  //       {routes.length === 0 ? (
  //         <div>No results found.</div>
  //       ) : (
  //         routes.map((route) => {
  //           const isExpanded = expandedCard === route.load_id;
  //           return (
  //             <Route
  //               key={route.load_id}
  //               route={route}
  //               handleToggle={handleToggle}
  //               isExpanded={isExpanded}
  //               setExpandedCard={setExpandedCard}
  //             />
  //           );
  //         })
  //       )}

  //       {/* Show raw JSON for debugging */}
  //       <div style={{ marginTop: "1rem" }}>
  //         <h2>Raw JSON Output</h2>
  //         <pre
  //           style={{
  //             backgroundColor: "#eee",
  //             padding: "1rem",
  //             borderRadius: "4px",
  //             fontSize: "0.9rem",
  //             overflowX: "auto",
  //           }}
  //         >
  //           {JSON.stringify(routes, null, 2)}
  //         </pre>
  //       </div>
  //     </div>

  //     <div style={{ flex: 1, height: "100%" }}>
  //       <div
  //         style={{
  //           height: "100%",
  //           border: "3px dashed #aaa",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           fontWeight: "bold",
  //           fontSize: "1.1rem",
  //           backgroundColor: "#fff",
  //         }}
  //       >
  //         <MapInterface />
  //       </div>
  //     </div>
  //   </div>
  // );

  // // old code
  // return (
  //   <div style={{ display: "flex", width: "100%", height: "calc(100vh - 80px)" }}>
  //     <div style={{ width: "45%", overflowY: "auto", padding: "1rem", backgroundColor: "#f5f5f5" }}>
  //       {routes.map((route) => {
  //         const isExpanded = expandedCard === route.load_id; 
  //         return (
  //           <Route
  //             key={route.load_id}
  //             route={route}
  //             handleToggle={handleToggle}
  //             isExpanded={isExpanded}
  //             setExpandedCard={setExpandedCard}
  //           />
  //         );
  //       })}
  //     </div>
  //     <div style={{ flex: 1, height: "100%" }}>
  //       <div
  //         style={{
  //           height: "100%",
  //           border: "3px dashed #aaa",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           fontWeight: "bold",
  //           fontSize: "1.1rem",
  //           backgroundColor: "#fff",
  //         }}
  //       >
  //         <MapInterface />
  //       </div>
  //     </div>
  //   </div>
  // );
  // // old code

  return (
    <div className="flex w-full h-[calc(100vh-80px)]">
      {/* Left side: the list of sub-route cards */}
      <div className="w-[45%] overflow-y-auto p-4 bg-gray-50">
        {subRoutes.map((subRoute, idx) => {
          // We'll use load_id + idx as a unique key
          const uniqueKey = `${subRoute.load_id}-${idx}`;
          const isExpanded = expandedCard === uniqueKey;
          return (
            <Route
              key={uniqueKey}
              route={subRoute}
              isExpanded={isExpanded}
              handleToggle={() => handleToggle(uniqueKey)}
              setExpandedCard={setExpandedCard}
            />
          );
        })}
      </div>

      {/* Right side: map placeholder */}
      <div style={{ flex: 1, height: "100%" }}>
        <div
          style={{
            height: "100%",
            border: "3px dashed #aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
            backgroundColor: "#fff",
          }}
        >
          <MapInterface />
        </div>
      </div>
    </div>
  );


  // previous code to display 
  // return (
  //   <div className="flex w-full h-[calc(100vh-80px)]">
  //     <div className="w-[45%] overflow-y-auto p-4 bg-gray-50">
  //       {route_data.map((route) => {
  //         const isExpanded = expandedCard === route.load_id;
  //         return (
  //           <Route 
  //             key={route.load_id}
  //             route={route} 
  //             handleToggle={handleToggle}
  //             isExpanded={isExpanded}
  //             setExpandedCard={setExpandedCard}
  //           /> 
  //         );
  //       })}
  //     </div>
  //     <div style={{flex:1,height:"100%"}}>
  //       <div style={{height:"100%",border:"3px dashed #aaa",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"1.1rem",backgroundColor:"#fff"}}>
  //         <MapInterface></MapInterface>
  //       </div>
  //     </div>
  //   </div>
  // );
}
