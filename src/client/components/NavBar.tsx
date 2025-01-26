import { useState } from "react";
import { Link } from "react-router-dom";
import { personalWebNavBarBlockStyle, personalWebNavBarTabSelectedStyle, personalWebNavBarTabUnselectedStyle, personalWebNavBarLinkStyle, personalWebNavBarTabFooterStyle, personalWebNavBarTabFooterBottomStyle } from "./componentStyle";

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