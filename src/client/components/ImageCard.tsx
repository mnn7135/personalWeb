import { useEffect, useState } from 'react';
import { infoCardOuterStyle, infoCardInnerStyle } from './componentStyle';

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