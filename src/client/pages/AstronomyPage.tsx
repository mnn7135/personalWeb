import { useEffect, useState } from 'react';
import { IAppConfig, loadAppConfig } from './appConfig.service';

const config: IAppConfig = loadAppConfig();

const astrImage1 = require(config.ASTRONOMY_IMG_1_SRC + "");
const astrImage2 = require(config.ASTRONOMY_IMG_2_SRC + "");
const astrImage3 = require(config.ASTRONOMY_IMG_3_SRC + "");

const PAGE_COLOR = '#191919';

const appStyling : React.CSSProperties = {
    backgroundColor: PAGE_COLOR
}

const imageContainerStyle : React.CSSProperties = {
    paddingTop: '10px',
    display: 'grid',
    justifyContent: 'center'
}

const paddingBarStyle : React.CSSProperties = {
    backgroundColor: 'white', 
    height: '3px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}


function AstronomyPage(props: {}) {
    const [imageWidth, setImageWidth] = useState<number>(1000);
    const [imageHeight, setImageHeight] = useState<number>(500);

    useEffect(() => {
        function updateImageSize() {
            setImageWidth(1000*window.innerWidth/1920);
            setImageHeight(500*window.innerWidth/1920);
        }
        window.addEventListener('resize', updateImageSize);
      }, []);

    const imageStyle : React.CSSProperties = {
        height: imageHeight + 'px', 
        width: imageWidth + 'px',
        borderRadius: '50px',
        padding: '10px'
    }

    return (
        <div style={{ display: 'flex', ...appStyling }}>
            <div style={{ flex: '12' }}>
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}>
                    {config.ASTRONOMY_TITLE}
                </div>
                <div style={paddingBarStyle}></div>
                <div style={imageContainerStyle}>
                    <img alt={config.ASTRONOMY_IMG_1_ALT} style={imageStyle} src={astrImage3}/>
                    <div style={paddingBarStyle}></div>
                    <img alt={config.ASTRONOMY_IMG_2_ALT} style={imageStyle} src={astrImage2}/>
                    <div style={paddingBarStyle}></div>
                    <img alt={config.ASTRONOMY_IMG_3_ALT} style={imageStyle} src={astrImage1}/>
                </div>
            </div>
        </div>
    );
}

export default AstronomyPage;