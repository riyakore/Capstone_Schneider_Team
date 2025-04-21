import { useState } from 'react';
import Header from './components/Header';
import ChooseLocationsPage from './pages/ChooseLocationsPage';
import RoutesPage from './pages/RoutesPage';
import MapInterface from './components/MapInterface';
// 

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showRoutes, setShowRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);

  const [originInput, setOriginInput] = useState("");

  const handleSearch = async (origin, destination) => {

    try {

      const queryParams = new URLSearchParams();
      if (origin) queryParams.append('origin', origin);
      if (destination) queryParams.append('destination', destination);

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
      <Header />
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
          originInput={originInput}
          setOriginInput={setOriginInput}
        />
      )}
    </div>
  );

}

export default App;
