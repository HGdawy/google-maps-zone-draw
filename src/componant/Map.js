import React ,{ useState , useEffect } from 'react'
import { ReactDimmer } from "react-dimmer";
import { GoogleMap, useJsApiLoader , DrawingManager ,Polygon , InfoWindow } from '@react-google-maps/api';

import { getZones } from '../Utils/ApiCalls';
import {exportToJson} from '../Utils/ExportJson'
import { Modal } from './Modal';
import { EditModal } from './EditModale';


//map container style
const containerStyle = {
  width: '100%',
  height: '900px'
};

// center the map on Egypt 
const center = {
  lat: 30.033333,
  lng: 	31.233334,
};


// set drawing option
const options = {
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["polygon"]
  },
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

// libraries to load from google api
const libraries = ['drawing']

function Map() {
 
  //set the polygon path to state 
  const [paths, setPaths] = useState([]);
  // use state to control open and close the modal
  const [isModalOpen, setModal] = useState(false);
  // set state for that zones have loaded from getZone api
  const [loaded , setLoaded] = useState(false)
  // pass all zones to state
  const  [zones , setZones] = useState([])
 
  // pass map config 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: {/*add google API key here */},
    libraries:libraries
  })

  // get all zones from halan server
  useEffect(()=>{
    getZones().then(res=>setZones(res)).then(setLoaded(true))
  },[])

  // handel polygon darwing complete 
  const onPolygonComplete = React.useCallback(
    function onPolygonComplete(poly) {
      const polyArray = poly.getPath().getArray();
      let paths = [];
      polyArray.forEach(function(path) {
        paths.push({ lat: path.lat(), lng: path.lng() });
      });
      handleModal()     
      setPaths(paths)
      poly.setMap(null);
      },
    []
  );

   //handle model open and close rotation 
  const handleModal = () => {
    setModal((prevState) => !prevState);
  };

  //handle model close 
  const handelClose = (x)=>{
    setModal(x)
  }

  //pass posted zones to state
  const handelpostZone = (x,y,z)=>{
    setZones([...zones,{label:z,color:y,points:x}])
  }
  
  // delete zone from zones state
  const handelDelete = (x)=>{
    setZones(zones.filter((e)=>e.label !== x ? e : null))
  }

  // edit zone in zones state
  const handelEdit=(x,y,z)=>{
    setZones(zones.map((e)=>e.label === x ? {_id:e._id,color:y , label:z ,points:e.points}: e))
  }
  
  //change zones pathes that fetched from halan server to intgers  
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

    
  return isLoaded && loaded ? (
  <>
    
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
    >
      <DrawingManager
        drawingMode="polygon"
        options={options}
        onPolygonComplete={onPolygonComplete}
        editable
        draggable
      />
        {isModalOpen && <Modal handelClose={handelClose} paths={paths} handelpostZone={handelpostZone}  zones={zones}/>}
                        
      <ReactDimmer
      isOpen={isModalOpen}
      exitDimmer={setModal}
      zIndex={100}
      blur={1.5}
      />

    {/*map over zones and return a polygon & infoWindow element for each zone */}
     {zones.map((e,key)=>
      <div key={key*2.3}>     
         <Polygon                                                                      
            path={handlePointsInt(e.points)}
            onClick={()=>{handleModal()}}
            options={{
                fillColor: e.color,
                fillOpacity: 0.4,
                strokeColor: e.color,
                strokeOpacity: 1,
                strokeWeight: 1,
                clickable:true,
            }} 
          />
          <InfoWindow
            position={handlePointsInt(e.points)[0]}
            options={{
                visible:false
            }}
          >
            <div
              style={{
              border: `0px solid #ccc`,
              padding: 15
              }}
            >
              <h1>{e.label}</h1>
            </div>
          </InfoWindow>
            
      </div>)}

      
    </GoogleMap>
    {/*export zones in json file  */}
    <div 
      className="Emodal" 
      style={{
        textAlign:"center",
        display:"block",
        height:'80px',  
        Width: "10%",
        padding:"30px 0px",
        margin:"10px 30%"
      }}
      onClick={()=>exportToJson(zones)}
    >
      <h2>Export to json</h2>
    </div>
      {/*map over zones to create edit forms for each zone */}
    {zones.map((e,key)=>  
    <EditModal key={key*6.20}  paths={e} handelDelete={handelDelete} handelEdit={handelEdit}/>
    )}
    
    
  </>
  ) : <></>
}

export default React.memo(Map)