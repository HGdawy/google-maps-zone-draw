import React from 'react'
import { Polygon, Marker} from '@react-google-maps/api';
import { getZones } from '../Utils/ApiCalls';
import { useState ,useRef ,useCallback , useEffect} from 'react';


const options = {
    
    polygonOptions: {
      fillColor: `#2196F3`,
      strokeColor: `#2196F3`,
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
      zIndex: 1
    }
  };


  const Polygons =( handleModal)=>{

  const  [zones , setZones] = useState([])
  // Store Polygon path in state
  const [path, setPath] = useState([]);

  const [paths , setPaths] = useState();
  const [colors , setColors]=useState();
  const [label, setLabel]=useState();

  

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
 

  useEffect(()=>{
    getZones().then(res=>setZones(res))
    
    },[])

    useEffect(() => {
    
    setColors(zones.map(p=>p.color))
    setLabel(zones.map(p=>p.label))
    
    }, [zones]);
    

  console.log(zones,colors,paths,label)
  
// Call setPath with new edited path


  // Bind refs to current Polygon and listenersF
 

  
  // Clean up refs
  

 

    return (
        <>
        
        
            <Polygon
                                                                                         
            paths={[{lat: '29.077674396596326', lng: '31.628841812499992'},{lat: '25.386112018183834', lng: '30.156673843749992'} , {lat: '25.881361326473616', lng: '32.83733790624999'}]}
           
            options={{
                fillColor: "#000",
                fillOpacity: 0.4,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 1,
                
            }} />
            
          
          
          
        
            

        </>
    )

  }

  export default Polygons