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

const paddingBarListStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_MEDIUM_COLOR, 
    height: '2px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

function InfoListCard(props: {
    title?: string;
    dataTitles?: string[];
    data: string[];
    sideBySide?: boolean;
}) {
    return (
        <div style={infoCardOuterStyle}>
            {props.title ? 
                    <div style={{ paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div style={{ fontSize: '30px', paddingBottom: '10px' }}>{props.title}</div> 
                        <div style={paddingBarStyle}></div>
                    </div>
                : ''}
            <div style={infoCardInnerStyle}>
                <div>
                    {props.dataTitles ?
                        props.dataTitles.map((title, index) => {
                            return (
                                <div key={`infoListCard-${title}-${index}`}>
                                    <div style={{ fontSize: '25px', display: 'flex', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                                        <div style={{ flex: '1' }}></div>
                                            <div style={{ flex: '5' }}>
                                                {title}
                                            </div>
                                            <div style={{ flex: '5' }}>
                                                {props.data[index]}
                                            </div>
                                        <div style={{ flex: '1' }}></div>
                                    </div>
                                    {index + 1 !== props.dataTitles?.length ? 
                                        <div style={{ flex: '12' }}>
                                            <div style={paddingBarListStyle}></div>
                                        </div> : ''}
                                </div>
                            )
                        })
                        : 
                        props.data.map((dataElement, index) => {
                            return (
                                <div key={`infoListCard-${dataElement}-${index}`}>
                                    <div style={{ fontSize: '24px', display: 'flex', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                                        <div style={{ flex: '1' }}></div>
                                            <div style={{ flex: '10' }}>
                                                {dataElement}
                                            </div>
                                        <div style={{ flex: '1' }}></div>
                                    </div>
                                    {index + 1 !== props.data?.length ? 
                                        <div style={{ flex: '12' }}>
                                            <div style={paddingBarListStyle}></div>
                                        </div> : ''}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default InfoListCard;