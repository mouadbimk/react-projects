import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8800/cities";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      const citites = state.cities.filter((city) => city.id !== action.payload);
      return { ...state, cities: [...citites] };
    case "city/loaded":
      return { ...state, currentCity: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown Action type!");
  }
}
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    // setIsLoading(true);
    dispatch({ type: "loading", payload: true });
    async function fetchCittes() {
      try {
        const res = await fetch(`${BASE_URL}`);
        if (!res) throw new Error("Cannot get data from server!");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch (err) {
        dispatch({ type: "rejected", payload: "Failed Fetching Cities" });
      } finally {
        dispatch({ type: "loading", payload: false });
        // setIsLoading(false);
      }
    }
    fetchCittes();
  }, []);
  async function getCity(id) {
    if (Number(id) === Number(currentCity.id)) return;
    // setIsLoading(true);
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res) throw new Error("Cannot get data from server!");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
      // setCurrentCity(data);
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    } finally {
      dispatch({ type: "loading", payload: false });
      // setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    // setIsLoading(true);
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) throw new Error("Cannot get data from server!");
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    } finally {
      dispatch({ type: "loading", payload: false });
      // setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading", payload: true });
    // setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.log(err);
      dispatch({ type: "rejected", payload: err.message });
    } finally {
      dispatch({ type: "loading", payload: false });
      // setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
