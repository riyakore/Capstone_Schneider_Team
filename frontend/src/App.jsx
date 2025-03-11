import { useState } from 'react'
import Header from './components/Header';
import ChooseLocationsPage from './pages/ChooseLocationsPage';
import RoutesPage from './pages/RoutesPage';

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div >
      <Header/>
      <ChooseLocationsPage 
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        />
    </div>
  )
}

export default App
