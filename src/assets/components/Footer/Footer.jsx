import { NavLink } from "react-router-dom"
import "./footerStyle.css"

function Footer() {
  return (
    <div className="footer">
        <NavLink><img src="src/assets/imgs/WhatsappIcon.png" alt="" /></NavLink>
        <NavLink><img src="src/assets/imgs/YoutubeIcon.png" alt="" /></NavLink>
        <NavLink><img src="src/assets/imgs/InstagramIcon.png" alt="" /></NavLink>
    </div>
  )
}

export default Footer