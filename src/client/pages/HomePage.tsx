import { useEffect, useState } from 'react';
import InfoCard from "../components/InfoCard";

const bingImage = require('./images/bing.jpg');
const firstImage = require('./images/first.jpg');
const gitImage = require('./images/git.jpg');

const linkedinImage = require('./images/lin.jpg');
const gtriImage = require('./images/gtri.jpg');
const stackoveflowImage = require('./images/stack.jpg');

const googleImage = require('./images/google.jpg');
const ritImage = require('./images/ritp.jpg');
const trelloImage = require('./images/trello.jpg');

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

function HomePage(props: {

}) {
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
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> Quick Links </div>
                <div style={paddingBarStyle}></div>
                <div style={imageContainerStyle}>
                    <a href='https://stackoverflow.com' target='_blank' rel='noreferrer'>
                        <img alt='Stack Overflow' style={imageStyle} src={stackoveflowImage}/>
                    </a>
                    <a href='https://github.com' target='_blank' rel='noreferrer'>
                        <img alt='Github' style={imageStyle} src={gitImage}/>
                    </a>
                    <a href='https://trello.com' target='_blank' rel='noreferrer'>
                        <img alt='Trello' style={imageStyle} src={trelloImage}/>
                    </a>
                </div>
                <div style={imageContainerStyle}>
                    <a href='https://www.rit.edu' target='_blank' rel='noreferrer'>
                        <img alt='Rochester Institue of Technology' style={imageStyle} src={ritImage}/>
                    </a>
                    <a href='https://gtri.gatech.edu' target='_blank' rel='noreferrer'>
                        <img alt='Georgia Tech Research Institute' style={imageStyle} src={gtriImage}/>
                    </a>
                    <a href='https://www.linkedin.com/in/michael-nersinger/' target='_blank' rel='noreferrer'>
                        <img alt='Linkedin: Michael Nersinger' style={imageStyle} src={linkedinImage}/>
                    </a>
                </div>
                <div style={imageContainerStyle}>
                    <a href='https://www.firstinspires.org' target='_blank' rel='noreferrer'>
                        <img alt='FIRST Robotics' style={imageStyle} src={firstImage}/>
                    </a>
                    <a href='https://www.bing.com' target='_blank' rel='noreferrer'>
                        <img alt='Bing' style={imageStyle} src={bingImage}/>
                    </a>
                    <a href='https://www.google.com/' target='_blank' rel='noreferrer'>
                        <img alt='Google' style={imageStyle} src={googleImage}/>
                    </a>
                </div>
            </div>
            <div style={{ flex: '1' }}></div>
            <div style={{ flex: '4' }}>
                <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> Feed </div>
                <div style={paddingBarStyle}></div>
                <InfoCard title="Welcome!"  center={true} description={`Test message.`}/>
            </div>
        </div>
    );
}

export default HomePage;