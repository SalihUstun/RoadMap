import './Navbar.css'
const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">RoadMap</div>
      <ul className="nav-menu">
        <li>Ana Sayfa</li>
        <li>Seyahat Ara</li>
        <li>Hakkımızda</li>
        <li className='nav-contact'>İletişim</li>
      </ul>
    </div>
  )
}

export default Navbar