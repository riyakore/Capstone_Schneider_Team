import React, { useState, useEffect } from "react";
import MapInterface from "../components/MapInterface";
import Route from "../components/Route";
import { getFavorites, saveFavorite, deleteFavorite } from '../api/favorites';

export default function RoutesPage({ routes, onNavigateToHome, onNavigateToNextRoutes }) {
  const [expandedCard, setExpandedCard] = useState(null);

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
    if (expandedCard === uniqueKey) {
      setExpandedCard(null);
    } else {
      setExpandedCard(uniqueKey);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div className="w-1/2 p-4 overflow-y-auto">
        <div className="space-y-4">
          {subRoutes.map((route, index) => (
            <Route
              key={`${route.load_id}-${route.dropStop?.stop_id}`}
              route={route}
              handleToggle={() => handleToggle(`${route.load_id}-${route.dropStop?.stop_id}`)}
              isExpanded={expandedCard === `${route.load_id}-${route.dropStop?.stop_id}`}
              setExpandedCard={setExpandedCard}
              onNavigateToHome={onNavigateToHome}
              onNavigateToNextRoutes={onNavigateToNextRoutes}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <MapInterface routes={subRoutes} />
      </div>
    </div>
  );
}