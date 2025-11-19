// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [error, setError] = useState(null);
  const [emoji, setEmoji] = useState("");
  const { createCity, isLoading } = useCitiesContext();
  const handleSubmit = async function (e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate("/app");
  };
  useEffect(() => {
    if (!mapLat && !mapLng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`
        );
        if (!res.ok) throw new Error("failed fetching!");
        // const data = await res.json();
        // console.log(data);
        const { city, countryName, locality, countryCode } = await res.json();
        if (!city || !countryName || !locality || !countryName)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else."
          );
        setError(null);
        setCityName(city || locality || "");
        setCountry(countryName);
        setEmoji(convertToEmoji(countryCode));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);
  if (!mapLat && !mapLng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  return (
    <>
      {isLoadingGeocoding && <Spinner />}
      {!isLoadingGeocoding && error && <Message message={error} />}

      {!isLoadingGeocoding && !error && (
        <form
          className={`${styles.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            {/* <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            /> */}
            <DatePicker
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Add</Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
