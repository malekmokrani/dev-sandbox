import React, { useEffect, useState } from "react";
import { Box } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import SearchItem from "./SearchItem";
export default function SearchForm(props) {


    const [query, setQuery] = useState("")

    useEffect(()=>{

     
     
    },[]);


return (
<FormControl fullWidth sx={{ m: 1 , width:'50%',  borderRadius:'8px', padding:'3px'}} variant="standard">
<InputLabel htmlFor="standard-adornment-amount">Search  movies</InputLabel>
<Input 
  sx={{width:'100%'}}
  onKeyUp={props.handleKeyUp} 
  id="standard-adornment-amount"
 
  startAdornment={<InputAdornment position="end" placeholder="search movie"> 
</InputAdornment>}
/>
</FormControl>);

}