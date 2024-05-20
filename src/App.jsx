import { useState } from "react";
import "./App.css";
import { WiFog } from "react-icons/wi";
import { BsGeoAlt } from "react-icons/bs";
import { WiNightAltCloudyGusts } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { AiOutlineEye } from "react-icons/ai";
import { WiSmallCraftAdvisory } from "react-icons/wi";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [close, setClose] = useState(true);

  const searchCity = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City Name not found, Please chack your input....");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  };

  const closeTab = () => {
    setClose(false);
  };

  return (
    <>
      <div className="card-bg pt-2 pl-2 rounded-lg mb-4">
        <div className="grid grid-cols-3 gap-0">
          <div className="flex gap-2 font-bold text-blue-400">
            <WiFog className="w-8 h-8" />
            <h1 className="mt-1">WeatherCast</h1>
          </div>

          <form onSubmit={searchCity} className="mb-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search city/town ...."
                className="p-2 pl-12 capitalize rounded-md outline-none searchbar-bg"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {error ? (
        <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8">
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-red-600 font-semibold">
                  Error Occured
                </span>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
            <button className="self-start text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  onClick={closeTab}
                />
              </svg>
            </button>
          </div>
        </div>
      ) : typeof weather.main !== "undefined" ? (
        <div>
          <div className="card-bg p-4 rounded-lg mb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Current Weather</p>

              <div className="flex gap-1 order-last">
                <BsGeoAlt className="text-gray-400 mt-1  w-5 h-5" />
                <span className="">{weather.name}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <p className="text-4xl mt-8">{weather.main.humidity} </p>
              <span className="text-sm mt-8 text-blue-300">°F</span>
              <h1 className="text-2xl capitalize mt-8 pl-4">
                {weather.weather[0].description}
              </h1>
            </div>
          </div>

          <div className="rounded-lg mb-4">
            <div className="flex gap-4">
              <div className="card-bg pt-5 pb-4 pl-4 pr-24 rounded-md">
                <div className="flex gap-2">
                  <WiNightAltCloudyGusts className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Tempreture</p>
                </div>
                <h1 className="text-2xl capitalize mt-2 pl-2">
                  {weather.main.temp}
                  <span> °C</span>
                </h1>
              </div>

              <div className="card-bg pt-5 pb-4 pl-4 pr-28 rounded-md">
                <div className="flex gap-2">
                  <WiDayWindy className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Wind</p>
                </div>
                <h1 className="text-2xl mt-2 pl-2">
                  {weather.wind.speed}
                  <span> mph</span>
                </h1>
              </div>

              <div className="card-bg pt-5 pb-4 pl-4 pr-28 rounded-md">
                <div className="flex gap-2">
                  <WiHumidity className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Humidity</p>
                </div>
                <h1 className="text-2xl capitalize mt-2 pl-2">
                  {weather.main.humidity} <span>°F</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="rounded-lg mb-4">
            <div className="flex gap-4">
              <div className="card-bg pt-5 pb-4 pl-4 pr-28 rounded-md">
                <div className="flex gap-2">
                  <AiOutlineEye className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Visibility</p>
                </div>
                <h1 className="text-2xl mt-2 pl-2">
                  {weather.visibility} <span>mi</span>
                </h1>
              </div>

              <div className="card-bg pt-5 pb-4 pl-4 pr-32 rounded-md">
                <div className="flex gap-2">
                  <AiOutlineEye className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Pressure</p>
                </div>
                <h1 className="text-2xl mt-2 pl-2">
                  {weather.main.pressure} <span> in</span>
                </h1>
              </div>

              <div className="card-bg pt-5 pb-4 pl-4 pr-28 rounded-md">
                <div className="flex gap-2">
                  <WiSmallCraftAdvisory className="text-gray-500 text-2xl" />
                  <p className="text-gray-500">Base</p>
                </div>
                <h1 className="text-2xl capitalize mt-2 pl-2">
                  {weather.base}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
