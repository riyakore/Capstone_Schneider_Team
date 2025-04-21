import { useState } from "react";
import CalendarButton from "../components/CalendarButton";
import CitySearchBox from "../components/CitySearchBox";
import { FaLongArrowAltDown } from "react-icons/fa";
// import { Heart } from "react-icons/fa";
// import { AiFillHeart } from "react-icons/ai";

function ChooseLocationsPage({ startDate, setStartDate, endDate, setEndDate, onSearch }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [includeOrigin, setIncludeOrigin] = useState(true);
    const [includeDestination, setIncludeDestination] = useState(true);
    const [capacityType, setCapacityType] = useState("");
    const [hazardousOnly, setHazardousOnly] = useState(false);
    const [highValueOnly, setHighValueOnly] = useState(false);
    const [tempControlOnly, setTempControlOnly] = useState(false);

    // see if the exact same favorites is already there
    const existing = favorites.find(f =>
        f.origin === origin &&
        f.destination === destination &&
        f.transport_mode === (pickupOnly?"PickupOnly":"PickupDelivery")
    );

    const handleSearchClick = () => {
        onSearch({
            origin: includeOrigin ? origin : "",
            destination: includeDestination ? destination : "",
            start_date: startDate,
            end_date: endDate,
            capacity_type: capacityType,
            is_hazardous: hazardousOnly,
            is_high_value: highValueOnly,
            is_temperature_controlled: tempControlOnly,
        });
    };

    // Toggles between "Pickup Only" vs "Pickup/Delivery"
    const handleToggle = () => {
        setPickupOnly(!pickupOnly);
    };

    return (
        <div
        className="min-h-screen bg-cover bg-center flex justify-center p-4"
        style={{ backgroundImage: "url('/images/schneider_truck.jpg')" }}
        >
        {/* A semi‐transparent overlay to make text readable */}
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md w-full max-w-xl h-1/2 mt-18">
            <h2 className="text-2xl font-bold text-center mb-6">Search for Loads</h2>

            {/* Date Section */}
            <div className="flex flex-col items-center mb-6">
            <div className="flex gap-8 mb-4">
                <div className="flex flex-col items-center">
                <p className="font-bold mb-1">From:</p>
                <CalendarButton selectedDate={startDate} setSelectedDate={setStartDate} />
                <span className="mt-1">{startDate}</span>
                </div>
                <div className="flex flex-col items-center">
                <p className="font-bold mb-1">To:</p>
                <CalendarButton selectedDate={endDate} setSelectedDate={setEndDate} />
                <span className="mt-1">{endDate}</span>
                </div>
            </div>
            </div>

            {/* Location Section */}
            <div className="border-2 border-gray-300 rounded-md p-4 mb-6">
            {/* Origin + Toggle */}
            <div className="flex items-center mb-4">
                <p className="font-bold w-24">Origin:</p>
                <CitySearchBox query={origin} setQuery={setOrigin} />

                {/* Toggle for Pickup Only vs. Pickup/Delivery */}
                <div className="ml-4 flex items-center">
                <label className="mr-2 text-sm font-bold">
                    {pickupOnly ? "Pickup Only" : "Pickup/Delivery"}
                </label>
                <div
                    onClick={handleToggle}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer 
                    ${pickupOnly ? "bg-orange-500" : "bg-gray-300"}`}
                >
                    {/* Circle that slides left/right */}
                    <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200
                        ${pickupOnly ? "translate-x-6" : "translate-x-0"}`}
                    />
                </div>
                </div>
            </div>

            {/* Radius */}
            <div className="flex items-center mb-4">
                <FaLongArrowAltDown size={20} className="mr-2" />
                <p className="font-bold mr-2">Radius:</p>
                <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-16 px-2 py-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Destination */}
            <div className="flex items-center">
                <p className="font-bold w-24">Destination:</p>
                <CitySearchBox query={destination} setQuery={setDestination} />
            </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={handleSearchClick}
            >
                Search
            </button>
            </div>
        </div>
        </div>
    );
    }

export default ChooseLocationsPage;