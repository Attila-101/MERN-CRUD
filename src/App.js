import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [competitorName, setCompetitorName] = useState('');
  const [runningClub, setRunningClub] = useState('');
  const [distance, setDistance] = useState(0);
  const [newDistance, setNewDistance] = useState('');
  const [competitorList, setCompetitorList] = useState([])

  useEffect(() => {
    axios.get("https://mern-competitor-registration.herokuapp.com/read").then((response) => {
      setCompetitorList(response.data);
    })
  }, [])

  //create new item in database
  const addToDatabase = () => {
    axios.post("https://mern-competitor-registration.herokuapp.com/insert", {
      competitorName: competitorName,
      runningClub: runningClub,
      distance: distance,
    });
  };

  //update distance of an item 
  const updateDistance = (id) => {
    axios.put("https://mern-competitor-registration.herokuapp.com/update", {
      id: id, 
      newDistance: newDistance,
    })
  };

  //delete competitor
  const deleteCompetitor = (id) => {
    axios.delete(`https://mern-competitor-registration.herokuapp.com/delete/${id}`, {
    });
  }

  //refresh the page 
  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="App">
    <h1>The Run as far as you like race</h1>
    <h2>Competitor Registration</h2>
    <label>Competitor name: </label>
    <input type="text" 
    onChange={(event) => {setCompetitorName(event.target.value);}}/>
    <label>Running Club: </label>
    <input type="text" 
    onChange={(event) => {setRunningClub(event.target.value);}}/>
    <label>Distance: </label>
    <input type="number" 
    onChange={(event) => {setDistance(event.target.value);}}/>
    <button className='registerButton' onClick={() => { addToDatabase(); refreshPage();}}>Register</button>
    <h2>List of competitors</h2>

      {competitorList.map((val, key) => {
        return <div key={key} className='competitor'>
                <h3>Competitor name: {val.competitorName}</h3>
                <h4>Running Club: {val.runningClub}</h4>
                <h3>Distance: {val.distance} km</h3>
                <input type="number" 
                placeholder='type new distance'
                onChange={(event) => {setNewDistance(event.target.value);
                }}
                />
                <button onClick={() => { updateDistance(val._id); refreshPage();}}>Update</button>
                <button onClick={() => { deleteCompetitor(val._id); refreshPage();}}>Delete</button>
        </div>
      })};
    </div>
  );
}

export default App;
