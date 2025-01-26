import weatherConfig from '../weather/weatherConfig.json'

export interface IWeatherConfig {
  API_KEY: string,
  APPLICATION_KEY: string,
  DEVICE_MAC_ADDRESS: string,
  LATITUDE: number,
  LONGITUDE: number,
  BASE_STATION_URL: string,
  BASE_SUN_URL: string
}

export function loadWeatherConfig(): IWeatherConfig {
  console.log("Loaded the Weather Config.");
  return weatherConfig as IWeatherConfig;
}
