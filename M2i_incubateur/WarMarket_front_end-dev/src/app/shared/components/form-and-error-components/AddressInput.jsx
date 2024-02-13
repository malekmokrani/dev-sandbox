import { Field } from 'formik';
import React, { useState, useEffect, useRef } from 'react'


import { useFormikContext } from "formik";



/**
 * Google address autocomplete input
 */
const AddressInput = ({
  props,
  placeholder = 'Address',


  handleAddress = () => console.log('handle address'),
}) => {    

  const apiKey =import.meta.env.VITE_REACT_GOOGLE_API_KEY
  const { setFieldValue } = useFormikContext();

  // stateful variable  for Google's Places Autocomplete Service
  const [autocomplete, setAutocomplete] = useState({ test: false })

  // stateful user query string
  const [input, setInput] = useState('')

  // stateful array of Google's predicted addresses
  const [predictions, setPredictions] = useState([])

  const predictionList = useRef()

  const getPlacesPostCodeById = async placeId =>
    new Promise((resolve, reject) => {
      if (!placeId) reject("placeId not provided")

      try {
        new window.google.maps.places.PlacesService(
          document.createElement("div")
        ).getDetails(
          {
            placeId,
            fields: ["address_components"],
          },
          details => {

            details?.address_components?.forEach(entry => {
              if (entry.types?.[0] === "route") {
                setFieldValue('street', entry.long_name);
              }
              if (entry.types?.[0] === "street_number") {
                setFieldValue('number', entry.long_name);

              }
              if (entry.types?.[0] === "locality") {
                setFieldValue('city', entry.long_name);


              }
              if (entry.types?.[0] === "country") {
                setFieldValue('country', entry.long_name);

              }
              if (entry.types?.[0] === "postal_code") {
                setFieldValue('postalCode', entry.long_name);

              }

            })
          }
        )
      } catch (e) {
        reject(e)
      }
    })


  useEffect(() => {
    loadGoogleMapsAPI(() => {
      setAutocomplete(new window.google.maps.places.AutocompleteService())

    })
  }, [])
  /**
   * @description create and load script element for Google's maps API
   * 
   * @param {Function} callback - callback after script is loaded
   */
  const loadGoogleMapsAPI = callback => {

    const googleScript = document.getElementById('googleMaps')

    if (!googleScript) {
      const script = document.createElement('script')

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.id = 'googleMaps'

      document.body.appendChild(script)

      script.onload = () => callback()
    }
  }

  // load Google's maps API then instantiate an instance of Google's Places autocomplete service


  /**
   * @description get array of predictions based on user query
   * 
   * @param {String} input - the user's address query
   */
  const getPredictions = input => {
    if (autocomplete.test === false) {
      setAutocomplete(new window.google.maps.places.AutocompleteService())




    }
    else {
      autocomplete.getPlacePredictions(
        { input },
        predictions => {
          if (predictions) {
            setPredictions(predictions.map(prediction => prediction))
          }
        }
      )
    }
  }

  // as the user types, get predictions only if there is a query
  useEffect(() => {
    if (input.length > 0) {
      getPredictions(input)
    }
  }, [input])

  /**
   * @description on click, set the selected address as the input value
   * 
   * @param {String} address - the user's selected address string
   */
  const selectAddress = address => setInput(address)

  /**
   * @description only show the list of predicted addresses if any
   * 	predictions exist and if the user's query is not an empty string,
   * 	otherwise hide the list
   * 
   * @return {Boolean} true/false - show or hide list of predictions
   */
  const showPredictions = () => {
    if (predictions.length === 0 || input.length === 0) {
      return false
    } else {
      if (predictions.includes(input)) {
        return false
      } else {
        return true
      }
    }
  }

  // on component mount, add a keydown event listener and remove on unmount
  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  /**
   * @description handle arrow key presses to move up and down
   * 	through the prediction list, only if the prediction list
   * 	exists
   * 
   * @param {KeyboardEvent} event - a keyboard event object containing 
   * 	information about the user interaction with the keyboard
   */
  const handleKeyDown = ({ code }) => {
    switch (code) {
      case 'ArrowUp':
        handleArrowUp()
        break
      case 'ArrowDown':
        handleArrowDown()
        break
      case 'Enter':
        handleEnter()
        break
    }
  }

  // if possible, focus the previous prediction, otherwise focus the text input
  const handleArrowUp = () => {
    if (predictionList.current) {
      if (document.activeElement.previousSibling) {
        document.activeElement.previousSibling.focus()
      } else {
        document.getElementById('autocomplete-address-input').focus()
      }
    }
  }

  // if possible, focus the next prediction
  const handleArrowDown = () => {
    if (predictionList.current) {
      if (document.activeElement.className !== 'prediction') {
        predictionList.current.childNodes[0].focus()
      } else {
        if (document.activeElement.nextSibling) {
          document.activeElement.nextSibling.focus()
        }
      }
    }
  }

  // set the current focused prediction as the selected address
  const handleEnter = () => {
    if (predictionList.current) {
      setInput(document.activeElement.childNodes[0].innerHTML)
    }
  }

  useEffect(() => handleAddress(input), [input])

  /**
   * return jsx
   */
  return (
    <div className="w-full">
      { }
      <div className="w-full" >
        <p className=' text-xs'>
        <Field
          type='text'
          id='autocomplete-address-input'
          className='rounded-none rounded-b-md mb-4 shadow-inner  w-48 text-xs'
          value={input.description}
          onChange={({ address = event.target.value }) => setInput(address)}
          className='rounded-none rounded-t-md mb-4 shadow-inner react-datepicker__input-container input  text-xs' noError
        />
</p>
      </div>

      <div className='justify-center w-full  grid-rows-1'>
        {
          showPredictions() &&
          <div className='predictions-container'>
            <div className='predictions-list' ref={predictionList}>
              {
                predictions.map((prediction, key) => {
                  return (
                    <div
                      
                      key={key}
                      className='w-full text-xs'
                      tabIndex='0'
                      onClick={() => {
                        selectAddress(prediction)
                        getPlacesPostCodeById(prediction.place_id)
                      }}
                    >
                      <div>   <p className='rounded-none rounded-b-md mb-4 shadow-inner'>{prediction.description}</p></div>
                    </div>

                  )
                })
              }
            </div>
          </div>
        }</div>
    </div>
  )
}

export default AddressInput