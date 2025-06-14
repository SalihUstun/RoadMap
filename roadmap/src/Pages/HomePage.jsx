import { useState } from "react"
import Background from "../Components/Background/Background";
import Navbar from "../Components/Navbar/Navbar"
import Hero from "../Components/Hero/Hero"
import 'bootstrap/dist/css/bootstrap.min.css';



const HomePage = () => {
  let heroData = [
    {text1:"Mardin’in Taş Evlerinde Tarih Canlanır."},
    {text1:"Trabzon, Yeşilin ve Tutkunun Şehri."},
    {text1:"Antalya: Güneşin ve Denizlerin Buluşması."},
  ]
  const [heroCount,setHeroCount] = useState(0);
  const [playStatus,setPlayStatus] = useState(false);

  

  return (
    <div>
      <Background playStatus={playStatus}  heroCount={heroCount}/>
      <Navbar/>
      <Hero
      setPlayStatus={setPlayStatus}
      heroData={heroData[heroCount]}
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      playStatus={playStatus}
      />
    </div>

    
  )
}

export default HomePage