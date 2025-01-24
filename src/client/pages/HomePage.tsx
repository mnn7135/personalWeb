import { useEffect, useState } from 'react';
import { IAppConfig, loadAppConfig } from './appConfig.service';
import InfoCard from "../components/InfoCard";

const config: IAppConfig = loadAppConfig();

const bingImage = require(config.BING_IMG_SRC + "");
const firstImage = require(config.FIRST_IMG_SRC + "");
const gitImage = require(config.GIT_IMG_SRC + "");
const linkedinImage = require(config.LINKEDIN_IMG_SRC + "");
const gtriImage = require(config.GTRI_IMAGE_STC + "");
const stackoveflowImage = require(config.STACK_OVERFLOW_IMG_SRC + "");
const googleImage = require(config.GOOGLE_IMG_SRC + "");
const ritImage = require(config.RIT_IMG_SRC + "");
const trelloImage = require(config.TRELLO_IMG_SRC + "");

const PAGE_COLOR = '#191919';

const paddingBarStyle : React.CSSProperties = {
    backgroundColor: 'white', 
    height: '3px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

const imageContainerStyle : React.CSSProperties = {
    paddingTop: '10px',
    paddingLeft: '10%',
    paddingRight: '10%',
    display: 'flex',
    flex: 'row wrap',
    justifyContent: 'space-between'
}

const appStyling : React.CSSProperties = {
    backgroundColor: PAGE_COLOR
}

function HomePage(props: {}) {
    const [imageSize, setImageSize] = useState<number>(200*window.innerWidth/1920);

    useEffect(() => {
        function updateImageSize() {
            setImageSize(200*window.innerWidth/1920);
        }
        window.addEventListener('resize', updateImageSize);
      }, []);

    const imageStyle : React.CSSProperties = {
        height: imageSize + 'px', 
        width: imageSize + 'px',
        borderRadius: '50px',
        padding: '10px'
    }

    return (
        <div style={{ display: 'flex', ...appStyling }}>
            <div style={{ flex: '7' }}>
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> 
                    {config.QUCIK_LINKS_SECTION}
                </div>
                <div style={paddingBarStyle}></div>
                <div style={imageContainerStyle}>
                    <a href={config.STACK_OVERFLOW_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.STACK_OVERFLOW_ALT} style={imageStyle} src={stackoveflowImage}/>
                    </a>
                    <a href={config.GIT_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.GIT_ALT} style={imageStyle} src={gitImage}/>
                    </a>
                    <a href={config.TRELLO_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.TRELLO_ALT} style={imageStyle} src={trelloImage}/>
                    </a>
                </div>
                <div style={imageContainerStyle}>
                    <a href={config.RIT_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.RIT_ALT} style={imageStyle} src={ritImage}/>
                    </a>
                    <a href={config.GTRI_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.GTRI_ALT} style={imageStyle} src={gtriImage}/>
                    </a>
                    <a href={config.LINKEDIN_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.LINKEDIN_ALT} style={imageStyle} src={linkedinImage}/>
                    </a>
                </div>
                <div style={imageContainerStyle}>
                    <a href={config.FIRST_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.FIRST_ALT} style={imageStyle} src={firstImage}/>
                    </a>
                    <a href={config.BING_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.BING_ALT} style={imageStyle} src={bingImage}/>
                    </a>
                    <a href={config.GOOGLE_LINK} target='_blank' rel='noreferrer'>
                        <img alt={config.GOOGLE_ALT} style={imageStyle} src={googleImage}/>
                    </a>
                </div>
            </div>
            <div style={{ flex: '1' }}></div>
            <div style={{ flex: '4' }}>
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}>
                    {config.FEED_SECTION}
                </div>
                <div style={paddingBarStyle}></div>
                <InfoCard title={config.FEED_MESSAGE_1_TITLE}  center={true} description={config.FEED_MESSAGE_1_DESC}/>
            </div>
        </div>
    );
}

export default HomePage;