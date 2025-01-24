import InfoCard from '../components/InfoCard';
import InfoListCard from '../components/InfoListCard';
import { IAppConfig, loadAppConfig } from './appConfig.service';
import { appStyling, paddingBarStyle } from './pageStyle';

const config: IAppConfig = loadAppConfig();

function AboutPage(props: {}) {
    return (
        <div>
            <div style={{ display: 'flex', ...appStyling }}>
                <div style={{ flex: '12' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}>
                        {config.ABOUT_TITLE}
                    </div>
                    <div style={paddingBarStyle}></div>
                </div>
            </div>
            <div style={{ display: 'flex', padding: '10px', ...appStyling }}>
                <div style={{ flex: '4', padding: '10px' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}>
                        {config.DETAILS_SECTION}
                    </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ paddingTop: '20px' }}>
                        <InfoCard title={config.NAME} 
                            secondTitle={config.MINOR_DEGREE}
                            description={config.CURRENT_POSITION}
                            thirdTitle={config.DEGREE}/>
                        <InfoCard title={config.EMAIL_SECTION} 
                            thirdTitle={config.EMAIL}/>
                        <InfoListCard title={config.SKILLS_SECTION} 
                            data={config.PROGRAMMING_SKILLS_LIST}/>
                        <InfoListCard title={config.OTHER_SKILLS_SECTION} 
                            data={config.OTHER_SKILLS_LIST}/>
                    </div>
                </div>
                <div style={{ flex: '8', padding: '10px' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}>
                        {config.PROJECT_SECTION}
                    </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ display: 'flex', padding: '10px', ...appStyling }}>
                        <div style={{ flex: '6', padding: '10px' }}>
                            <InfoCard title={config.PROJECT_1_TITLE} 
                                secondTitle={config.PROJECT_1_SKILLS}
                                description={config.PROJECT_1_DESCRIPTION}/>
                            <InfoCard title={config.PROJECT_2_TITLE} 
                                secondTitle={config.PROJECT_2_SKILLS}
                                description={config.PROJECT_2_DESCRIPTION}/>
                        </div>
                        <div style={{ flex: '6', padding: '10px' }}>
                            <InfoCard title={config.PROJECT_3_TITLE} 
                                secondTitle={config.PROJECT_3_SKILLS}
                                description={config.PROJECT_3_DESCRIPTION}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;