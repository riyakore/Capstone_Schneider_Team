import { useState } from 'react';
import ExpandedCard from "./ExpandedCard";
import RouteHeader from "./RouteHeader";
import RouteDetails from "./RouteDetails";
import BookingConfirmation from "./BookingConfirmation";

function Route({ route, handleToggle, isExpanded, setExpandedCard, onNavigateToHome, onNavigateToNextRoutes }) {
    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

    const handleCardClick = () => {
        handleToggle();
    };

    const handleBookClick = (e) => {
        e.stopPropagation();
        // Here you would typically make an API call to book the route
        // For now, we'll just show the confirmation dialog
        setShowBookingConfirmation(true);
    };

    return (
        <div
            onClick={handleCardClick}
            className="border border-gray-300 rounded-lg mb-4 bg-white shadow-sm cursor-pointer"
        >
            <RouteHeader route={route} />
            {isExpanded ? (
                <ExpandedCard
                    route={route}
                    onBackClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(null);
                    }}
                    onBookClick={handleBookClick}
                />
            ) : (
                <RouteDetails route={route} />
            )}

            {showBookingConfirmation && (
                <BookingConfirmation
                    onClose={() => setShowBookingConfirmation(false)}
                    onNavigateToHome={() => {
                        setShowBookingConfirmation(false);
                        onNavigateToHome();
                    }}
                    onNavigateToNextRoutes={() => {
                        setShowBookingConfirmation(false);
                        onNavigateToNextRoutes(route.dropStop?.city);
                    }}
                />
            )}
        </div>
    );
}

export default Route;