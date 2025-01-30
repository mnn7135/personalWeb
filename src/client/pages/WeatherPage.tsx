import { useEffect, useState } from "react";
import { IWeatherData } from "../../server/domain/weatherdata.domain";
import IWeatherDataService from "../../server/weather/weatherdata.service";
import WeatherCard from "../components/WeatherCard";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import InfoListCard from "../components/InfoListCard";
import IWeatherHelperService from "../../server/weather/weatherhelper.service";
import { ISunDataResult } from "../../server/domain/sundataresult.domain";
import IWeatherPredictionService from "../../server/weather/weatherprediction.service";
import { IAppConfig, loadAppConfig } from "./appConfig.service";
import { appStyling, paddingBarStyle } from "./pageStyle";

const config: IAppConfig = loadAppConfig();

function addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + (hours*60*60*1000));
    return date;
}

function WeatherPage() {
    const dataService = new IWeatherDataService();
    const [helperService, setHelperService] = useState<IWeatherHelperService | undefined>(undefined);
    const [predictionService, setPredictionService] = useState<IWeatherPredictionService | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<IWeatherData[] | undefined>(undefined);
    const [lastWeekWeatherData, setLastWeekWeatherData] = useState<IWeatherData[] | undefined>(undefined);
    const [sunData, setSunData] = useState<ISunDataResult | undefined>(undefined);
    const [currentWeatherData, setCurrentWeatherData] = useState<IWeatherData | undefined>(undefined);

    const [oneDayWeather, setOneDayWeather] = useState<string>('Sunny');
    const [twoDayWeather, setTwoDayWeather] = useState<string>('Sunny');
    const [threeDayWeather, setThreeDayWeather] = useState<string>('Sunny');
    
    const predictOneDay = addHours(new Date(), 24);
    const predictTwoDay = addHours(new Date(), 48);
    const predictThreeDay = addHours(new Date(), 72);
    const lastWeekWeatherDay = addHours(new Date(), -168);

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    useEffect(() => {
        const fetchData = async() => {
            setWeatherData(await dataService.getWeatherData());
            await sleep(1000);
            setLastWeekWeatherData(await dataService.getWeatherDataEndDate(lastWeekWeatherDay));
            setSunData((await dataService.getSunData()).results);
        };


        if (weatherData === undefined) {
            fetchData();
        }
    });

    useEffect(() => {
        if (weatherData != null && sunData != null && lastWeekWeatherData != null) {
            setCurrentWeatherData(weatherData[0]);
            setHelperService(new IWeatherHelperService(sunData, weatherData, lastWeekWeatherData));
            setPredictionService(new IWeatherPredictionService(sunData, weatherData, lastWeekWeatherData));
        }
    }, [weatherData, sunData, lastWeekWeatherData]);

    useEffect(() => {
        if (predictionService != null) {
            setOneDayWeather(predictionService.predictWeather(predictOneDay));
            setTwoDayWeather(predictionService.predictWeather(predictTwoDay));
            setThreeDayWeather(predictionService.predictWeather(predictThreeDay));
        }
    }, [predictionService, predictOneDay, predictTwoDay, predictThreeDay]);

    return (
        <div>
            <div style={{ display: 'flex', ...appStyling }}>
                <div style={{ flex: '12' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'black' }}> Victor, NY Weather | Phoenix Station </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>Right Now</div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ display: 'flex', ...appStyling }}>
                        <div style={{ flex: '2' }}></div>
                        <div style={{ flex: '8' }}>
                        <WeatherCard icon={ helperService?.getWeatherIcon(helperService.getWeatherCondition(), new Date()) ?? faEllipsis} 
                            larger={true} 
                            data={currentWeatherData ? currentWeatherData.tempf.toFixed(0) : ''}
                            temperature={true}
                            title={helperService?.getWeatherCondition()}
                            superTitle={helperService?.getDayStringFromNumber(helperService.getCurrentTime().getDay())}
                            subTitle={`Feels Like ${currentWeatherData ? currentWeatherData.feelsLike.toFixed(0) : ''}`}/>
                        </div>
                        <div style={{ flex: '2' }}></div>
                    </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>
                        {config.SIX_HOUR_SECTION}
                    </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ display: 'flex', ...appStyling }}>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>
                                {config.TOMORROW_CARD}
                            </div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predictOneDay)} 
                            icon={helperService?.getWeatherIcon(oneDayWeather, predictOneDay) ?? faEllipsis} 
                            superTitle={helperService?.getDayStringFromNumber(predictOneDay.getDay())}
                            data={`${predictionService?.predictTemperature(predictOneDay).toFixed(0)}° F`}/>
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>
                                {config.TWO_DAY_CARD}
                            </div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predictTwoDay)} 
                                icon={helperService?.getWeatherIcon(twoDayWeather, predictTwoDay) ?? faEllipsis} 
                                superTitle={helperService?.getDayStringFromNumber(predictTwoDay.getDay())}
                                data={`${predictionService?.predictTemperature(predictTwoDay).toFixed(0)}° F`}
                            />
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>
                                {config.THREE_DAY_CARD}
                            </div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predictThreeDay)} 
                                icon={helperService?.getWeatherIcon(threeDayWeather, predictThreeDay) ?? faEllipsis} 
                                superTitle={helperService?.getDayStringFromNumber(predictThreeDay.getDay())}
                                data={`${predictionService?.predictTemperature(predictThreeDay).toFixed(0)}${config.DEGREE_FAHRENHEIGHT}`}
                            />
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                    </div>
                    <div style={{ flex: '12' }}>
                        <div style={paddingBarStyle}></div>
                        <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>Right Now | Current Conditions</div>
                        <div style={paddingBarStyle}></div>
                        {currentWeatherData && sunData && helperService ? <InfoListCard sideBySide={false} 
                            data={[`${new Date(sunData.sunrise).toLocaleTimeString()}*`, 
                                `${new Date(sunData.sunset).toLocaleTimeString()}*`, 
                                `${currentWeatherData.windspdmph_avg10m} ${config.WIND_SPEED_MPH_DIR} ${helperService.getWindDirection(currentWeatherData.winddir)}`, 
                                `${helperService.getPressureMbar(currentWeatherData.baromrelin).toFixed(1)} ${config.PRESSURE_MBAR}*`,
                                `${currentWeatherData.windgustmph} ${config.WIND_SPEED_MPH_DIR} ${helperService.getWindDirection(currentWeatherData.winddir)}`,
                                `${currentWeatherData.uv} ${helperService.getUVRisk(currentWeatherData.uv)}`,
                                `${currentWeatherData.humidity}%`,
                                `${currentWeatherData.hourlyrainin.toFixed(2)} ${config.INCHES}`, 
                                `${currentWeatherData.dewPoint.toFixed(1)}${config.DEGREE_FAHRENHEIGHT}`,
                                ''
                            ]} 
                            dataTitles={config.WEATHER_DATA_LABELS_LIST}/> : ''}
                        <div style={{ fontSize: '20px', paddingTop: '10px' }}>{config.SUNRISE_SUNSET_DISCLAIMER}</div>
                        <div style={{ fontSize: '20px', paddingBottom: '10px' }}>{config.MBAR_DISCLAIMER}</div>
                        <div style={paddingBarStyle}></div>
                        <div style={{ fontSize: '40px', textAlign: 'center', color: 'black', padding: '10px' }}>
                            {config.LIVE_DATA_SECTION}
                        </div>
                        <div style={paddingBarStyle}></div>
                        <div style={{ textAlign: 'center', color: 'black', padding: '10px'  }}>
                            {'WIP'}
                        </div>
                        <div style={paddingBarStyle}></div>
                        <div>
                            {currentWeatherData ? <div style={{ fontSize: '20px', paddingTop: '20px' }}>{config.LAST_PULL_FROM + ' ' + new Date().toLocaleString()}</div> : ''}
                            <div style={{ fontSize: '20px' }}>{config.LAST_MAINTENANCE}</div>
                            <div style={{ fontSize: '20px' }}>{config.WEATHER_STATION_DISCLAIMER}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPage;