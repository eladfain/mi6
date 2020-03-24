import  { useState, useEffect } from 'react';

export  function useGetSingleLatLng(address){
    let [point,setPoint]=useState([]);
    useEffect(()=>{
      let escapeAddress=escape(address);
      let url="http://dev.virtualearth.net/REST/v1/Locations?q="+escapeAddress+
      "&output=json&key=At1fo2nCydSC7A6a8bvos7i1d8KEiedeDSieL1bPwyIXmfrqa2wChOhIUmHI9Kem"
      fetch(url).then(r=>r.json()).then(data=>setPoint(data.resourceSets[0].resources[0].geocodePoints[0].coordinates))
    },[address]);
    return point;
}

export  function useGetAllPoints(data,address){
    let [points,setPoints]=useState([]);
    useEffect(()=>{
        let promiceArray=[];
        for(let i in data){
          ((x)=>{
            let escapeAddresses=escape(data[x].address);
            promiceArray.push(fetch("http://dev.virtualearth.net/REST/v1/Locations?q="+escapeAddresses+
            "&output=json&key=At1fo2nCydSC7A6a8bvos7i1d8KEiedeDSieL1bPwyIXmfrqa2wChOhIUmHI9Kem").then(r=>r.json())) 
          })(i) 
        }
        Promise.all(promiceArray).then(t=>{
            let coordinationArray=t.map(e=>e.resourceSets[0].resources[0].geocodePoints[0].coordinates)
            setPoints(coordinationArray)
        })
       
       
    },[data]);
    return points;
}
