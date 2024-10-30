import React,{Suspense,useState} from 'react'
import { BrowserRouter as Router, Routes, Route,NavLink} from 'react-router-dom'


function App() {
  const Home = React.lazy(() => import('./components/Home'))
  const KontakList = React.lazy(() => import('./components/Kontak/List'))
  const KontakCreate = React.lazy(() => import('./components/Kontak/Create'))
  const KontakEdit = React.lazy(() => import('./components/Kontak/Edit'))


  return (
    <>
     <Router>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">MDP</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/'}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/kontak'}>Kontak</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive})=> `nav-link ${isActive?"active":""}`} aria-current="page" to={'/prodi'}>Prodi</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
            <Route path= '/' element={<Home/>}/>
            <Route path= '/kontak' element={<KontakList/>}/>
            <Route path= '/kontak/store' element={<KontakCreate/>}/>
            <Route path= '/kontak/edit/:id' element={<KontakEdit/>}/>
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
