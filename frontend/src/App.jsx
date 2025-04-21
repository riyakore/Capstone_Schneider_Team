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


// import { useState, useEffect } from 'react';
// import Header from './components/Header';
// import ChooseLocationsPage from './pages/ChooseLocationsPage';
// import RoutesPage from './pages/RoutesPage';
// import { getFavorites, saveFavorite, deleteFavorite } from './api/favorites';

// // change the format of the date
// function formatAsYYYYMMDD(dateString) {
//   const dateObj = new Date(dateString);
//   const year = dateObj.getFullYear();
//   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//   const day = String(dateObj.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

// function App() {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showRoutes, setShowRoutes] = useState(false);
//   const [routes, setRoutes] = useState([]);
//   const [users,       setUsers]       = useState([]);
//   const [currentUser, setCurrentUser] = useState("");
//   const [favorites, setFavorites]       = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/users/")
//     .then(r => r.json())
//     .then(arr => {
//       setUsers(arr);
//       /* pick first user as default if none chosen yet */
//       if (!currentUser && arr.length) setCurrentUser(arr[0].userid);
//     })
//     .catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (!currentUser) return;
//     getFavorites(currentUser)
//       .then(setFavorites)
//       .catch(console.error);
//   }, [currentUser]);

//   const handleSearch = async filters => {
//     const qp = new URLSearchParams();

//     // always pass origin/dest
//     if (filters.origin)      qp.append('origin', filters.origin);
//     if (filters.destination) qp.append('destination', filters.destination);

//     // dates → formatted
//     if (filters.start_date)  qp.append('start_date', formatAsYYYYMMDD(filters.start_date));
//     if (filters.end_date)    qp.append('end_date',   formatAsYYYYMMDD(filters.end_date));

//     // optional filters
//     if (filters.transport_mode)            qp.append('transport_mode', filters.transport_mode);
//     if (filters.capacity_type)             qp.append('capacity_type',  filters.capacity_type);
//     if (filters.min_weight)                qp.append('total_weight',   filters.min_weight);
//     if (filters.min_loaded_rpm)            qp.append('loaded_rpm',     filters.min_loaded_rpm);
//     if (filters.is_hazardous != null)      qp.append('is_hazardous',   filters.is_hazardous);
//     if (filters.is_high_value != null)     qp.append('is_high_value',  filters.is_high_value);
//     if (filters.is_temperature_controlled != null) qp.append('is_temperature_controlled', filters.is_temperature_controlled);

//     const res  = await fetch(`http://localhost:8000/api/search-loads/?${qp.toString()}`);
//     const data = await res.json();
//     setRoutes(data);
//     setShowRoutes(true);
//   };

//   const handleSaveFavorite = async favObj => {
//     if (!currentUser) return;
//     try {
//       const saved = await saveFavorite(currentUser, favObj);
//       setFavorites(f => [...f, saved]);
//     } catch (e) {
//       console.error("Failed to save favourite", e);
//     }
//   };

//   const handleDeleteFavorite = async favId => {
//     if (!currentUser) return;
//     await deleteFavorite(currentUser, favId);
//     setFavorites(f => f.filter(x => x.userid !== favId));
//   };

//   return (
//     <div>
//       <Header users={users} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
//       {showRoutes ? (
//         // Pass the routes to the routes page
//         <RoutesPage 
//         routes={routes} 
//         />
//       ) : (
//         // Pass handleSearch + date props to the choose page
//         <ChooseLocationsPage
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//           favorites={favorites}
//           onSearch={handleSearch}
//           onSaveFavorite={handleSaveFavorite}
//           onDeleteFavorite={handleDeleteFavorite}
//         />
//       )}
//     </div>
//   );

// }

// export default App;
