import React from "react";
import parse from 'html-react-parser';
import Chip from '@material-ui/core/Chip';
interface LabelPropertieProps{
    label:string;
    value:any;
    html?:boolean
}

export default function LabelPropertie(props:LabelPropertieProps){

    let val = props.value;

return(<div style={{paddingBottom:"15px"}} >
    
    <span style={{fontSize:"inherit", color:"#897979",display:"flex"}} >
{props.label}:</span>  { Array.isArray(props.value)?val.map((row:any, index:number)=>{
    return(<Chip
      
        label={row}
        
        color="primary"
        
       
      />)
}): (<span>{parse(""+props.value)}</span>)}
         </div>)
}