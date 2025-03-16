import { useState } from 'react';
import Header from './components/Header';
import ChooseLocationsPage from './pages/ChooseLocationsPage';
import RoutesPage from './pages/RoutesPage';
import MapInterface from './components/MapInterface';

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showRoutes, setShowRoutes] = useState(false);

  return (
    <div>
      <Header />
      {showRoutes ? (
        <RoutesPage />
      ) : (
        <ChooseLocationsPage
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      <MapInterface>
        
      </MapInterface>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setShowRoutes(false)}>Show Locations Page</button>
        <button onClick={() => setShowRoutes(true)}>Show Routes Page</button>
      </div>
    </div>
  );
}

export default App;
