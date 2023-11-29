import { NavLink } from 'react-router-dom';
import '../header/headerStyle.css'



function Header() {
  return (
    <div className="header">
        <div>
            <img className="logo" src="src/assets/imgs/logo.png" alt="" />
        </div>
        <nav>
          <ul>
            <li>
              <NavLink className="navLink" to='/home'>Home </NavLink>
              <div className="dropdown">
                <NavLink className="navLink" to='/genre'>Genres <img src="src/assets/imgs/arrowHeader.png" alt="" /></NavLink>
                <div className="dropdown-content">
                  <div className='flex'>
                    <div className='flexColumn'>
                      <NavLink className="subCategories" to='/action'>Action</NavLink>
                      <NavLink className="subCategories" to='/adventure'>Adventure</NavLink>
                      <NavLink className="subCategories" to='/animation'>Animation</NavLink>
                      <NavLink className="subCategories" to='/comedy'>Comedy</NavLink>
                      <NavLink className="subCategories" to='/crime'>Crime</NavLink>
                      <NavLink className="subCategories" to='/drama'>Drama</NavLink>
                    </div>
                    <div className='flexColumn'>
                      <NavLink className="subCategories" to='/family'>Family</NavLink>
                      <NavLink className="subCategories" to='/fantasy'>Fantasy</NavLink>
                      <NavLink className="subCategories" to='/horror'>Horror</NavLink>
                      <NavLink className="subCategories" to='/mystery'>Myestery</NavLink>
                      <NavLink className="subCategories" to='/romance'>Romance</NavLink>
                      <NavLink className="subCategories" to='/sciencefiction'>Science Fiction</NavLink>   
                    </div>
                  </div>
              </div>
            </div>
            <div className="dropdown">
              <NavLink className="navLink" to='/movies'>Movies <img src="src/assets/imgs/arrowHeader.png" alt="" /></NavLink>
              <div className="dropdown-content">
                <div className='flexColumn'>
                  <NavLink className="subCategories" to='/lastreleases'>Last releases</NavLink>
                  <NavLink className="subCategories" to='/trending'>Trending</NavLink>
                  <NavLink className="subCategories" to='/classics'>Classics</NavLink>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <NavLink className="navLink" to='/series'>Series <img src="src/assets/imgs/arrowHeader.png" alt="" /></NavLink>
              <div className="dropdown-content">
                <div className='flexColumn'>
                  <NavLink className="subCategories" to='/series'>Series</NavLink>
                  <NavLink className="subCategories" to='/newreleases'>New releases</NavLink>
                  <NavLink className="subCategories" to='/episodes'>Episodes</NavLink>
                  <NavLink className="subCategories" to='/trendings'>Trendings</NavLink>
                </div>                
              </div>
            </div>
            </li>
          </ul>
        </nav>
        <div className='right'>
          <img className='settings'src="src/assets/imgs/settings.png" alt="" />
          <img className='avatar'src="src/assets/imgs/avatar.png" alt="" />
        </div>
        
    </div>
  )
}

export default Header;