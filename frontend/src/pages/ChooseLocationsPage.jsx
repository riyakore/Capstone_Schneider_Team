import {useState} from 'react';
import CalendarButton from '../components/CalendarButton';

function ChooseLocationsPage() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    /*
    <Header/>
    <Body/>
        <Choose route!>
        <Card>
            -><Dates>
            -><Origin>
            -><Stops>
            -><Dest>
            -> roundtrip?
            -> 
        <Map>
        <SearchButton>
    */

    return (
        <div className="bg-grey-300 border-t-4 border-grey-400 p-2">
            <div className="bg-white px-2 py-2">
                <div className="flex">
                    <p className="font-bold">From:</p> 
                    <CalendarButton date={startDate}/>
                    <span>{startDate}</span>
                    <p className="font-bold">To:</p>
                    <span>{endDate}</span>
                    <CalendarButton date={endDate}/>
                </div>
                <div className="py-2">
                    <p className="font-bold">Origin:</p>
                    <p className="font-bold">Destination:</p>
                </div>
            </div>
            
        </div>
    )
}

export default ChooseLocationsPage;