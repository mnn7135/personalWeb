import weatherConfig from './weatherConfig.json'

export interface IWeatherConfig {
  // Data Configuration
  API_KEY: string,
  APPLICATION_KEY: string,
  DEVICE_MAC_ADDRESS: string,
  LATITUDE: number,
  LONGITUDE: number,
  BASE_STATION_URL: string,
  BASE_SUN_URL: string,

  // Cardinal Directions
  NORTH: string,
  SOUTH: string,
  EAST: string,
  WEST: string,

  // UV Risk Factors
  LOW_UV_RISK: string,
  MODERATE_UV_RISK: string,
  HIGH_UV_RISK: string,
  VERY_HIGH_UV_RISK: string,
  EXTREME_UV_RISK: string,

  // Warnings and Advisories
  WIND_ADVISORY: string,
  HIGH_WIND_WARNING: string,
  HEAT_ADVISORY: string,
  EXCESSIVE_HEAT_WARNING: string,
  WIND_CHILL_WARNING: string,
  WIND_CHILL_ADVISORY: string,
  SEVERE_THUNDERSTORM_WARNING: string,
  FLASH_FLOOD_WARNING: string,
  BLIZZARD_WARNING: string,
  NO_ALERTS: string,

  // Conversions
  INCHES_MERCURY_TO_MBAR_CONVERSION: number
}

export function loadWeatherConfig(): IWeatherConfig {
  console.log("Loaded the Weather Config.");
  return weatherConfig as IWeatherConfig;
}
