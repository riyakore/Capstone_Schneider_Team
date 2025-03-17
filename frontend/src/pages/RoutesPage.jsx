// after you press search
import React, { useState } from "react";
import MapInterface from "../components/MapInterface";
import ExpandedCard from "../components/ExpandedCard";
import Route from '../components/Route';

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
    <div className="flex w-full h-[calc(100vh-80px)]">
      <div className="w-[45%] overflow-y-auto p-4 bg-gray-50">
        {routes.map((route) => {
          const isExpanded = expandedCard === route.id;
          return (
            <Route 
              key={route.id} 
              route={route} 
              handleToggle={handleToggle}
              isExpanded={isExpanded}
              setExpandedCard={setExpandedCard}
            /> 
          );
        })}
      </div>
      <MapInterface/>
      
    </div>
  );
}
