import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import placeholder from '../images/dish.jpg'; // local fallback image

const Details = () => {
  const location = useLocation();
  const data = location.state?.data;

  if (!data) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        ❌ No restaurant details available.
      </div>
    );
  }

  const {
    logo_photos,
    description,
    weighted_rating_value,
    cuisines,
    address,
    is_open,
  } = data;

  return (
    <>
      <Navbar />
      <hr />
      <div className="flex text-xs text-gray-500 pl-24 pt-3">
        <Link to="/main"><h1>Home</h1></Link>
        <h1 className="ml-2">/</h1>
        <Link to="/"><h1 className="ml-2">World</h1></Link>
      </div>

      <div className="pl-24 pt-3">
        <img
          src={logo_photos?.[0] || placeholder}
          alt="Restaurant"
          className="w-11/12 h-96 object-cover rounded-xl"
        />

        <div className="flex mt-3 items-center">
          <h1 className="text-4xl">{description || 'No description provided'}</h1>
          {weighted_rating_value && (
            <>
              <h1 className="bg-green-800 text-white w-10 rounded-lg p-2 font-semibold ml-6 text-center">
                {weighted_rating_value}
              </h1>
              <h1 className="ml-2 text-gray-600">Rating</h1>
            </>
          )}
        </div>

        <h1 className="text-gray-500 mt-2">
          {(cuisines?.length && cuisines.slice(0, 5).join(', ')) || 'No cuisines listed'}
        </h1>

        <h1 className="text-gray-400 mt-1">
          {address?.street_addr || 'Unknown street'}, {address?.city || 'Unknown city'}
        </h1>

        <h1 className={`mt-1 font-semibold ${is_open ? 'text-yellow-500' : 'text-red-500'}`}>
          {is_open ? 'Open now' : 'Not Open'}
        </h1>
      </div>
    </>
  );
};

export default Details;
