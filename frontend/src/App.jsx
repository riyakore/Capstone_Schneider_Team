import { useState } from 'react';
import Header from './components/Header';
import ChooseLocationsPage from './pages/ChooseLocationsPage';
import RoutesPage from './pages/RoutesPage';

// helper function to convert the date
function formatAsYYYYMMDD(dateString) {
  // Create a Date object from the string
  const dateObj = new Date(dateString);
  // Extract year, month, and day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [currentUser, setCurrentUser] = useState("u1");

  const handleSearch = async (origin, destination) => {
    try {
      const queryParams = new URLSearchParams();
      if (origin) queryParams.append('origin', origin);
      if (destination) queryParams.append('destination', destination);
      // added the start and end dates to the query search
      if (startDate) queryParams.append('start_date', formatAsYYYYMMDD(startDate));
      if (endDate)   queryParams.append('end_date', formatAsYYYYMMDD(endDate));

      console.log("Origin:", origin);
      console.log("Destination:", destination);
      console.log("Formatted Start Date:", formatAsYYYYMMDD(startDate));
      console.log("Formatted End Date:", formatAsYYYYMMDD(endDate));

      // we get the response from the backend search
      const res = await fetch(`http://localhost:8000/api/search-loads/?${queryParams.toString()}`);
      const data = await res.json();

      // Store the fetched routes in state
      setRoutes(data);

      // Show the routes page
      setShowRoutes(true);
    } 
    
    catch (error) {
      console.error("Search error:", error);
    }
    
  };

  return (
    <div>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {showRoutes ? (
        // Pass the routes to the routes page
        <RoutesPage routes={routes} />
      ) : (
        // Pass handleSearch + date props to the choose page
        <ChooseLocationsPage
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onSearch={handleSearch}
        />
      )}
    </div>
  );

}

export default App;
