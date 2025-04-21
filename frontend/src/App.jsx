import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChooseLocationsPage from './pages/ChooseLocationsPage';
import RoutesPage from './pages/RoutesPage';
import { getFavorites, saveFavorite, deleteFavorite } from './api/favorites';

// change the format of the date
function formatAsYYYYMMDD(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [currentUser, setCurrentUser] = useState("u1");
  const [favorites, setFavorites]       = useState([]);

  useEffect(() => {
    getFavorites(currentUser)
      .then(json => setFavorites(json))
      .catch(console.error);
  }, [currentUser]);

  const handleSearch = async filters => {
    const qp = new URLSearchParams();

    // always pass origin/dest
    if (filters.origin)      qp.append('origin', filters.origin);
    if (filters.destination) qp.append('destination', filters.destination);

    // dates → formatted
    if (filters.start_date)  qp.append('start_date', formatAsYYYYMMDD(filters.start_date));
    if (filters.end_date)    qp.append('end_date',   formatAsYYYYMMDD(filters.end_date));

    // optional filters
    if (filters.transport_mode)            qp.append('transport_mode', filters.transport_mode);
    if (filters.capacity_type)             qp.append('capacity_type',  filters.capacity_type);
    if (filters.min_weight)                qp.append('total_weight',   filters.min_weight);
    if (filters.min_loaded_rpm)            qp.append('loaded_rpm',     filters.min_loaded_rpm);
    if (filters.is_hazardous != null)      qp.append('is_hazardous',   filters.is_hazardous);
    if (filters.is_high_value != null)     qp.append('is_high_value',  filters.is_high_value);
    if (filters.is_temperature_controlled != null) qp.append('is_temperature_controlled', filters.is_temperature_controlled);

    const res  = await fetch(`http://localhost:8000/api/search-loads/?${qp.toString()}`);
    const data = await res.json();
    setRoutes(data);
    setShowRoutes(true);
  };

    const handleSaveFavorite = async (filterObj) => {
      const saved = await saveFavorite(currentUser, filterObj);
      setFavorites(f => [...f, saved]);
    };

    const handleDeleteFavorite = async (favId) => {
      await deleteFavorite(currentUser, favId);
      setFavorites(f => f.filter(x => x.id !== favId));
    };

  return (
    <div>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {showRoutes ? (
        // Pass the routes to the routes page
        <RoutesPage 
        routes={routes} 
        />
      ) : (
        // Pass handleSearch + date props to the choose page
        <ChooseLocationsPage
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          favorites={favorites}
          onSearch={handleSearch}
          onSaveFavorite={handleSaveFavorite}
          onDeleteFavorite={handleDeleteFavorite}
        />
      )}
    </div>
  );

}

export default App;
