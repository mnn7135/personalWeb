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

function WeatherPage(props: {

}) {
    const dataService = new IWeatherDataService();
    const [helperService, setHelperService] = useState<IWeatherHelperService | undefined>(undefined);
    const [predictionService, setPredictionService] = useState<IWeatherPredictionService | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<IWeatherData[] | undefined>(undefined);
    const [sunData, setSunData] = useState<ISunDataResult | undefined>(undefined);
    const [currentWeatherData, setCurrentWeatherData] = useState<IWeatherData | undefined>(undefined);
    const [sixHourWeather, setSixHourWeather] = useState<string>('Sunny');
    const [twentyFourHourWeather, setTwentyFourHourWeather] = useState<string>('Sunny');
    const predict6Hour = addHours(new Date(), 6);
    const predict24Hour = addHours(new Date(), 24);

    useEffect(() => {
        const fetchData = async() => {
            setWeatherData(await dataService.getWeatherData());
            setSunData((await dataService.getSunData()).results);
        };


        if (weatherData === undefined) {
            fetchData();
        }
    });

    useEffect(() => {
        if (weatherData != null && sunData != null) {
            setCurrentWeatherData(weatherData[0]);
            setHelperService(new IWeatherHelperService(sunData, weatherData));
            setPredictionService(new IWeatherPredictionService(sunData, weatherData));
        }
    }, [weatherData, sunData]);

    useEffect(() => {
        if (predictionService != null) {
            setSixHourWeather(predictionService.predictWeather(predict6Hour));
            setTwentyFourHourWeather(predictionService.predictWeather(predict24Hour));
        }
    }, [predictionService, predict24Hour, predict6Hour]);

    return (
        <div>
            <div style={{ display: 'flex', ...appStyling }}>
                <div style={{ flex: '12' }}>
                    <div style={{ fontSize: '60px', textAlign: 'center', color: 'white' }}> Weather | Phoenix Station </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>Right Now</div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ display: 'flex', ...appStyling }}>
                        <div style={{ flex: '2' }}></div>
                        <div style={{ flex: '8' }}>
                        <WeatherCard icon={ helperService?.getWeatherIcon(helperService.getWeatherCondition(), new Date()) ?? faEllipsis} 
                            larger={true} 
                            data={currentWeatherData ? currentWeatherData.tempf.toFixed(1) : ''}
                            temperature={true}
                            title={helperService?.getWeatherCondition()}
                            subTitle={`Feels Like ${currentWeatherData ? currentWeatherData.feelsLike.toFixed(1) : ''}`}/>
                        </div>
                        <div style={{ flex: '2' }}></div>
                    </div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>Later</div>
                    <div style={paddingBarStyle}></div>
                    <div style={{ display: 'flex', ...appStyling }}>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>6 Hour</div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predict6Hour)} 
                            icon={helperService?.getWeatherIcon(sixHourWeather, predict6Hour) ?? faEllipsis} 
                            data={`Low ${predictionService?.predictTemperature(predict6Hour).toFixed(1)}° F`}/>
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>24 Hour</div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predict24Hour)} 
                            icon={helperService?.getWeatherIcon(twentyFourHourWeather, predict24Hour) ?? faEllipsis} 
                            data={`High ${predictionService?.predictTemperature(predict24Hour).toFixed(1)}° F`}/>
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                        <div style={{ flex: '2' }}>
                            <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>24 Hour</div>
                            <div style={paddingBarStyle}></div>
                            <WeatherCard title={predictionService?.predictWeather(predict24Hour)} 
                            icon={helperService?.getWeatherIcon(twentyFourHourWeather, predict24Hour) ?? faEllipsis} 
                            data={`High ${predictionService?.predictTemperature(predict24Hour).toFixed(1)}° F`}/>
                        </div>
                        <div style={{ flex: '0.5' }}>
                        </div>
                    </div>
                    <div style={{ flex: '12' }}>
                        <div style={paddingBarStyle}></div>
                        <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>Right Now | Current Conditions</div>
                        <div style={paddingBarStyle}></div>
                        {currentWeatherData && sunData && helperService ? <InfoListCard sideBySide={false} 
                            data={
                                [`${new Date(sunData.sunrise).toLocaleTimeString()}*`, 
                                `${new Date(sunData.sunset).toLocaleTimeString()}*`, 
                                `${currentWeatherData.windspdmph_avg10m} mph from ${helperService.getWindDirection(currentWeatherData.winddir_avg10m)}`, 
                                `${helperService.getPressureMbar(currentWeatherData.baromrelin).toFixed(1)} mbar*`,
                                `${currentWeatherData.windgustmph} mph from ${helperService.getWindDirection(currentWeatherData.winddir)}`,
                                `${currentWeatherData.uv} ${helperService.getUVRisk(currentWeatherData.uv)}`,
                                `${currentWeatherData.humidity}%`,
                                `${currentWeatherData.hourlyrainin.toFixed(2)} in`, 
                                `${currentWeatherData.dewPoint.toFixed(1)}° F`,
                                '']
                            } 
                            dataTitles={config.WEATHER_DATA_LABELS_LIST}/> : ''}
                        <div style={{ fontSize: '20px', paddingTop: '10px' }}>{`* Sunrise and sunset data provided by https://sunrise-sunset.org/api.`}</div>
                        <div style={{ fontSize: '20px', paddingBottom: '10px' }}>{`* One standard atmosphere of pressure equals 1013.25 millibars at sea level.`}</div>
                        <div style={paddingBarStyle}></div>
                        <div style={{ fontSize: '40px', textAlign: 'center', color: 'white', padding: '10px' }}>Live Data</div>
                        <div style={paddingBarStyle}></div>
                        <div style={{ textAlign: 'center', color: 'white', padding: '10px'  }}>
                            {'WIP'}
                        </div>
                        <div style={paddingBarStyle}></div>
                        <div>
                            {currentWeatherData ? <div style={{ fontSize: '20px', paddingTop: '20px' }}>{`Last pull from ${new Date(currentWeatherData.date).toLocaleString()}`}</div> : ''}
                            <div style={{ fontSize: '20px' }}>{`Last maintenanced on 8/4/2023, 11:45:00 AM`}</div>
                            <div style={{ fontSize: '20px' }}>{`Phoenix Station is my personal AmbientWeather WS-2000 Smart Station`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPage;