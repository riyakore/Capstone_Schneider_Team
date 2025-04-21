import { useState } from 'react';

function BookingConfirmation({ onClose, onNavigateToHome, onNavigateToNextRoutes, nextRoutes }) {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div 
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Booking Confirmed!</h2>
                <p className="mb-6">Your route has been successfully booked. What would you like to do next?</p>
                
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onNavigateToNextRoutes}
                        className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                    >
                        View Next Possible Routes
                    </button>
                    <button
                        onClick={onNavigateToHome}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
                    >
                        Return to Search
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingConfirmation; 