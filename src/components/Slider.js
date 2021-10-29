import './Slider.css';
import React, { useState, useEffect } from 'react';
import GetObject from '../services/GetObjectService';

function Slider({ items }) {

  const slide_interval = 10; // seconds

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedItem, setLoadedItem] = useState(null);
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(100000);
  const [play, setPlay] = useState(true);
  const [secs, setSecs] = useState(0);
  const [maxItems, setMaxItems] = useState(0);


  function playStop() {
    setPlay(!play);
    console.log("play ", !play);
  }

  // set maxItems
  useEffect(() => {
    if(items)
      setMaxItems(items.length);
  }, [items]);

  // search for next images
  useEffect(() => {
    if (!items[count])
      return;

    GetObject(items[count])
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.primaryImage) {
            console.log('image not found. skipping.');
            setCount(c => c < maxItems ? c + 1 : 0);
          } else {
            setIsLoaded(true);
            setLoadedItem(result);
            console.log('image found: ', result.primaryImage);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [items, count, maxItems]);

  // timer
  useEffect(() => {
    if (play) {
      const id = setInterval(() => {
        setSecs( s => s + 1)
      }, 1000);
      return () => clearInterval(id);
    }
  }, [play]);

  // check timer & load 
  useEffect(() => {
    if(secs >= slide_interval){
      setSecs(0);
      if(play){
        setItem(loadedItem);
        setCount(c => c < maxItems ? c + 1 : 0);
        console.log("image loaded: ", loadedItem.primaryImage);
      }
    } else
      console.log(secs);
  }, [secs, play, loadedItem, maxItems]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (item && play) {
    return (
      <div className="Slider" onClick={playStop} >
        <img src={item.primaryImage} alt={item.title} className="primaryImage" />
        <p className="source">{item.primaryImage} - current {count}, total {maxItems}</p>
        <p className="secs">{secs}</p>
      </div>
    );
  } else if (item && !play) {
    return (
      <div className="Slider" onClick={playStop} >
        <img src={item.primaryImage} alt={item.title} className="primaryImage" />
        <h1 className="title">{item.title}</h1>
        <h2 className="creditLine">{item.creditLine}</h2>
        <h3 className="repository">{item.repository}</h3>
        <p className="dimensions">{item.dimensions}</p>
        <p className="source">{item.primaryImage} - current {count}, total {maxItems}</p>
        <p className="secs">{secs}</p>
      </div>
    );
  } else
    return null;
}

export default Slider;
