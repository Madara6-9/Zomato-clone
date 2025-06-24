import React from 'react';
import dish from '../images/dish.jpg';
import { Link } from 'react-router-dom';

interface restProp {
  rest: any[];
  city: any;
  search: any;
}

const Home = ({ rest, city, search }: restProp) => {
  console.log('📦 Restaurants:', rest);

  const filtered = rest
    .filter((data: any) => {
      // Check city only if available
      if (city && data?.address?.city) {
        return data.address.city.toLowerCase().includes(city.toLowerCase());
      }
      return true;
    })
    .filter((data: any) => {
      return data.name?.toLowerCase().includes(search?.toLowerCase());
    });

  return (
    <div className="p-4 pl-20">
      <h1 className="font-semibold text-3xl mb-4">
        Best Food in {city || 'your area'}
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((data: any, index: number) => (
          <Link
            to="/details"
            state={{
              data,
              city: data?.address?.city || city || 'Unknown',
            }}
            key={data.id || index}
          >
            <div className="max-w-xs rounded-xl overflow-hidden shadow-sm mt-4 p-4 border border-gray-200">
              <img
                className="w-full rounded-2xl h-60 object-cover"
                src={
                  data.food_photos?.[0] ||
                  data.store_photos?.[0] ||
                  dish
                }
                alt={data.name}
              />
              <div className="py-4">
                <div className="font-semibold text-lg mb-2">
                  {data.name || 'Unnamed Restaurant'}
                </div>
                <p className="text-gray-500 text-sm">
                  {data?.cuisines?.slice(0, 2)?.join(', ') || 'Cuisine info unavailable'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
