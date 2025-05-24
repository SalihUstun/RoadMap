import './Background.css'
import video1 from '../../assets/mardin.mp4'
import image1 from '../../assets/mardin.jpg'
import video2 from '../../assets/trabzon.mp4'
import image2 from '../../assets/trabzon.jpg'
import video3 from '../../assets/antalya.mp4'
import image3 from '../../assets/antalya.png'
const Background = ({ playStatus, heroCount }) => {
  if (playStatus) {
    if (heroCount === 0) {
      return (
        <video className="background fade-in" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
      );
    } else if (heroCount === 1) {
      return (
        <video className="background fade-in" autoPlay loop muted>
          <source src={video2} type="video/mp4" />
        </video>
      );
    } else if (heroCount === 2) {
      return (
        <video className="background fade-in" autoPlay loop muted>
          <source src={video3} type="video/mp4" />
        </video>
      );
    }
  } else {
    if (heroCount === 0) {
      return <img src={image1} className="background fade-in" />;
    } else if (heroCount === 1) {
      return <img src={image2} className="background fade-in" />;
    } else if (heroCount === 2) {
      return <img src={image3} className="background fade-in" />;
    }
  }
};

export default Background