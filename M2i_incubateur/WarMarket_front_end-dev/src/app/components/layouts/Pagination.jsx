
import React from 'react'
import { useState , useLayoutEffect } from 'react';


/**
 *      @Param pageable { 
 *                          current // current index (Page),
                            size: nbrItems/ Page,
                            nbrItems: nbr  Total items ,
                            totalPages: nbr total pages,
                            first: true,
                            last: true
                        }
 
 
        @param callback(pageNum)
                got to page pageNum
                        * 
 */

const Pagination = (props) => {

    let { current, totalPages, first, last } = props.pageable
    const [step , setStep] = useState(10);
    
    let pages = [];
    useLayoutEffect(() => {
        window.addEventListener("resize" , (e)=>{
            if(window.innerWidth<780)setStep(4);        
            else setStep(10);
        })
      }, []);

    let begin = 1 + step * Math.floor(current / step);
    for (let i = begin; i < begin + step; i++) {
        if (i > totalPages) break;
        pages.push(i);
    }

    const btnEnable = 'mr-2 h10';
    const btnDisable = 'text-gray-300 mr-2 h-10';
    const currentPage = 'font-bold ml-2 mr-2 border-2 border-gray-600 w-10 h-10';
    const pageNum = "ml-2 mr-2 border-2 w-10 h-10";


    return (first && last) ? (<></>):(<div className='flex justify-center'>
        <button disabled={first} className={first ? btnDisable : btnEnable} onClick={(event) =>  props.callback(current - 1)}>Précédent</button>
            {pages.map((elt, i) => {
                return (<button className={elt - 1 == current ? currentPage : pageNum} key={elt} onClick={(event) =>  props.callback(elt-1)}>{elt}</button>)
            })}
        <button disabled={last} className={last ? btnDisable : btnEnable} onClick={(event) =>  props.callback(current + 1)}>Suivant</button>
    </div>);
}


export default Pagination;