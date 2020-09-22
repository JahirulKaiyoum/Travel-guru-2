import React, { useEffect, useState } from 'react';
import fakeHotels from '../../FakePlaces/fakeHotels';
import GoogleMap from '../Googlemap/GoogleMap';

import Hotel from '../Hotel/Hotel';

const SelectHotel = () => {

    const allhotels = fakeHotels;
    

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const hotelsList = allhotels.map(hotel => hotel);
        //.log(hotelsList);

        setHotels(hotelsList);

        
    }, [])
    
    return (


        <section>
            <div className="container">
                <div className="row">
                    <div className='col-md-6  align-items-center'>
                    {
                        hotels.map(hotel => <Hotel hotel={hotel}></Hotel>)
                    }
                    </div>
                    <div className='col-md-6'>
                    <GoogleMap></GoogleMap>
                    </div>
                </div>
            </div>
        
        </section>
            
            
        


    );
};

export default SelectHotel;
