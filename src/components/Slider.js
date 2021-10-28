import './Slider.css';
import React, { useState, useEffect } from 'react';
import GetObject from '../services/GetObjectService';

const slide_interval= 10000;

function Slider({ items }) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(100000);
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
          if(!result.primaryImage)
          {
            console.log('no image. skipping.')
            setCount(c => c + 1);
            return;
          }

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
      }, slide_interval);
      return () => clearInterval(id);
    }

  }, [items, play, count]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (item && play) {
    return (
      <div className="Slider" onClick={playStop} >
        <img src={item.primaryImage} alt={item.title} className="primaryImage"/>
      </div>
    );
  } else if (item && !play) {
    return (
      <div className="Slider" onClick={playStop} >
        <h1 className="title">{item.title}</h1>
          <img src={item.primaryImage} alt={item.title} className="primaryImage"/>
        <h2 className="creditLine">{item.creditLine}</h2>
        <h3 className="repository">{item.repository}</h3>
        <p className="dimensions">{item.dimensions}</p>
      </div>
    );
  } else
    return null;
}

export default Slider;
