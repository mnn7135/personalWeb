import { IAppConfig, loadAppConfig } from './appConfig.service';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PersonalWebNavBar from '../components/NavBar';
import AboutPage from './AboutPage';
import AstronomyPage from './AstronomyPage';
import HomePage from './HomePage';
import WeatherPage from './WeatherPage';
import { pageStyling, smallPaddingBarStyle, webAppStyling } from './pageStyle';

const config: IAppConfig = loadAppConfig();

function PersonalWebApp(props: {}) {
    return (
        <div style={webAppStyling} className="PersonalWebApp">
      <HashRouter basename='/'>
        <PersonalWebNavBar 
          tabs={[config.HOME_PAGE_ROUTE,
            config.ABOUT_PAGE_ROUTE,
            config.WEATHER_PAGE_ROUTE,
            config.ASTRONOMY_PAGE_ROUTE
          ]}/>
        <div style={pageStyling}>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={'/' + config.HOME_PAGE_ROUTE} element={<HomePage/>}/>
            <Route path={'/' + config.ABOUT_PAGE_ROUTE} element={<AboutPage/>}/>
            <Route path={'/' + config.WEATHER_PAGE_ROUTE} element={<WeatherPage/>}/>
            <Route path={'/' + config.ASTRONOMY_PAGE_ROUTE} element={<AstronomyPage/>}/>
          </Routes>
        </div>
        <div style={smallPaddingBarStyle}></div>
        <div style={pageStyling}>
          {config.ATTRIBUTION}
          &nbsp;
          <a style={{ color: 'white' }} href={config.GITHUB_PROJ_LINK} target='_blank' rel='noreferrer'>
            {config.GITHUB_PROJ_LINK}
          </a>
        </div>
      </HashRouter>
    </div>
    );
}

export default PersonalWebApp;