import  { useState, useEffect } from 'react';
import data from '../data/data';
export default function useGetData(){
  let [countryData,setCountryData]=useState([]);
  useEffect(()=>{
    setCountryData(data);
  },[]);
  return countryData;
}