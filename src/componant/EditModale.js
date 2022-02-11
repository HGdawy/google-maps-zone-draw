import React,{useState} from "react";
import {  putZones ,deleteZone} from '../Utils/ApiCalls';
import'./EditModal.css'

export const EditModal = (zone) => {
  const [inputs, setInputs] = useState({zone:'', color: '#1a44c1'});

  //handel changes on input values
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
    }
  
    // change points from string to integers
  const handlePointsInt = (x)=>{
    let arr = [];
    if (x){
     x.reduce((c,{ lat: t, lng: g })=>{
       c.lat= Number(t)
       c.lng= Number(g)
       arr.push({lat:c.lat,lng:c.lng})
       return c
       },{lat:'0',lng:'0'})
    }
    return arr
  }

  //delete zone from state and fron db in halan server
  const handelDelete = async()=>{
    zone.paths._id && await deleteZone(zone.paths._id)
    zone.handelDelete(zone.paths.label)
  }

  //edit zone in state and server
  const handleSubmit = async(e) => {
    e.preventDefault()
    zone.paths._id && await putZones(handlePointsInt(zone.paths.points),inputs.color,inputs.zone,zone.paths._id)  
    zone.handelEdit(zone.paths.label,inputs.color,inputs.zone)
  }

        return (
      <div className="Emodal">
        <div className="Emodal-header">
         <h2> zone: {zone.paths.label} </h2>  
         <input  type="button" onClick={handelDelete} value={'delete'}/>
        </div>
        <div className="Emodal-body">
        <form onSubmit={handleSubmit}>
         <label>
          Zone Name :
          <input type="text" 
          name="zone"
          value={inputs.zone || ""} 
          onChange={handleChange}
          />
          </label>
          <br></br>
          <label>
          zone color : 
          <input type="color" 
          name="color" 
          value={inputs.color || ""} 
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