import { useEffect, useState } from 'react';

const NAVBAR_DARK_COLOR = '#080A0C';
const NAVBAR_MEDIUM_COLOR = '#1D2023';
const NAVBAR_LIGHT_COLOR = '#2B2C2D';

const infoCardOuterStyle : React.CSSProperties = {
    border: 'solid ' + NAVBAR_DARK_COLOR,
    backgroundColor: NAVBAR_MEDIUM_COLOR,
    padding: '5px',
    borderWidth: '5px 5px 5px 5px',
    borderRadius: '20px',
    marginTop: '10px',
    marginBottom: '10px'
}

const infoCardInnerStyle : React.CSSProperties = {
    padding: '10px',
    border: 'solid ' + NAVBAR_DARK_COLOR,
    backgroundColor: NAVBAR_LIGHT_COLOR,
    borderWidth: '5px 5px 5px 5px',
    borderRadius: '20px'
}

const paddingBarStyle : React.CSSProperties = {
    backgroundColor: 'white', 
    height: '3px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

function ImageCard(props: {
    title?: string;
    imageLink: string;
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
        <div style={infoCardOuterStyle}>
            <div style={{ textAlign: 'center', ...infoCardInnerStyle }}>
                <img alt='Image Card' style={imageStyle} src={require(props.imageLink)}/>
            </div>
        </div>
    );
}

export default ImageCard;