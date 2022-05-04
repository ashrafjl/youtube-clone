import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getVideosByCategory } from '../../redux/actions/videos.action';
import './Categories.css'

const keywords = [
  "All",
  "React Js",
  "Angular Js",
  "React Native",
  "Api",
  "Redux",
  "Music",
  "Algorithm",
  "Guitar",
  "Php",
  "Frontend",
  "Database",
  "Real Madrid",
  "Web Development",
  "Women"
]
const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All');

  const dispatch = useDispatch()
  const handleClick = (value)=>{
    setActiveElement(value)
    dispatch(getVideosByCategory())
  }
  return (
    <div className='categoriesBar'>
      {
        keywords.map((value,i)=>{
          return (<span key={i} onClick={()=> handleClick(value)} className={activeElement === value ? 'active' : ''}>{value}</span>)
        })
      }
    </div>
  )
}

export default CategoriesBar