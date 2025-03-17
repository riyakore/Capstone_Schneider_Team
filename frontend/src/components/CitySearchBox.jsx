import React, { useState, useEffect } from 'react';
import TrimbleMaps from '@trimblemaps/trimblemaps-js';

const CitySearchBox = ({ query, setQuery }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    TrimbleMaps.APIKey=import.meta.env.VITE_FPC_API_KEY;

    // Debounce function to limit API calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Fetch city suggestions using SDK's forward geocoding
    const fetchSuggestions = async (query) => {
            if (!query) {
                setSuggestions([]);
            return;
        }

        const isZip = Number.isInteger(query);

        setIsLoading(true);
        try {
            TrimbleMaps.Geocoder.geocode({
                address: {
                    city: query,
                },
                listSize: 5,
                success: function(response) {
                    setSuggestions(response);
                },
                failure: function(response) {
                    console.log(response);
                }
            });
        } 
        
        catch (error) {
            console.error('Error fetching suggestions:', error);
        } 
        
        finally {
            setIsLoading(false);
        }
    };

    // Debounced version of fetchSuggestions
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    // Update suggestions when query changes
    useEffect(() => {
    debouncedFetchSuggestions(query);
    }, [query]);

  // Handle suggestion selection
    const handleSuggestionClick = async (suggestion) => {
        // setQuery(`${suggestion.Address.City} ${suggestion.Address.State} ${suggestion.Address.Zip}`);
        setQuery(`${suggestion.Address.City}`);
        setSuggestions([]);
    };

    return (
        <div className="relative mx-2">
        {/* Search input */}
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
    
        {/* Loading indicator */}
        {isLoading && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
            Loading...
            </div>
        )}
    
        {/* Suggestions dropdown */}
        {!isLoading && suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border-2 border-gray-300 rounded-md shadow-lg">
            {suggestions?.map((suggestion, index) => (
                <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-100 hover:cursor-pointer hover:scale-105"
                >
                {suggestion?.Address?.City} {suggestion.Address?.State} {suggestion?.Address?.Zip}
                </div>
            ))}
            </div>
        )}
    
        {/* Selected city details */}
        {selectedCity && (
            <div className="mt-4">
            <p>City: {selectedCity.name}</p>
            <p>Zip Code: {selectedCity.zipCode}</p>
            </div>
        )}
        </div>
    );
};

export default CitySearchBox;