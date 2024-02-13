import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'

const SelectFilter = ({ title, children }) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="flex justify-between mr-2 titleFilter items-center ">
                <h2 className="font-bold text-2xl  p-2">{title}</h2>
                <button onClick={() => setShow(show => !show)}>
                    {show ?
                        <ChevronUpIcon
                            width={32}
                            height={32}
                        /> :
                        <ChevronDownIcon
                            width={32}
                            height={32}
                        />
                    }
                </button>
            </div>
            <div>
                {show && children}
            </div>
        </>
    )
}

export default SelectFilter;

