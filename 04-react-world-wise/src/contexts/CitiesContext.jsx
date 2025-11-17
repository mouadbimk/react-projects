import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8800/cities";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    async function fetchCittes() {
      try {
        const res = await fetch(`${BASE_URL}`);
        if (!res) throw new Error("Cannot get data from server!");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
        throw new Error("failed fetching");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCittes();
  }, []);
  async function getCity(id) {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res) throw new Error("Cannot get data from server!");
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
      throw new Error("failed fetching");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCitiesContext() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, useCitiesContext };
