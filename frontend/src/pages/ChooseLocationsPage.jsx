import { useState } from "react";
import CalendarButton      from "../components/CalendarButton";
import CitySearchBox       from "../components/CitySearchBox";
import { FaLongArrowAltDown } from "react-icons/fa";
import { Switch }          from "@headlessui/react";
import { HeartIcon }       from "@heroicons/react/24/solid";

/* tiny toggle */
const Toggle = ({ checked, onChange }) => (
<div className="flex items-center gap-2 ml-auto">
    <Switch
    checked={checked}
    onChange={onChange}
    className={`relative inline-flex h-6 w-10 rounded-full transition-colors
                ${checked ? "bg-primary" : "bg-gray-300"}`}
    >
    <span className="sr-only">toggle</span>
    <span
        aria-hidden="true"
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition
                    ${checked ? "translate-x-4" : ""}`}
    />
    </Switch>
</div>
);

export default function ChooseLocationsPage({
    startDate,  setStartDate,
    endDate,    setEndDate,
    favorites   = [],
    onSearch,
    onSaveFavorite
}) {
    /* inputs */
    const [origin,        setOrigin]        = useState("");
    const [destination,   setDestination]   = useState("");
    const [includeOrig,   setIncludeOrig]   = useState(true);
    const [includeDest,   setIncludeDest]   = useState(true);
    const [radius,        setRadius]        = useState(30);

    /* filters */
    const [filtersOn,     setFiltersOn]     = useState(true);
    const [capacityType,  setCapacityType]  = useState("");
    const [haz,           setHaz]           = useState(false);
    const [hiVal,         setHiVal]         = useState(false);
    const [tempCtrl,      setTempCtrl]      = useState(false);
    const [minW,          setMinW]          = useState("");
    const [minRPM,        setMinRPM]        = useState("");

    const [saveFav,       setSaveFav]       = useState(false);

    /* helper */
    const flags = () => ({
        is_hazardous:              haz      ? true : null,
        is_high_value:             hiVal    ? true : null,
        is_temperature_controlled: tempCtrl ? true : null
    });

    /* search click */
    const runSearch = () => {
        const base = {
        origin:        includeOrig ? origin      : "",
        destination:   includeDest ? destination : "",
        start_date:    startDate,
        end_date:      endDate,
        radius
        };
        if (filtersOn) {
        Object.assign(base, {
            capacity_type:   capacityType,
            min_weight:      minW,
            min_loaded_rpm:  minRPM,
            ...flags()
        });
        }
        onSearch(base);

        if (saveFav && onSaveFavorite) {
        onSaveFavorite({
            origin:         base.origin,
            destination:    base.destination,
            capacity_type:  base.capacity_type   ?? "",
            min_weight:     base.min_weight      ?? 0,
            min_loaded_rpm: base.min_loaded_rpm  ?? 0
        });
        }
    };

    const quickSearch = fav =>
        onSearch({
        origin:         fav.origin,
        destination:    fav.destination,
        capacity_type:  fav.capacity_type   || "",
        min_weight:     fav.min_weight,
        min_loaded_rpm: fav.min_loaded_rpm
        });

    /* render */
    return (
        <div
        className="min-h-screen flex flex-col items-center p-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/schneider_truck.jpg')" }}
        >
        {/* ───── favourites banner ───── */}
        {favorites.length > 0 && (
            <div className="bg-white/90 px-4 sm:px-6 py-4 rounded-lg shadow-lg w-full max-w-3xl mb-4 sm:mb-6">
            <h3 className="font-semibold mb-3">Quick Favorites</h3>
            <div className="overflow-x-auto flex gap-4">
                {favorites.map(f => (
                <div key={f.id}
                    className="min-w-[260px] border border-gray-300 rounded-lg shadow px-4 py-3 shrink-0">
                    <div className="text-sm font-semibold mb-1">
                    {f.origin} → {f.destination}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                    {f.capacity_type || "Any"} • min wt {f.min_weight || "—"} • min RPM {f.min_loaded_rpm || "—"}
                    </div>
                    <button
                    onClick={() => quickSearch(f)}
                    className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-1.5 rounded-lg shadow">
                    Search
                    </button>
                </div>
                ))}
            </div>
            </div>
        )}

        {/* ───── main search card ───── */}
        <div className="bg-white bg-opacity-80 px-4 sm:px-10 py-6 sm:py-10 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">Search for Loads</h2>

            {/* dates */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-60 mb-8">
            <div className="flex flex-col items-center">
                <label className="font-semibold mb-1">From:</label>
                <CalendarButton selectedDate={startDate} setSelectedDate={setStartDate}/>
                <span className="mt-1">{startDate}</span>
            </div>
            <div className="flex flex-col items-center">
                <label className="font-semibold mb-1">To:</label>
                <CalendarButton selectedDate={endDate} setSelectedDate={setEndDate}/>
                <span className="mt-1">{endDate}</span>
            </div>
            </div>

            {/* origin */}
            <div className="mb-6">
            <label className="font-semibold block mb-2">Origin</label>
            <div className="flex items-center">
                <CitySearchBox query={origin} setQuery={setOrigin} className="flex-grow"/>
                <Toggle checked={includeOrig} onChange={() => setIncludeOrig(x=>!x)} />
            </div>
            </div>

            {/* radius */}
            <div className="flex items-center gap-4 mb-6">
            <FaLongArrowAltDown size={30}/>
            <input type="range" min={0} max={100} value={radius}
                    onChange={e => setRadius(+e.target.value)}
                    className="flex-1 accent-primary"/>
            <span className="w-12 text-right font-medium">{radius} mi</span>
            </div>

            {/* destination */}
            <div className="mb-6">
            <label className="font-semibold block mb-2">Destination</label>
            <div className="flex items-center">
                <CitySearchBox query={destination} setQuery={setDestination}/>
                <Toggle checked={includeDest} onChange={() => setIncludeDest(x=>!x)} />
            </div>
            </div>

            {/* filters */}
            <div className="mt-8">
            <div className="flex items-center mb-4">
                <h3 className="font-semibold text-lg">Additional Filters</h3>
                <Toggle checked={filtersOn} onChange={() => setFiltersOn(x=>!x)} className="ml-auto"/>
            </div>

            <div className={`space-y-6 ${filtersOn ? "" : "opacity-40 pointer-events-none"}`}>
                {/* capacity pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-medium mr-2">Capacity Type</span>
                {["Any","Power Only","Power Only Team"].map(opt => {
                    const active = capacityType === (opt === "Any" ? "" : opt);
                    return (
                    <button key={opt}
                            onClick={() => setCapacityType(opt === "Any" ? "" : opt)}
                            className={`px-3 sm:px-4 py-1 rounded-md border text-sm transition
                                        ${active ? "border-primary text-primary font-semibold"
                                                : "border-gray-300 text-gray-500"}`}>
                        {opt}
                    </button>
                    );
                })}
                </div>

                {/* item type pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-medium mr-2">Item Type</span>
                {[
                    { lbl:"Hazardous",            flag:haz,     set:setHaz },
                    { lbl:"High Value",           flag:hiVal,   set:setHiVal },
                    { lbl:"Temperature Controlled", flag:tempCtrl,set:setTempCtrl }
                ].map(({lbl,flag,set}) => (
                    <button key={lbl}
                            onClick={() => set(x=>!x)}
                            className={`px-3 sm:px-4 py-1 rounded-md border text-sm transition
                                        ${flag ? "border-primary text-primary font-semibold"
                                            : "border-gray-300 text-gray-500"}`}>
                    {lbl}
                    </button>
                ))}
                </div>

                {/* numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="font-medium block mb-1">Minimum Weight (lbs)</label>
                    <input type="number" min="0" value={minW}
                        onChange={e => setMinW(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter minimum weight"/>
                </div>
                <div>
                    <label className="font-medium block mb-1">Minimum Rate Per Mile</label>
                    <input type="number" min="0" step="0.01" value={minRPM}
                        onChange={e => setMinRPM(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter minimum RPM"/>
                </div>
                </div>
            </div>
            </div>

            {/* save favourite */}
            <div className="flex items-center mt-8 sm:mt-10 mb-4 sm:mb-6">
            <HeartIcon className={`w-6 h-6 mr-3 ${saveFav ? "text-primary" : "text-black"}`} />
            <h3 className="font-semibold text-lg">Save to My Favorites</h3>
            <Toggle checked={saveFav} onChange={() => setSaveFav(x=>!x)} className="ml-auto"/>
            </div>

            {/* button */}
            <div className="text-center mt-8 sm:mt-10">
            <button
                onClick={runSearch}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg shadow-md">
                Search
            </button>
            </div>
        </div>
        </div>
    );
}