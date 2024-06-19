import InfoCard from '../components/InfoCard';

const PAGE_COLOR = '#191919';

const appStyling : React.CSSProperties = {
    backgroundColor: PAGE_COLOR
}

const paddingBarStyle : React.CSSProperties = {
    backgroundColor: 'white', 
    height: '3px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

function MorePage(props: {

}) {
    return (
        <div>
            <div style={{ display: 'flex', ...appStyling }}>
                <div style={{ flex: '12' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> More </div>
                    <div style={paddingBarStyle}></div>
                    <InfoCard title='NationStates | Wolffoxia' description=''/>
                    <InfoCard title='Minecraft' description=''/>
                </div>
            </div>
        </div>
    );
}

export default MorePage;