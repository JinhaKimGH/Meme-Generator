import React from "react"
import '../App.css'

export default function Form(){

    const [meme, updateMeme] = React.useState({topText: "", bottomText: "", randomImage: "http://i.imgflip.com/1bij.jpg"})
    const [allMemeImages, updateAllMemeImages] = React.useState([])

    React.useEffect(function (){
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => updateAllMemeImages(data.data.memes))
    }, [])

    function RandomMeme(){
        const randomNum = Math.floor((Math.random() * allMemeImages.length));
        updateMeme(prevMeme => ({...prevMeme, randomImage: allMemeImages[randomNum].url}))
    }

    function handleChange(event){
        const {name, value} = event.target 

        updateMeme(previousMeme => (
            {
                ...previousMeme,

                [name]: value
            }
        ))
    }

    return(
        <main>
            <div className="form">
                <input onChange={handleChange} name="topText" value={meme.topText} type="text" placeholder="Top Text" className="form-input"></input>
                <input onChange={handleChange} name="bottomText" value={meme.bottomText} type="text" placeholder="Bottom Text" className="form-input"></input>
                <button className="submit" onClick={RandomMeme}>Generate New Meme Image</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>  
    )
}