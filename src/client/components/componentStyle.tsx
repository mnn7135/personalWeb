export const NAVBAR_DARK_COLOR = 'white';
export const NAVBAR_MEDIUM_COLOR = '#1D2023';
export const NAVBAR_LIGHT_COLOR = '#2B2C2D';

export const infoCardOuterStyle : React.CSSProperties = {
    border: 'solid ' + NAVBAR_DARK_COLOR,
    backgroundColor: NAVBAR_MEDIUM_COLOR,
    padding: '5px',
    borderWidth: '3px 3px 3px 3px',
    borderRadius: '20px',
    marginTop: '10px',
    marginBottom: '10px'
}

export const infoCardInnerStyle : React.CSSProperties = {
    padding: '10px',
    border: 'solid ' + NAVBAR_DARK_COLOR,
    backgroundColor: NAVBAR_LIGHT_COLOR,
    borderWidth: '0px 0px 0px 0px',
    borderRadius: '20px'
}

export const paddingBarStyle : React.CSSProperties = {
    backgroundColor: 'white', 
    height: '3px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

export const paddingBarListStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_MEDIUM_COLOR, 
    height: '2px', 
    paddingLeft: '5px', 
    paddingRight: '5px'
}

export const personalWebNavBarBlockStyle : React.CSSProperties = {
    fontFamily: 'Calibri',
    fontWeight: 'bold',
    fontSize: '30px',
    backgroundColor: 'black',
    display: 'flex',
    flexFlow: 'row wrap',
    paddingLeft: '0px',
    paddingRight: '20px',
};

export const personalWebNavBarTabSelectedStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_MEDIUM_COLOR,
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    cursor: 'pointer',
    border: 'solid ' + NAVBAR_DARK_COLOR,
    borderWidth: '3px 3px 0px 3px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px'
};

export const personalWebNavBarTabUnselectedStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_LIGHT_COLOR,
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    cursor: 'pointer',
    border: 'solid ' + NAVBAR_DARK_COLOR,
    borderWidth: '3px 3px 0px 3px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px'
};

export const personalWebNavBarTabFooterStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_MEDIUM_COLOR,
    paddingBottom: '12px'
};

export const personalWebNavBarTabFooterBottomStyle : React.CSSProperties = {
    backgroundColor: 'white',
    paddingBottom: '6px'
};

export const personalWebNavBarLinkStyle : React.CSSProperties = {
    color: 'white',
    textDecoration: 'none'
};