import React, { useState } from "react";

export default function RoutesPage() {
  const [expandedCard, setExpandedCard] = useState(null);

  const routes = [
    {
      id: "ST153015695",
      miles: "2.35 miles",
      weight: "1 lb",
      price: "$649",
      loadedRPM: "$276.32",
      fromCity: "GREEN BAY, WI",
      fromCompany: "AMERICAN CUSTOM CONVERTING 2136",
      fromAddress: "2441 LARSEN RD",
      fromFullState: "GREEN BAY, WI 54303",
      fromTimeWindow: "Tue, Feb 18, 11:08 - Thu, Mar 20, 08:30",
      fromInstructions: ["Pick Up Loaded Trailer", "Drop Empty Trailer"],
      fromStopNumber: 1,
      toCity: "GLENVIEW, IL",
      toCompany: "COSTCO WHOLESALE CORP",
      toAddress: "2900 PATRIOT BLVD",
      toFullState: "GLENVIEW, IL 60026-8046",
      toTimeWindow: "Tue, Feb 18, 14:47 - Tue, Feb 18, 15:17",
      toInstructions: ["Drop Loaded Trailer", "Pick Up Empty Trailer"],
      toStopNumber: 2,
      timeZone: "US/Central",
      commodityDescription: "Paper Products",
      commodityPackaging: "",
      rateTotal: "$649.36"
    },
    {
      id: "ST987654321",
      miles: "5.10 miles",
      weight: "2 lbs",
      price: "$775",
      loadedRPM: "$151.00",
      fromCity: "APPLETON, WI",
      fromCompany: "Example Shipper",
      fromAddress: "123 Shipper St",
      fromFullState: "Appleton, WI 54911",
      fromTimeWindow: "Wed, Feb 19, 09:00 - Wed, Feb 19, 12:00",
      fromInstructions: ["Pick Up Pallet", "Driver Assist Loading"],
      fromStopNumber: 1,
      toCity: "MILWAUKEE, WI",
      toCompany: "Example Receiver",
      toAddress: "999 Receiver Rd",
      toFullState: "Milwaukee, WI 53202",
      toTimeWindow: "Wed, Feb 19, 15:30 - Wed, Feb 19, 18:00",
      toInstructions: ["Drop Pallet", "No Driver Assist"],
      toStopNumber: 2,
      timeZone: "US/Central",
      commodityDescription: "General Goods",
      commodityPackaging: "Boxes",
      rateTotal: "$775.00"
    },
    {
      id: "ST999888777",
      miles: "12.00 miles",
      weight: "500 lbs",
      price: "$950",
      loadedRPM: "$79.17",
      fromCity: "MADISON, WI",
      fromCompany: "Another Shipper",
      fromAddress: "101 State St",
      fromFullState: "Madison, WI 53703",
      fromTimeWindow: "Thu, Feb 20, 07:00 - Fri, Feb 21, 10:00",
      fromInstructions: ["Pick Up 2 Pallets", "Check-in w/ Security"],
      fromStopNumber: 1,
      toCity: "MIDDLETON, WI",
      toCompany: "Another Receiver",
      toAddress: "505 Main St",
      toFullState: "Middleton, WI 53562",
      toTimeWindow: "Fri, Feb 21, 13:00 - Fri, Feb 21, 15:00",
      toInstructions: ["Liftgate Required", "Forklift On-site"],
      toStopNumber: 2,
      timeZone: "US/Central",
      commodityDescription: "Electronics",
      commodityPackaging: "Crates",
      rateTotal: "$950.00"
    }
  ];

  const handleToggle = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{display:"flex",width:"100%",height:"calc(100vh - 80px)"}}>
      <div style={{width:"45%",overflowY:"auto",padding:"1rem",backgroundColor:"#f5f5f5"}}>
        {routes.map((route) => {
          const isExpanded = expandedCard === route.id;
          return (
            <div key={route.id} onClick={() => handleToggle(route.id)} style={{border:"1px solid #ddd",borderRadius:"6px",marginBottom:"1rem",backgroundColor:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #eee",padding:"1rem"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <div style={{fontSize:"1rem",fontWeight:"bold"}}>{route.id}</div>
                  <div style={{color:"#666",marginTop:"4px"}}>{route.miles} | {route.weight}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                  <div style={{fontSize:"1.2rem",fontWeight:"bold"}}>{route.price}</div>
                  <div style={{fontSize:"0.9rem",color:"#888",marginTop:"4px"}}>Loaded RPM: {route.loadedRPM}</div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"1rem",gap:"1rem"}}>
                <div style={{display:"flex",flexDirection:"column",width:"45%"}}>
                  <div style={{fontWeight:"bold",marginBottom:"0.25rem"}}>{route.fromCity}</div>
                  <div style={{color:"#666",marginBottom:"0.5rem"}}>{route.fromTimeWindow}</div>
                  {route.fromInstructions.map((inst, i) => <div key={i}>{inst}</div>)}
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"45%"}}>
                  <div style={{fontWeight:"bold",marginBottom:"0.25rem"}}>{route.toCity}</div>
                  <div style={{color:"#666",marginBottom:"0.5rem"}}>{route.toTimeWindow}</div>
                  {route.toInstructions.map((inst, i) => <div key={i}>{inst}</div>)}
                </div>
              </div>
              {isExpanded && (
                <ExpandedDetails
                  route={route}
                  onBackClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  onBookClick={(e) => {
                    e.stopPropagation();
                    alert(`Booking route with ID: ${route.id}`);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div style={{flex:1,height:"100%"}}>
        <div style={{height:"100%",border:"3px dashed #aaa",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"1.1rem",backgroundColor:"#fff"}}>
          Placeholder for Map
        </div>
      </div>
    </div>
  );
}

function ExpandedDetails({ route, onBackClick, onBookClick }) {
  return (
    <div onClick={(e)=>e.stopPropagation()} style={{backgroundColor:"#fafafa",marginTop:"1rem",borderTop:"1px solid #eee",padding:"1rem"}}>
      <div style={{display:"flex"}}>
        <div style={{flex:1,marginRight:"1rem"}}>
          <div style={{backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"6px",padding:"1rem",marginBottom:"1rem"}}>
            <h2 style={{marginTop:0}}>Rate Details</h2>
            <table style={{width:"100%",borderCollapse:"collapse",marginTop:"1rem"}}>
              <thead>
                <tr>
                  <th style={{textAlign:"left",padding:"0.5rem",borderBottom:"1px solid #ddd"}}>Rate Details</th>
                  <th style={{textAlign:"left",padding:"0.5rem",borderBottom:"1px solid #ddd"}}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{padding:"0.5rem",borderBottom:"1px solid #ddd"}}>Base Rate</td>
                  <td style={{padding:"0.5rem",borderBottom:"1px solid #ddd"}}>{route.rateTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"6px",padding:"1rem"}}>
            <h2 style={{marginTop:0}}>Commodity Detail</h2>
            <table style={{width:"100%",borderCollapse:"collapse",marginTop:"1rem"}}>
              <thead>
                <tr>
                  <th style={{textAlign:"left",padding:"0.5rem",borderBottom:"1px solid #ddd"}}>Description</th>
                  <th style={{textAlign:"left",padding:"0.5rem",borderBottom:"1px solid #ddd"}}>Packaging Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{padding:"0.5rem",borderBottom:"1px solid #ddd"}}>{route.commodityDescription}</td>
                  <td style={{padding:"0.5rem",borderBottom:"1px solid #ddd"}}>{route.commodityPackaging}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{flex:1,borderLeft:"1px solid #ddd",paddingLeft:"1rem"}}>
          <div style={{marginBottom:"0.75rem"}}>
            <div style={{fontWeight:"bold",fontSize:"1rem",marginBottom:"0.25rem"}}>{route.fromCity}</div>
            <div>{route.fromCompany}</div>
            <div>{route.fromAddress}</div>
            <div>{route.fromFullState}</div>
          </div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{marginBottom:"0.25rem",color:"#333"}}>{route.fromTimeWindow}</div>
            {route.fromInstructions.map((inst, i) => <div key={i} style={{color:"#f3601c"}}>{inst}</div>)}
            <div>Stop {route.fromStopNumber}: Pickup</div>
            <div>Time Zone: {route.timeZone}</div>
          </div>
          <div style={{marginBottom:"0.75rem"}}>
            <div style={{fontWeight:"bold",fontSize:"1rem",marginBottom:"0.25rem"}}>{route.toCity}</div>
            <div>{route.toCompany}</div>
            <div>{route.toAddress}</div>
            <div>{route.toFullState}</div>
          </div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{marginBottom:"0.25rem",color:"#333"}}>{route.toTimeWindow}</div>
            {route.toInstructions.map((inst, i) => <div key={i} style={{color:"#f3601c"}}>{inst}</div>)}
            <div>Stop {route.toStopNumber}: Drop</div>
            <div>Time Zone: {route.timeZone}</div>
          </div>
        </div>
      </div>
      <div style={{marginTop:"1rem",display:"flex",gap:"1rem"}}>
        <button onClick={onBackClick} style={{padding:"0.5rem 1rem",cursor:"pointer",borderRadius:"9999px",border:"none",backgroundColor:"#d3d3d3",color:"#333"}}>Back</button>
        <button onClick={onBookClick} style={{padding:"0.5rem 1rem",cursor:"pointer",borderRadius:"9999px",border:"none",backgroundColor:"#f3601c",color:"#fff"}}>Book Now</button>
      </div>
    </div>
  );
}
