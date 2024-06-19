import React, { useState } from "react";
import { Link } from "react-router-dom";

const NAVBAR_DARK_COLOR = '#080A0C';
const NAVBAR_MEDIUM_COLOR = '#1D2023';
const NAVBAR_LIGHT_COLOR = '#2B2C2D';

const personalWebNavBarBlockStyle : React.CSSProperties = {
    fontFamily: 'Calibri',
    fontWeight: 'bold',
    fontSize: '30px',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'row wrap',
    paddingLeft: '0px',
    paddingRight: '20px',
};

const personalWebNavBarTabSelectedStyle : React.CSSProperties = {
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

const personalWebNavBarTabUnselectedStyle : React.CSSProperties = {
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

const personalWebNavBarTabFooterStyle : React.CSSProperties = {
    backgroundColor: NAVBAR_MEDIUM_COLOR,
    paddingBottom: '12px'
};

const personalWebNavBarTabFooterBottomStyle : React.CSSProperties = {
    backgroundColor: 'white',
    paddingBottom: '6px'
};

const personalWebNavBarLinkStyle : React.CSSProperties = {
    color: 'white',
    textDecoration: 'none'
};

function PersonalWebNavBar(props: {
    tabs: string[];
}) {
    const [selectedTab, setSelectedTab] = useState<string>('home');

    function handleTab(tab: string) {
        setSelectedTab(tab);
    }

    return (
        <div>
            <div style={personalWebNavBarBlockStyle}>
                {props.tabs.map(tab =>
                    <div key={'personalWebTab-' + tab} 
                        style={tab === selectedTab ? personalWebNavBarTabSelectedStyle : personalWebNavBarTabUnselectedStyle}>
                            <Link to={'/' + tab} onClick={() => handleTab(tab)} style={personalWebNavBarLinkStyle}>{tab}</Link>
                 </div>
                )}
            </div>
            <div style={personalWebNavBarTabFooterStyle}></div>
            <div style={personalWebNavBarTabFooterBottomStyle}></div>
        </div>
    )
}

export default PersonalWebNavBar;