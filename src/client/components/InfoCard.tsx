import { infoCardInnerStyle, infoCardOuterStyle, paddingBarStyle } from "./componentStyle";

function InfoCard(props: {
    title?: string;
    secondTitle?: string;
    thirdTitle?: string;
    description?: string;
    center?: boolean;
}) {
    return (
        <div style={infoCardOuterStyle}>
            {props.title ? 
                    <div style={{ textAlign: props.center ? 'center' : 'left', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div style={{ fontSize: '30px', paddingBottom: '10px' }}>{props.title}</div> 
                        <div style={paddingBarStyle}></div>
                    </div>
                : ''}
            <div style={{ textAlign: props.center ? 'center' : 'left', ...infoCardInnerStyle }}>
                {props.thirdTitle ? 
                    <div style={{ paddingBottom: '10px' }}>
                        <div style={{ fontSize: '24px', paddingBottom: '10px' }}>{props.thirdTitle}</div> 
                    </div>
                : ''}
                {props.secondTitle ? 
                    <div style={{ paddingBottom: '10px' }}>
                        <div style={{ fontSize: '24px', paddingBottom: '10px' }}>{props.secondTitle}</div> 
                        <div style={paddingBarStyle}></div>
                    </div>
                : ''}
                <div style={{ fontSize: '24px' }}>
                    {props.description ? props.description : ''}
                </div>
            </div>
        </div>
    );
}

export default InfoCard;