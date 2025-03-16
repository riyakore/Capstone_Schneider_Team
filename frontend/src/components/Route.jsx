import ExpandedCard from "./ExpandedCard";
import RouteHeader from "./RouteHeader";
import RouteDetails from "./RouteDetails";

function Route({route, handleToggle, isExpanded, setExpandedCard}) {
    return(
        <div 
            onClick={() => handleToggle(route.id)}
            className="border border-gray-300 rounded-lg mb-4 bg-white shadow-sm cursor-pointer"
        >
            <RouteHeader route={route}/>
            <RouteDetails route={route}/>
            {isExpanded && (
                <ExpandedCard 
                    route={route}
                    onBackClick={(e) => {
                        e.stopPropogation();
                        setExpandedCard(null);
                    }}
                    onBookClick={(e) => {
                        e.stopPropogation();
                        alert(`Booking route with ID: ${route.id}`);
                    }}
                />
            )}

        </div>
    )
}

export default Route;