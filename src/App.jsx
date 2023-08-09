import { useEffect, useState } from "react";
import axios from 'axios'


function App() {
  const [data,setData]=useState({
    celcius:10,
    name:"Mumbai",
    humidity:10,
    speed:2

  })
  const [name,setName]=useState('');
  const[error,setError]=useState('');


    const handleClick=()=>{
      if(name !== ""){
        
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=aa0f8ecae6078acf9e96dced87e6fa0f&&units=metric`;
    axios.get(apiUrl)
    .then(res => {
      console.log(res.data);
      setData({...data,celcius:res.data.main.temp, name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed })
    })
    .catch(err => {
      if(err.response.status===404){
        setError("invalid city name")
      }
      else{
        setError('')
      }

      console.log(err)
    });
        

      }
    }

  return (
    <div className='container'>
      <div className="weather">
        <div className="search">
<input type="text " placeholder="Enter city" onChange={e => setName(e.target.value)}></input>
<button onClick={handleClick}>search</button>
        </div>
        <div className="error">
          <p>{error}</p>

        </div>
        <div className="winfo">
        {/* <img src="images/clear.png" alt="help" ></img> */}
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
            <div className="humidity">
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>

          </div>
          <div className="col"></div>
          <div className="wind" >
            <p>{Math.round(data.speed)}km/h </p>
            <p>Wind</p>
          </div>
</div>
        </div>
      </div>

    </div>

  );
}

export default App;
