import { useState, useEffect } from "react";
import Header             from "./components/Header";
import ChooseLocationsPage from "./pages/ChooseLocationsPage";
import RoutesPage          from "./pages/RoutesPage";
import { getFavorites, saveFavorite, deleteFavorite } from "./api/favorites";

/* util: Thu May 08 2025 → 2025‑05‑08 */
const yyyymmdd = s => (s ? new Date(s).toISOString().slice(0, 10) : "");

export default function App() {
  /* dates */
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]   = useState("");

  /* view toggle + data */
  const [showRoutes, setShowRoutes] = useState(false);
  const [routes,     setRoutes]     = useState([]);

  /* users + favourites */
  const [users,       setUsers]       = useState([]);
  const [currentUser, setCurrentUser] = useState("");     // userid!
  const [favorites,   setFavorites]   = useState([]);

  /* fetch users once */
  useEffect(() => {
    fetch("http://localhost:8000/api/users/")
      .then(r => r.json())
      .then(arr => {
        setUsers(arr);
        if (!currentUser && arr.length) setCurrentUser(arr[0].userid);
      })
      .catch(console.error);
  }, []);

  /* fetch favourites when user changes */
  useEffect(() => {
    if (!currentUser) return;
    getFavorites(currentUser).then(setFavorites).catch(console.error);
  }, [currentUser]);

  /* search */
  const handleSearch = async filt => {
    const qp = new URLSearchParams();
    if (filt.origin)                qp.append("origin",        filt.origin);
    if (filt.destination)           qp.append("destination",   filt.destination);
    if (filt.start_date)            qp.append("start_date",    yyyymmdd(filt.start_date));
    if (filt.end_date)              qp.append("end_date",      yyyymmdd(filt.end_date));
    if (filt.capacity_type)         qp.append("capacity_type", filt.capacity_type);
    if (filt.min_weight)            qp.append("total_weight",  filt.min_weight);
    if (filt.min_loaded_rpm)        qp.append("loaded_rpm",    filt.min_loaded_rpm);
    if (filt.is_hazardous != null)  qp.append("is_hazardous",  filt.is_hazardous);
    if (filt.is_high_value != null) qp.append("is_high_value", filt.is_high_value);
    if (filt.is_temperature_controlled != null)
      qp.append("is_temperature_controlled", filt.is_temperature_controlled);

    const res  = await fetch(`http://localhost:8000/api/search-loads/?${qp}`);
    const data = await res.json();
    setRoutes(data);
    setShowRoutes(true);
  };

  /* save / delete favourite */
  const handleSaveFavorite = fav =>
    currentUser &&
    saveFavorite(currentUser, fav)
      .then(saved => setFavorites(f => [...f, saved]))
      .catch(e => console.error("Failed to save favourite", e));

  const handleDeleteFavorite = favId =>
    currentUser &&
    deleteFavorite(currentUser, favId).then(() =>
      setFavorites(f => f.filter(x => x.id !== favId))
    );

  /* render */
  return (
    <div>
      <Header users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {showRoutes ? (
        <RoutesPage routes={routes} />
      ) : (
        <ChooseLocationsPage
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate}     setEndDate={setEndDate}
          favorites={favorites}
          onSearch={handleSearch}
          onSaveFavorite={handleSaveFavorite}
          onDeleteFavorite={handleDeleteFavorite}
        />
      )}
    </div>
  );
}