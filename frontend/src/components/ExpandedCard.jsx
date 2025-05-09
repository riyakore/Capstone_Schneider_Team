// ExpandedCard.jsx
import CommodityDetails from "./CommodityDetails";
import LocationDetails from "./LocationDetails";
import RateDetails from "./RateDetails";
import PossibleRoutes from "./PossibleRoutes";

function ExpandedCard({ route, onBackClick, onBookClick }) {
    return (
    <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border-t border-gray-200 p-2"
    >
        <LocationDetails route={route} />
        <RateDetails route={route} />
        <CommodityDetails route={route} />

        <div className="mt-4 flex gap-4">
            <button
                onClick={onBackClick}
                className="px-4 py-2 cursor-pointer rounded-full border-none bg-gray-300 text-gray-800"
            >
                Back
            </button>
            <button
                onClick={onBookClick}
                className="px-4 py-2 cursor-pointer rounded-full border-none bg-primary text-white"
            >
                Book Now
            </button>
        </div>

        <PossibleRoutes currentDestination={route.dropStop?.city} />
    </div>
    );
}

export default ExpandedCard;