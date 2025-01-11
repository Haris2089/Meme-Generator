import './Form.css'
import React, { useState } from 'react'
import memes from './data.js'

export default function Form(){

    const [data, setImg] = React.useState({
        topText: '',
        bottomText: '',    
        img: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemeImages, setData] = React.useState([])

    useState(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then (response => response.json())
            .then(response => setData(response.data.memes))
            .catch(error => console.error("Error fetching memes:", error));
        }, [])


    function getMemeImg(e){
        e.preventDefault()
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)

        const url = allMemeImages   [randomNumber].url
        setImg(prevImg => {
            return{
                ...prevImg, 
                img : url
            }
        })
    }

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setImg(prevData =>({
                ...prevData,
                [name]: value
        }))
    }

    function reset(event){
        event.preventDefault()
        setImg(
            prevData=> ({
                ...prevData,
                topText : '',
                bottomText : ''
        }))
    }

    return(
    <main>
        <form>
            <label className='label' htmlFor='top'>Top Text</label>
            <input type='text' 
                id='top' 
                name='topText' 
                value = {data.topText}
                className='formInput' 
                placeholder='Top Text' 
                onChange={handleChange}/>
            
            <label className='label' htmlFor='bottom'>Bottom Text</label>
            <input type='text' 
                id='bottom' 
                name='bottomText'
                value = {data.bottomText}
                className='formInput' 
                placeholder='Bottom Text' 
                onChange={handleChange}/>

            <button className='formButton submit' 
            onClick = {(e) => getMemeImg(e)}
            >Get a new meme image <i className="fa-regular fa-image"></i></button>

            <button onClick={reset} className='formButton reset'>Reset</button>

            <div className="meme">
                {data.img && <img className="meme--image" src={data.img} alt="Meme" />}
                <h2 className="meme--text top">{data.topText}</h2>
                <h2 className="meme--text bottom">{data.bottomText}</h2>
            </div>

            
            
        </form>

        
    </main>)
}