import { useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";
const key = "AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
const baseURL1 =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry";
const baseURL2 =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
const baseURL3 =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";

function App() {
  const [input, setInput] = useState("");
  const [attractions, setAttractions] = useState({ array: [] });
  const findAttractions = (lonlat) => {
    axios.get(baseURL2 + "&location=" + lonlat).then(({ data }) => {
      console.log(data);
      // setAttractions({ array: data.results });
      getImgs(
        data.results.map((a) => a.photos[0].photo_reference),
        data.results
      );
    });
  };

  const getImgs = async (refs, attractions) => {
    // console.log(refs);
    const promises = refs.map((ref) => {
      const url = baseURL3 + "&photo_reference=" + ref;
      // return axios.get(url);
      return url;
    });

    const newState = {
      array: attractions.map((a, i) => {
        a.url = promises[i];
        return a;
      }),
    };
    console.log(newState);
    setAttractions(newState);
    // const photoURLS = await Promise.all(promises);
    // console.log(photoURLS);
  };

  const handleSearch = () => {
    axios
      .get(`${baseURL1}&key=${key}&input=${input}`)
      .then((response) => {
        console.log(response.data.candidates);
        const { lng, lat } = response.data.candidates[0].geometry.location;
        findAttractions(`${lat},${lng}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="App">
        <input onChange={({ target: { value } }) => setInput(value)} />
      </div>
      <button onClick={handleSearch}>SEARCH</button>
      {attractions.array.map((attraction) => (
        <>
          <Card
            url={attraction.url}
            name={attraction.name}
            rating={attraction.rating}
          />
        </>
      ))}
    </>
  );
}

export default App;
