
import React, { useEffect, useState } from 'react';
import {ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';
const  LayoutSwitcher = ({callback})=>{

    let trigger = false;
    const [gridLayout, setLayout] = useState(true);
    const [restoreState, setRestoreState] = useState(gridLayout);
    
    useEffect(()=>callback(gridLayout), [gridLayout])
    
  
    useEffect(()=>{
      
        window.addEventListener("resize", (event)=>{
            if(window.innerWidth<780){
                if(!trigger)
                {
                    trigger = true;
                    setLayout(false);
                }
            }else{
                if(trigger)
                {
                   
                    trigger = false;
                    setLayout(restoreState);
                }
            }
        });
     
    });


    const clickHandler = (value)=>{
        setRestoreState(value);
        setLayout(value);
    }


    return (<div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                <button onClick={()=>clickHandler(true)} 
                        className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${gridLayout ? "active" : ""}`} >
                    <ViewGridIcon width={32}  height={32} />
                </button>
                
                <button onClick={()=>clickHandler(false)} 
                        className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${gridLayout ? "" : "active"}`} >
                    <ViewListIcon width={32} height={32} />
                </button>
            </div>);
}


export default LayoutSwitcher;