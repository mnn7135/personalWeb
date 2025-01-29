import { IWeatherData } from "../domain/weatherdata.domain";
import IWeatherHelperService from "./weatherhelper.service";
import { ISunDataResult } from "../domain/sundataresult.domain";

export default class IWeatherPredictionService {
    private sunData: ISunDataResult;
    private weatherData: IWeatherData[];
    private lastWeekWeatherData: IWeatherData[];
    private helperService: IWeatherHelperService;

    constructor(sunData: ISunDataResult, weatherData: IWeatherData[], lastWeekWeatherData: IWeatherData[]) {
        this.sunData = sunData;
        this.weatherData = weatherData;
        this.lastWeekWeatherData = lastWeekWeatherData;
        this.helperService = new IWeatherHelperService(sunData, weatherData, lastWeekWeatherData);
    }

    public predictWeather(day: Date): string {
        // If pressure is increasing, weather is more likely to be clear skies, etc.

        // If humidity has been increasing, there is a lot of moisture in the air => potential for precipitation or fog

        // If wind speeds have been increasing/maintained, then it is more likely that a new air mass is moving in and the weather will change.

        // 


        let weatherDesc = '';
        const hourDifference = (new Date(day).getDay() - new Date(this.helperService.getCurrentTime()).getDay())*24 + 
            (new Date(day).getHours() - new Date(this.helperService.getCurrentTime()).getHours());

        let compareToIndex = hourDifference*12;
        if (compareToIndex > 280) {
            compareToIndex = 280;
        }
        const isDaytime = new Date(day).getHours() >= new Date(this.sunData.sunrise).getHours() && new Date(day).getHours() < new Date(this.sunData.sunset).getHours();

        const windMax = this.weatherData[0].windspdmph_avg10m > this.weatherData[compareToIndex].winddir_avg10m ? this.weatherData[compareToIndex].winddir_avg10m: 0;
        const pressureTrend = this.helperService.getPressureTrend([...this.weatherData, ...this.lastWeekWeatherData]);
        const temperatureTrend = this.helperService.getTemperatureTrend([...this.weatherData, ...this.lastWeekWeatherData]);
        const humidityTrend = this.helperService.getHumidityTrend([...this.weatherData, ...this.lastWeekWeatherData]);

        let pressureFactor = 25;
        if (pressureTrend > 0.25) {
            pressureFactor = 45;
        } else if (pressureFactor < -0.25) {
            pressureFactor = -35;
        }

        let temperatureFactor = 25;
        if (temperatureTrend > 0.25) {
            temperatureFactor = 25;
        } else if (temperatureTrend < -0.25) {
            temperatureFactor = -25;
        }

        let rainFactor = 0;
        if (this.weatherData[0].dailyrainin > 0) {
            rainFactor = -25;
        } else if (this.weatherData[0].dailyrainin > 0.25 && pressureFactor < 0) {
            rainFactor = -50;
        }

        let humidityFactor = 25;
        if (humidityTrend > 0 && this.weatherData[0].humidity > 75) {
            humidityFactor = -30;
        }

        const weatherFormula = 
            pressureFactor +
            temperatureFactor +
            rainFactor +
            humidityFactor;

        if (weatherFormula <= 25) {
            weatherDesc = 'Stormy';
        } else if (weatherFormula <= 35) {
            weatherDesc = 'Rain';
        } else if (weatherFormula <= 50) {
            weatherDesc = 'Cloudy';
        } else {
            if (isDaytime) {
                weatherDesc = 'Sunny';
            } else {
                weatherDesc = 'Clear';
            }
        }

        if(windMax > 15) {
            weatherDesc = `'Breezy ${windMax}'`;
        } else if(windMax > 25) {
            weatherDesc = 'Windy';
        }

        return weatherDesc;
    }

    public predictTemperature(day: Date) {
        const hourDifference = (new Date(day).getDay() - new Date(this.helperService.getCurrentTime()).getDay())*24 + 
            (new Date(day).getHours() - new Date(this.helperService.getCurrentTime()).getHours());

        return this.helperService.getTemperatureTrend(this.weatherData)*hourDifference + this.weatherData[0].tempf;
    }
}