import { useEffect, useState } from 'react';

const astrImage1 = require('./images/astr_space_1.jpg');
const astrImage2 = require('./images/astr_space_2.jpg');
const astrImage3 = require('./images/astr_moon.jpg');

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


function AstronomyPage(props: {

}) {
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
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> Astronomy </div>
                <div style={paddingBarStyle}></div>
                <div style={imageContainerStyle}>
                    <img alt='The Moon through a telescope' style={imageStyle} src={astrImage3}/>
                    <div style={paddingBarStyle}></div>
                    <img alt='The Stars through a telescope' style={imageStyle} src={astrImage2}/>
                    <div style={paddingBarStyle}></div>
                    <img alt='The Stars through a telescope' style={imageStyle} src={astrImage1}/>
                </div>
            </div>
        </div>
    );
}

export default AstronomyPage;