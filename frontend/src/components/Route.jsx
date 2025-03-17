import ExpandedCard from "./ExpandedCard";
import RouteHeader from "./RouteHeader";
import RouteDetails from "./RouteDetails";

function Route({route, handleToggle, isExpanded, setExpandedCard}) {

    const handleCardClick = () => {
        handleToggle();
    };

    return (
        <div
        onClick={handleCardClick}
        className="border border-gray-300 rounded-lg mb-4 bg-white shadow-sm cursor-pointer"
        >
        <RouteHeader route={route} />
        <RouteDetails route={route} />
    
        {isExpanded && (
            <ExpandedCard
            route={route}
            onBackClick={(e) => {
                e.stopPropagation();
                setExpandedCard(null);
            }}
            onBookClick={(e) => {
                e.stopPropagation();
                alert(`Booking route with ID: ${route.load_id}`);
            }}
            />
        )}
        {/* {route.load_id} */}
        </div>
    );

    // return(
    //     <div 
    //         onClick={() => handleToggle(route.id)}
    //         className="border border-gray-300 rounded-lg mb-4 bg-white shadow-sm cursor-pointer"
    //     >
    //         <RouteHeader route={route}/>
    //         <RouteDetails route={route}/>
    //         {isExpanded && (
    //             <ExpandedCard 
    //                 route={route}
    //                 onBackClick={(e) => {
    //                     e.stopPropagation();
    //                     setExpandedCard(null);
    //                 }}
    //                 onBookClick={(e) => {
    //                     e.stopPropagation();
    //                     alert(`Booking route with ID: ${route.load_id}`);
    //                 }}
    //             />
    //         )}

    //     </div>
    // );
}

export default Route;