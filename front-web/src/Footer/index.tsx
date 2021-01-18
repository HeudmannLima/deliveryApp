import './styles.css';
import { ReactComponent as YoutubeIcon }  from './youtube.svg';
import { ReactComponent as LinkedinIcon }  from './linkedin.svg';
import { ReactComponent as InstagramIcon }  from './instagram.svg';

function Footer() {
  return (
    <footer className="main-footer">
      App desenvolvido por <strong>HeudFOOD</strong>
      <div className="footer-icons">
        <a href="youtube"> <YoutubeIcon /> </a>
        <a href="linkedin"><LinkedinIcon /></a>
        <a href="instagram"><InstagramIcon /></a>
      </div>
    </footer>
  )
}

export default Footer;    