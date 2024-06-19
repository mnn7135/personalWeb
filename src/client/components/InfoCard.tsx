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