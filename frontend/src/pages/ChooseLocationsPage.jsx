import {useState, useEffect} from 'react';
import CalendarButton from '../components/CalendarButton';
import CitySearchBox from '../components/CitySearchBox';
import { FaLongArrowAltDown } from "react-icons/fa";
import MapInterface from '../components/MapInterface';

function ChooseLocationsPage() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [deliveryType, setDeliveryType] = useState("");
    const [radius, setRadius] = useState(30);

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
            <div className="bg-white px-2 py-2 rounded-sm">
                <p className="font-bold text-lg">Date</p>
                <div className="border-2 border-grey-500 rounded-md p-2">
                    <div className="flex">
                        <label className="px-2">
                            <input
                                type="radio"
                                value="pickup"
                                checked={deliveryType === "pickup"}
                                onChange={(e) => {setDeliveryType(e.target.value)}} 
                            />
                            Pick-up only
                        </label>
                        <label className="px-2">
                            <input
                                type="radio"
                                value="delivery"
                                checked={deliveryType === "delivery"}
                                onChange={(e) => {setDeliveryType(e.target.value)}} 
                            />
                            Pick-up / Delivery
                        </label>
                    </div>
                    <div className="flex">
                        <div className="flex mx-2">
                            <p className="font-bold">From:</p> 
                            <CalendarButton selectedDate={startDate} setSelectedDate={setStartDate}/>
                            <p className={`${startDate ? '' : 'mx-12'}`}>{startDate}</p>
                        </div>
                        <div className="flex mx-2">
                            <p className="font-bold">To:</p>
                            <CalendarButton selectedDate={endDate} setSelectedDate={setEndDate}/>
                            <span>{endDate}</span>
                        </div>
                   </div>
                </div>
                <p className="font-bold text-lg">Location</p>
                <div className="p-2 border-2 border-grey-500 rounded-md">
                    <div className="flex mb-1">
                        <p className="font-bold">Origin:</p>
                        <CitySearchBox/>
                    </div>
                    <div className="flex">
                        <FaLongArrowAltDown size={30}/>
                        <p className="font-bold mx-2">Radius</p>
                        <input
                            type="number"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            className="w-1/5 px-4 py-2 border-2 border-grey-300 rouned-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex mt-1">
                        <p className="font-bold">Destination:</p>
                        <CitySearchBox/>
                    </div>
                </div>
            </div>
            <MapInterface></MapInterface>
           <button className="bg-primary w-1/2 rounded-lg mt-5 text-white font-bold text-xl hover:cursor-pointer hover:scale-105 duration-[0.1s]">Search</button>
        </div>
    )
}

export default ChooseLocationsPage;