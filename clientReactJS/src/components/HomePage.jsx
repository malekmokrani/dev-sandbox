import React, { useEffect, useState,useRef } from "react";
import { Box } from '@mui/material';


import SearchItem from "./SearchItem"
import SearchForm from "./SearchForm"

export default function HomePage(props) {

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [adjustHeight, setHeigth] = useState("100vh");
  const [rawQuery, setRawQuery] = useState("");

  const footer = useRef(null);
  const msgSearch = useRef(null)
 
  const options = { threshold:1.0  }

  useEffect(() => {
  
    const observer = new IntersectionObserver(infiniteScrollHandler,options);
    
    if(footer.current)observer.observe(footer.current);
    return ()=>{
      if(footer.current)observer.disconnect();
    }
  
  }, [options]);



  const infiniteScrollHandler = (entries)=>
  {
  
    if (entries[0].intersectionRatio <= 0) return;
   
      if(page<totalPage){       
        setPage(page+1);
        footer.current.style.display = "none";
       
      }  
  } 
 
  useEffect(()=>{
   
    if(page!==0 && query!=="" )fetchData();
    
  }, [query, page]);

  useEffect(()=>{
    footer.current.style.display = "none";
    msgSearch.current.style.display = "none";
  }, []);



  const fetchData =()=>{

    fetch(`http://localhost:8080/api/search/${query}?page=${page}`).then(response =>{ 
     response.json().then(json => {
       setResults(results.concat(json.result));
       console.log(json);
       setHeigth('auto');
       setTotalPage(json.total_pages);
       footer.current.style.display = "block";
       msgSearch.current.style.display = "block";
     
   })
     
   }).catch(error=>console.error(error));
  
  }

  const handleKeyUp = (event) => {

    if (event.key === 'Enter'){
      setResults([]);
      setQuery(encodeURI(event.target.value));
      setRawQuery(event.target.value)
      setPage(1);
    }
  };
  
    return (
      <div className="container-md">
      <Box sx={{ display: 'flex' , height:adjustHeight, justifyContent:'center',alignItems:'center'}}>
         
        <SearchForm handleKeyUp={handleKeyUp} />

      </Box>
     
      <h2 ref={msgSearch} className="display-6">Search result for : <span className="fst-italic">{rawQuery}</span></h2>
      {
        results.map((elt, i) => <SearchItem key={i} dataset={elt}  />)
       }
       
        <div ref={footer}>&nbsp;</div>

    </div>
        );
}