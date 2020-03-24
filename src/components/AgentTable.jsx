import React from 'react';
import useGetData from "../hooks/useGetData";
import styled from 'styled-components';
import {useGetAllPoints,useGetSingleLatLng} from "../hooks/useGetLatLng";
const TableStyle=styled.table`
border-collapse: collapse; 
margin:auto;
margin-top:2%;
`

const FooterTdStyle=styled.td`
text-align:right;
background-color:#e6e6e6;
padding-top: 10px;
padding-bottom: 10px;
`
const THeadStyle=styled.thead`
    display:table-header-group;
    background-color:#cccccc;
`
    

const THeadCellStyle=styled.th`
text-align: left;
border:1pt solid #a6a6a6;
background-color:#e6e6e6;
padding-right: 20px; 
padding-top: 10px;
padding-bottom: 10px;
padding-left: 10px;
`
const TrStyle=styled.tr`
border-top: 1px ;
`
const TrGreen=styled.tr`
border-top: 1px ;
color:green;
`
const TrRed=styled.tr`
border-top: 1px ;
color:red;
`
const TdStyle=styled.td` 
 align:left;
 border-width: 1px 0;
 border-bottom:1pt solid black;
 padding-right: 20px; 
 padding-top: 10px;
 padding-bottom: 10px;
`

const AgentTable=(props)=>{
    let data=useGetData().sort((a,b)=>new Date(a.date) - new Date(b.date));
    let downing=useGetSingleLatLng("10 Downing st. London");
    let points=useGetAllPoints(data,downing);
    let distances=points.map(e=>calcCrow(e[0],e[1],downing[0],downing[1]));
    let minDistance=Math.min.apply(Math,distances);
    let maxDistance=Math.max.apply(Math,distances);
    let minIndex= distances.indexOf(minDistance);
    let maxIndex=distances.indexOf(maxDistance);
    let head=(
         <THeadStyle ><TrStyle ><THeadCellStyle>Agent ID</THeadCellStyle><THeadCellStyle>Country</THeadCellStyle><THeadCellStyle>Address</THeadCellStyle><THeadCellStyle>Date</THeadCellStyle></TrStyle></THeadStyle>
    )
    let table=[]
    for(let i=0;i<data.length;i++){
        let TrElement=TrStyle;
        if(i===maxIndex){
            TrElement=TrRed;
        }
        if(i===minIndex){
            TrElement=TrGreen;
        }
        table.push(
            <TrElement key={i}><TdStyle>{data[i]["agent"]}</TdStyle><TdStyle>{data[i]["country"]}</TdStyle><TdStyle>{data[i]["address"]}</TdStyle><TdStyle>{data[i]["date"]}</TdStyle></TrElement>
        )
    }
    return(
        <>
        <TableStyle>
            {head}
            <tbody>
            {table}
            </tbody>
            <tfoot>
                <TrStyle><FooterTdStyle colSpan={4}><span>{data.length} missions</span>   </FooterTdStyle></TrStyle>
            </tfoot>
        </TableStyle>
        
        </>
    )
}
function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      lat1 = toRad(lat1);
      lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
export default AgentTable;