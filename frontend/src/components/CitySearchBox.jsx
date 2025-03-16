import {useState, useEffect } from 'react';

const CitySearchBox = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const debounce = (f, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => f(...args), delay);
        }
    }

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://api.trimblemaps.com/geocoding/v1/autocomplete?text=${query}&apiKey=${import.meta.env.VITE_FPC_API_KEY}`);
            const data = await response.json();
            setSuggestions(data.results);
        } catch (error) {
            console.error("Error fetching suggestions: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    useEffect(() => {
        debouncedFetchSuggestions(query);
    }, []);

    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.formatted_address);
        setSuggestions([]);

        const data = fetch(`https://api.trimblemaps.com/geocoding/v1/reverse?point.lat=${suggestion.position.lat}&point.lon=${suggestion.position.lon}&apiKey=${VITE_FPC_API_KEY}`)
        .then(res => {
            if (!res.ok) {
                console.error("error fetching request");
                return;
            }
            return res.json();
        });
        const zipCode = data.address?.postcode || 'N/A';
        setSelectedCity({
            name: suggestion.formatted_address,
            zipCode: zipCode,
        })
    }

    return (
        <div className='relative mx-2'>
            {/*Search input button*/}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for a city...'
                className="w-full px-4 py-2 border-2 border-grey-300 rouned-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/*Loading Indicator */}
            {isLoading && (
                <div className="absolute top-12 left-0 w-full bg-white border border-grey-300 rounded-md shadow-lg p-2">
                    Loading...
                </div>
            )}

            {/*Suggestions dropdown */}
            {!isLoading && suggestions.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white border-2 border-grey-300 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => {
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 hover:bg-grey-100 hover:cursor-pointer hover:scale-105"
                        >
                            {suggestion.formatted_address}
                        </div>
                    })}
                </div>
            )}

            {selectedCity && (
                <div className="mt-4">
                    <p>City: {selectedCity.name}</p>
                    <p>Zip Code: {selectedCity.zipCode}</p>
                </div>
            )}
        </div>
    )
}

export default CitySearchBox

