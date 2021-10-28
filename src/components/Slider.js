import './Slider.css';
import React, { useState, useEffect } from 'react';
import GetObject from '../services/GetObjectService';

function Slider({ items }) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(true);

  function playStop() {
    setPlay(!play);
    console.log("play ", !play);
  }

  useEffect(() => {

    const fetchData = () => GetObject(items[count])
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    if (play) {
      fetchData();
      const id = setInterval(() => {
        setCount(c => c + 1);
      }, 3000);
      return () => clearInterval(id);
    }

  }, [items, play, count]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (item) {
    return (
      <div className="Slider" onClick={playStop} >
        <h1>{item.title}</h1>
      
      </div>
    );
  } else
    return null;
}

export default Slider;
