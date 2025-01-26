import { useEffect, useState } from 'react';
import { IAppConfig, loadAppConfig } from './appConfig.service';
import { appStyling, imageContainerStyleMinimal, paddingBarStyle } from './pageStyle';
import astrImage1 from './images/astr_space_1.jpg'
import astrImage2 from './images/astr_space_2.jpg'
import astrImage3 from './images/astr_moon.jpg'

const config: IAppConfig = loadAppConfig();

function AstronomyPage() {
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
                <div style={imageContainerStyleMinimal}>
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