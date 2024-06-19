import { faCloudMoon, faCloudMoonRain, faCloudSun, faCloudSunRain, faMoon, faSmog, faSun, faThunderstorm, faWind } from "@fortawesome/free-solid-svg-icons";
import { ISunDataResult } from "../domain/sundataresult.domain";
import { IWeatherData } from "../domain/weatherdata.domain";

export default class IWeatherHelperService {
    sunData: ISunDataResult;
    weatherData: IWeatherData[];

    constructor(sunData: ISunDataResult, weatherData: IWeatherData[]) {
        this.sunData = sunData;
        this.weatherData = weatherData;
    }

    /**
     * Determine the direction of the wind from angle.
     * 
     * @param windAngle The measured angle from which the wind comes from in degrees.
     * @returns The direction, as a string, from which the comes from.
     */
    public getWindDirection(windAngle: number): string {
        var windDirection = '';

        if ((windAngle >= 348.75 && windAngle <= 360) || windAngle < 11.25) {
            windDirection = 'N';
        } else if (11.25 <= windAngle && windAngle < 33.75) {
            windDirection = 'NNE';
        } else if (33.75 <= windAngle && windAngle < 56.25) {
            windDirection = 'NE';
        } else if (56.25 <= windAngle && windAngle < 78.75) {
            windDirection = 'ENE';
        } else if (78.75 <= windAngle && windAngle < 101.25) {
            windDirection = 'E';
        } else if (101.25 <= windAngle && windAngle < 123.75) {
            windDirection = 'ESE';
        } else if (123.75 <= windAngle && windAngle < 146.25) {
            windDirection = 'SE';
        } else if (146.25 <= windAngle && windAngle < 168.75) {
            windDirection = 'SSE';
        } else if (168.75 <= windAngle && windAngle < 191.25) {
            windDirection = 'S';
        } else if (191.25 <= windAngle && windAngle < 213.75) {
            windDirection = 'SSW';
        } else if (213.75 <= windAngle && windAngle < 236.25) {
            windDirection = 'SW';
        } else if (236.25 <= windAngle && windAngle < 258.75) {
            windDirection = 'WSW';
        } else if (258.75 <= windAngle && windAngle < 281.25) {
            windDirection = 'W';
        } else if (281.25 <= windAngle && windAngle < 303.75) {
            windDirection = 'WNW';
        } else if (303.75 <= windAngle && windAngle < 326.25) {
            windDirection = 'NW';
        } else if (326.25 <= windAngle && windAngle < 348.75) {
            windDirection = 'NNW';
        }

        return windDirection;
    }

    /**
     * Determine the risk based on the UV index.
     * 
     * @param uvIndex The current measured UV index.
     * @returns The risk factor based on the UV index.
     */
    public getUVRisk(uvIndex: number): string {
        var uvRisk = '';

        if (uvIndex <= 2) {
            uvRisk = '(Low Risk)';
        } else if (uvIndex <= 5) {
            uvRisk = '(Moderate Risk)';
        } else if (uvIndex <= 7) {
            uvRisk = '(High Risk)';
        } else if (uvIndex <= 10) {
            uvRisk = '(Very High Risk)';
        } else if (uvIndex >= 11) {
            uvRisk = '(Extreme Risk)';
        }

        return uvRisk;
    }

    public getActiveAlerts(): string {
        var alertMessage = '';
        const nowIndex = 0;

        const maxGust = this.getMaxGustSpeed();
        const maxWind = this.getMaxWindSpeed();
        const maxTemp = this.getMaxTemp();
        const windChill = this.getWindChill(this.weatherData[nowIndex].tempf, this.weatherData[nowIndex].winddir_avg10m);
        const hourlyRain = this.weatherData[nowIndex].hourlyrainin;
        
        if ((maxGust >= 46 && maxGust <= 57) || (maxWind >= 31 && maxWind >= 39)) {
            alertMessage = "WIND ADVISORY";
        } else if (maxGust >= 58 || maxWind >= 40) {
            alertMessage = "HIGH WIND WARNING";
        } else if (maxTemp < 105 && maxTemp >= 100) {
            alertMessage = "HEAT ADVISORY";
        } else if (maxTemp >= 105) {
            alertMessage = "EXCESSIVE HEAT WARNING";
        } else if (maxTemp <= 50 && maxWind >= 5 && windChill <= -25) {
            alertMessage = "WIND CHILL WARNING";
        } else if (maxTemp <= 50 && maxWind >= 5 && windChill <= -15 && windChill > -25) {
            alertMessage = "WIND CHILL ADVISORY";
        } else if (hourlyRain >= 1 && maxGust >= 58) {
            alertMessage = "SEVERE THUNDERSTORM WARNING";
        } else if (hourlyRain >= 3) {
            alertMessage = "FLASH FLOOD WARNING";
        } else {
            alertMessage = "";
        }

        return alertMessage;
    }

    public getMaxTemp(): number {
        var maxTemp = 0;
        for (var data of this.weatherData) {
            if (data.tempf > maxTemp) {
                maxTemp = data.tempf;
            }
        }
        return maxTemp;
    }

    public getMaxGustSpeed(): number {
        var maxTemp = 0;
        for (var data of this.weatherData) {
            if (data.windgustmph > maxTemp) {
                maxTemp = data.tempf;
            }
        }
        return maxTemp;
    }

    public getMaxWindSpeed(): number {
        var maxTemp = 0;
        for (var data of this.weatherData) {
            if (data.windspdmph_avg10m> maxTemp) {
                maxTemp = data.tempf;
            }
        }
        return maxTemp;
    }

    public getWindChill(temperature: number, windSpeed: number): number {
        return 35.74 + (0.6215 * windSpeed) - Math.pow((35.75 * temperature), 0.16) + Math.pow((0.4275 * temperature * windSpeed), 0.16);
    }

    public getPressureMbar(pressure: number): number {
        return pressure * 33.8639;
    }

    public getCurrentTimeEST(): Date {
        return new Date();
    }

    public getTemperatureTrend(time: Date): number {
        if (new Date(this.sunData.sunrise).getHours() <= new Date(time).getHours() && new Date(time).getHours() < new Date( this.sunData.solar_noon).getHours()) {
            return 1;
        } else if (new Date(time).getHours() >= new Date(this.sunData.solar_noon).getHours() && new Date(time).getHours() < new Date(this.sunData.sunset).getHours()) {
            return -1;
        } else if (new Date(time).getHours() >= new Date(this.sunData.sunset).getHours()) {
            return 1;
        }
        return 1;
    }

    public getPressureDataTrend(timeDifference: number) {
        var compareToIndex = timeDifference * 5;
        if (compareToIndex > 280) {
            compareToIndex = 280;
        }

        return (this.weatherData[compareToIndex].baromrelin - this.weatherData[0].baromrelin) / (compareToIndex);
    }

    public getHumidityDataTrend(timeDifference: number) {
        var compareToIndex = timeDifference * 5;
        if (compareToIndex > 280) {
            compareToIndex = 280;
        }

        return (this.weatherData[compareToIndex].humidity - this.weatherData[0].humidity) / (compareToIndex);
    }

    public getTemperatureDataTrend(timeDifference: number) {
        var compareToIndex = timeDifference * 12;
        if (compareToIndex > 280) {
            compareToIndex = 280;
        }

        return (this.weatherData[compareToIndex].tempf - this.weatherData[0].tempf) / (compareToIndex);
    }

    public getWeatherIcon(weatherCondition: string, time: Date) {
        const isDaytime = new Date(time).getHours() >= new Date(this.sunData.sunrise).getHours() && new Date(time).getHours() < new Date(this.sunData.sunset).getHours();

        switch (weatherCondition) {
            case 'Rain':
                if (isDaytime) {
                    return faCloudSunRain;
                } else {
                    return faCloudMoonRain;
                }
            case 'Partly Cloudy':
            case 'Cloudy':
                if (isDaytime) {
                    return faCloudSun;
                } else {
                    return faCloudMoon;
                }
            case 'Sunny':
                return faSun;
            case 'Clear':
                return faMoon;
            case 'Windy':
            case 'Breezy':
                return faWind;
            case 'Foggy':
                return faSmog;
            case 'Stormy':
                return faThunderstorm;
        }
    }

    public getWeatherCondition(): string {
        var weatherCondition = '';

        const maxWindSpeed = this.weatherData[0].windspdmph_avg10m;
        const isDaytime = new Date(this.getCurrentTimeEST()).getHours() >= new Date(this.sunData.sunrise).getHours() 
            && new Date(this.getCurrentTimeEST()).getHours() < new Date(this.sunData.sunset).getHours();

        if (this.weatherData[0].hourlyrainin > 0) {
            weatherCondition = 'Rain';

            if (this.getPressureDataTrend(3) < -0.2) {
                weatherCondition = 'Storms';
            }
        } else if (maxWindSpeed >= 15 && maxWindSpeed < 20) {
            weatherCondition = 'Breezy';
        } else if (maxWindSpeed >= 20) {
            weatherCondition = 'Windy';
        } else if (this.weatherData[0].humidity >= 100 && this.weatherData[0].tempf - this.weatherData[0].dewPoint <= 4.5) {
            weatherCondition = 'Foggy';
        } else {
            if (isDaytime) {
                if (this.weatherData[0].uv > 3) {
                    weatherCondition = 'Sunny';
                } else if (this.weatherData[0].uv <= 3 && this.weatherData[0].uv >= 2) {
                    weatherCondition = 'Partly Cloudy';
                } else {
                    weatherCondition = 'Cloudy';
                }
            } else {
                if (this.getPressureDataTrend(3) < -0.2) {
                    weatherCondition = 'Cloudy';
                } else {
                    weatherCondition = 'Clear';
                }
            }
        }

        return weatherCondition;
    }
}