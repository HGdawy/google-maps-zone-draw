import React,{useState} from "react";
import './Modal.css'
import { postZones} from '../Utils/ApiCalls';


export const Modal = ( paths) => {
  // pass inputs value to state
  const [inputs, setInputs] = useState({zone:'', color: '#1a44c1'});
  // handel changes in input value
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  // post data to halan server and pass it to zones state
  const handleSubmit = async(e) => {
    e.preventDefault()
    await postZones(paths.paths,inputs.color,inputs.zone)
    paths.handelpostZone(paths.paths,inputs.color,inputs.zone)
    paths.handelClose(false)
  }
  
    return (
      <div className="modal">
        <div className="modal-header">
          
        </div>
        <div className="modal-body">
        <form onSubmit={handleSubmit}>
         <label>
          Zone Name :
          <input type="text" 
          name="zone"
          value={inputs.zone || ""} 
          onChange={handleChange}
          required
          />
          </label>
          <br></br>
          <label>
          zone color : 
          <input type="color" 
          name="color" 
          value={inputs.color} 
          onChange={handleChange}
          />
          </label>
          <br></br>
         <input type="submit"  />  
        </form>
        </div>
      </div>
    );
  };