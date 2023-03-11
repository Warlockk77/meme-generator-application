import React from "react";
import image from "../images/image.png";



export default function Meme() {

   

   const [meme , setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage:'https://i.imgflip.com/261o3j.jpg'
   })

   const [allMemeImages , setAllMemeImages] = React.useState([]) ;

   React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))

},[]);
console.log(allMemeImages)

   function getNewImage() {

    const randomNumber = Math.floor(Math.random()*allMemeImages.length) ;
    const url = allMemeImages[randomNumber].url ;

    setMeme(prevState => {
        return {
            ...prevState,
            randomImage:url
        }
    }
       
    )
   }

   function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]:value
    }))
   }
    




    return (
        <div>
        <div className="form">
            <div className="inputs">
            <input type="text" 
            placeholder="Top text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}></input>
            <input type="text" 
            placeholder="Bottom text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}></input>
            </div>
            <div className="button">
            <button className="btn" onClick={getNewImage}>Get a new meme Image<img className="button--img" src={image} ></img></button>
            </div>
        </div>
        <div className="meme--image-container">
        <img className="memeImage" src={meme.randomImage}></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
        </div>
    )
}