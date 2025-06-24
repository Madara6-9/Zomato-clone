import React, { useEffect, useState } from 'react';
import welcome from '../images/welcome.jpg';
import arrow from '../images/right-arrow.png';
import { Link } from 'react-router-dom';
import Guest from './Guest';

type Restaurant = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

const Welcome = () => {
  const [rest, setRest] = useState<Restaurant[]>([]);

  const getRestaurants = async () => {
    const query = `
      [out:json];
      area["name"="Telangana"]["admin_level"="4"]->.searchArea;
      node["amenity"="restaurant"](area.searchArea);
      out center;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: query,
      });

      const data = await response.json();

      const result: Restaurant[] = data.elements.map((el: any) => ({
        id: el.id,
        name: el.tags?.name || 'Unnamed Restaurant',
        lat: el.lat,
        lon: el.lon,
      }));

      setRest(result);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)),url(${welcome})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="h-screen"
      >
        <div className="text-white text-center text-xl ml-64 pt-5">
          <Link to="/login">
            <button className="ml-96">Log in</button>
          </Link>
          <Link to="/signup">
            <button className="ml-9">Sign up</button>
          </Link>
          <Guest />
        </div>

        <div className="text-center text-white mt-36">
          <h1 className="text-6xl italic font-extrabold">Zomato clone</h1>
          <h1 className="text-4xl mt-7">
            Find the best restaurants, cafés<br /> around the World
          </h1>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl mt-7">Popular Restaurants in Telangana</h1>
        <h1 className="text-2xl mt-9 text-gray-600">
          From hidden gems to renowned names,<br />
          explore a curated list of restaurants across Telangana, powered by OpenStreetMap.
        </h1>
      </div>

      <div className="grid grid-cols-3">
        {rest.slice(0, 30).map((data, index) => (
          <Link
            key={index}
            to="/main"
            state={{ city: 'Telangana', lat: data.lat, lon: data.lon, name: data.name }}
          >
            <div className="flex shadow-lg rounded-xl w-80 items-center p-4 mt-20 ml-16 border border-spacing-1">
              <h1 className="text-xl truncate">{data.name}</h1>
              <img src={arrow} className="w-3 h-3 ml-4" alt="arrow" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Welcome;
