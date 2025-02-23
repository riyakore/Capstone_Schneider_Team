import {useState} from 'react';
import CalendarModal from '../modal/CalendarModal';

function ChooseLocationsPage() {

    /*
    <Header/>
    <Body/>
        <Choose route!>
        <Card>
            -><Dates>
            -><Origin>
            -><Stops>
            -><Dest>
        <Map>
        <SearchButton>
    */

    return (
        <div className="bg-grey-300 border-t-4 border-grey-400 p-2">
            <div className="bg-white px-2 py-1">
                <p className="font-bold">From</p> 
                <CalendarModal/>
            </div>
        </div>
    )
}

export default ChooseLocationsPage;