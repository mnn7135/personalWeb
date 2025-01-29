import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { infoCardOuterStyle, infoCardInnerStyle, paddingBarStyle } from './componentStyle';
import { smallPaddingBarStyle } from '../pages/pageStyle';

function WeatherCard(props: {
    title?: string;
    larger?: boolean;
    icon: IconProp;
    data: string | number;
    temperature?: boolean;
    subTitle?: string;
    superTitle?: string;
}) {
    const fontSizeStyle = props.larger ? '100px' : '60px';
    const iconSize = props.larger ? '8x' : '4x';

    return (
        <div style={{ fontSize: '32px', ...infoCardOuterStyle }}>
            {props?.superTitle ? <div><div style={{ fontSize: '80px', textAlign: 'center', paddingBottom: '20px', ...infoCardInnerStyle }}>
                {props?.superTitle}
            </div><div style={{ paddingBottom: '20px' }}></div><div style={smallPaddingBarStyle}></div><div></div></div> : <></>}
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