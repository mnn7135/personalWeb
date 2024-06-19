import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

function WeatherCard(props: {
    title?: string;
    larger?: boolean;
    icon: IconProp;
    data: string | number;
    temperature?: boolean;
    subTitle?: string;
}) {
    const fontSizeStyle = props.larger ? '100px' : '60px';
    const iconSize = props.larger ? '10x' : '6x';

    return (
        <div style={{ fontSize: '32px', ...infoCardOuterStyle }}>
            <div style={{ textAlign: 'center', ...infoCardInnerStyle }}>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <FontAwesomeIcon icon={props.icon} size={iconSize}/>
                </div>
                {props.title ? 
                    <div>
                        <div style={paddingBarStyle}></div>
                        <div style={{ fontSize: fontSizeStyle }}>{props.title}</div>
                    </div> 
                : ''}
                <div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ fontSize: fontSizeStyle, paddingTop: '10px', paddingBottom: '10px' }}>
                        {props.data} 
                        {props.temperature ? '° F' : ''}
                    </div>
                    <div style={paddingBarStyle}></div>
                </div>
                {props.subTitle ? 
                    <div>
                        <div>
                            {props.subTitle}
                            {props.temperature ? '° F' : ''}
                        </div>
                    </div> 
                : ''}
            </div>
        </div>
    );
}

export default WeatherCard;