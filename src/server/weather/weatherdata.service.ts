import { IWeatherData } from "../domain/weatherdata.domain";
import { AxiosServiceHelper } from "./axiosservicehelper.service";
import { ISunData } from "../domain/sundata.domain";
import { IWeatherConfig, loadWeatherConfig } from "./weatherconfig.service";

export default class IWeatherDataService {
    private readonly serviceHelper: AxiosServiceHelper;
    private config: IWeatherConfig = loadWeatherConfig();

    private baseStationUrl: string = this.config.BASE_STATION_URL;
    private baseSunUrl: string = this.config.BASE_SUN_URL;

    constructor (serviceHelper?: AxiosServiceHelper) {
        this.serviceHelper = serviceHelper ?? new AxiosServiceHelper();
    }

    /**
     * This function fetches weather data for the last 24 hours. This
     * data is returned in intervals of 5 minutes in a list.
     * 
     * @returns A list of weather data for today.
     */
    public getWeatherData(): Promise<IWeatherData[]> {
        return this.serviceHelper.fetchList<IWeatherData>({
            url: this.baseStationUrl
        });
    }

    /**
     * This function fetches weather data for the last 24 hours of a
     * specified end date. This data is returned in intervals of 5 minutes in a list.
     * 
     * @param endDate The day to fetch data for
     * @returns A list of weather data for today.
     */
    public getWeatherDataEndDate(endDate: Date): Promise<IWeatherData[]> {
        // TODO: Implement date conversion and modify query
        return this.serviceHelper.fetchList<IWeatherData>({
            url: this.baseStationUrl
        });
    }

    /**
     * This function returns the solar data for today.
     * 
     * @returns The solar data for today.
     */
    public getSunData(): Promise<ISunData> {
        return this.serviceHelper.fetch<ISunData>({
            url: this.baseSunUrl
        });
    }
}
