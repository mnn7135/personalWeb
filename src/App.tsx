import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PersonalWebNavBar from './client/components/NavBar';
import HomePage from './client/pages/HomePage';
import AstronomyPage from './client/pages/AstronomyPage';
import AboutPage from './client/pages/AboutPage';
import WeatherPage from './client/pages/WeatherPage';

const PAGE_ROUTES = ['home', 'about', 'weather', 'astronomy'];

const PAGE_COLOR = '#191919';

const pageStyling : React.CSSProperties = {
  margin: '10px',
  fontFamily: 'Calibri',
  fontWeight: 'bold',
  fontSize: '16px',
  color: 'white',
  paddingBottom: '20px'
}

const appStyling : React.CSSProperties = {
  backgroundColor: PAGE_COLOR,
  display: 'block',
  marginBottom: '-20px'
}

const smallPaddingBarStyle : React.CSSProperties = {
  backgroundColor: 'white', 
  height: '2px',
  marginBottom: '19px'
}

function PersonalWebApp() {
  return (
    <div style={appStyling} className="PersonalWebApp">
      <BrowserRouter basename='/personalWeb/'>
        <PersonalWebNavBar tabs={PAGE_ROUTES}/>
        <div style={pageStyling}>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/weather' element={<WeatherPage/>}/>
            <Route path='/astronomy' element={<AstronomyPage/>}/>
          </Routes>
        </div>
        <div style={smallPaddingBarStyle}></div>
        <div style={pageStyling}>
          Programmed by Michael Nersinger |
          &nbsp;
          <a style={{ color: 'white' }} href='https://github.com/mnn7135/personal-web/'>
            https://github.com/mnn7135/personal-web/
          </a>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default PersonalWebApp;
