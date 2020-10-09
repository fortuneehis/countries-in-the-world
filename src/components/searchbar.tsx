import React, {useState, useEffect, useContext, useRef} from 'react';
import style from '../css/searchbar.module.css';
import {motion} from 'framer-motion';
import { CountryContext } from '../context/countryContext';


function SearchBar() {
    const[inputChange, setInputChange] = useState('')
    const limit = 12
    const {searchCountries, getCountries} = useContext(CountryContext)
    const inputRef = useRef<any>()

    useEffect(()=>{
      inputRef.current.focus()
    })

    useEffect(()=>{
      if(inputChange.length > 0) {
        searchCountries(inputChange,limit)
      } else {
        getCountries()
      }
    },[inputChange])

  return (
    <motion.div
        initial={{
            width: 0,
            x: -200,
            opacity: 0
        }} 
        animate={{
            width: '100%',
            x: 0,
            opacity: 1
        }}
        transition={{duration: .7}}
        className={style.container}>

        <motion.input
        ref={inputRef}
        value={inputChange}
        onChange={e=>setInputChange(e.target.value)}
        placeholder="France" 
        type="text" 
        className={style.input} />
    </motion.div>
  );
}

export default SearchBar;
