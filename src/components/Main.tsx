import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Menubar from './Menubar';
import { useLocation } from 'react-router-dom';

type Restaurant = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

const Main = () => {
  const location = useLocation();
  const [rest, setRest] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState('');
  const city = location.state?.city || 'Hyderabad'; // default fallback

  const getRestaurants = async () => {
    const query = `
      [out:json];
      area["name"="${city}"]["admin_level"];
      node["amenity"="restaurant"](area);
      out;
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
      console.error('❌ Failed to fetch with Overpass:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [city]); // re-fetch if city changes

  return (
    <div>
      <Navbar city={city} setSearch={setSearch} />
      <Menubar />
      <Home rest={rest} city={city} search={search} />
    </div>
  );
};

export default Main;
