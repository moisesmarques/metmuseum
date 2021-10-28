import './App.css';
import React, { useState, useEffect } from 'react';
import GetObjects from './services/GetObjectsService';
import Slider from './components/Slider';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    GetObjects()
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.objectIDs);
          console.log(result.objectIDs);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  },[])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="App">
          <Slider items={items}></Slider>
        </div>
      </div>
    );
  }
}

export default App;
