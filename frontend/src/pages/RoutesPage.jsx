import React, { useState, useEffect } from "react";
import MapInterface from "../components/MapInterface";
import Route from "../components/Route";
import { getFavorites, saveFavorite, deleteFavorite } from '../api/favorites';

export default function RoutesPage({ routes, onNavigateToHome, onNavigateToNextRoutes }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedRouteId, setExpandedRouteId] = useState(null);

  // if the search doesn't find any loads, then you return this
  if (!routes || routes.length === 0) {
    return (
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-1/2 p-4 flex items-center justify-center">
          <div>
            <h2 className="text-xl font-bold">Sorry, no loads available!</h2>
            <button
              onClick={onNavigateToHome}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Return to Search
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <MapInterface routes={[]} />
        </div>
      </div>
    );
  }

  // Build subRoutes from route_data
  const subRoutes = [];

  // change this logic for subroutes
  routes.forEach((load) => {
    // 1) Find the single pickup stop
    const pickupStop = load.stops.find((s) => s.stop_type === "P");

    // 2) For each drop stop, build a sub-route
    const dropStops = load.stops.filter((s) => s.stop_type === "D");

    dropStops.forEach((dropStop) => {
      subRoutes.push({
        // Basic load info:
        load_id: load.load_id,
        total_weight: load.total_weight,
        weight_uom: load.weight_uom,
        distance_final: load.distance_final,
        distance_uom: load.distance_uom,
        loaded_rpm: load.loaded_rpm,
        total_price: load.total_price,
        is_hazardous: load.is_hazardous,
        is_high_value: load.is_high_value,
        is_temperature_controlled: load.is_temperature_controlled,
        transport_mode: load.transport_mode,

        // The single pickupStop
        pickupStop: pickupStop || null,

        // The single dropStop
        dropStop: dropStop || null
      });
    });
  });

  const handleToggle = (uniqueKey) => {
    setExpandedCard((prev) => (prev === uniqueKey ? null : uniqueKey));
    setExpandedRouteId((prev) => (prev === uniqueKey ? null : uniqueKey));
  };

  return (
    <div className="flex w-full h-[calc(100vh-80px)]">
      {/* Left side: the list of sub-route cards */}
      <div className="w-[45%] overflow-y-auto p-4 bg-gray-50">
        {subRoutes.map((subRoute, idx) => {
          const uniqueKey = `${subRoute.load_id}-${idx}`;
          const isExpanded = expandedCard === uniqueKey;

          return (
            <Route
              key={uniqueKey}
              route={subRoute}
              isExpanded={isExpanded}
              handleToggle={() => handleToggle(uniqueKey)}
              setExpandedCard={setExpandedCard}
              onNavigateToHome={onNavigateToHome}
              onNavigateToNextRoutes={onNavigateToNextRoutes}
            />
          );
        })}
      </div>
      <MapInterface routes={subRoutes} expandedRouteId={expandedRouteId}/>
      </div>
  );
}