import { IWeatherData } from "../domain/weatherdata.domain";
import { AxiosServiceHelper } from "./axiosservicehelper.service";
import { ISunData } from "../domain/sundata.domain";

const API_KEY = '9258f994d53042ca9bcbe7f5cc44dfbbfa366e4ca4ac43c19a33268a6e060cb6';
const APPLICATION_KEY = '78a34a92bffc4cc8962e87525a8a35f843e1d5dda7a94c3f88114283d16389ed';
const DEVICE_MAC_ADDRESS = 'E8:DB:84:E4:03:97';
const LATITUDE = '42.982563';
const LONGITUDE = '-77.408882';

export default class IWeatherDataService {
    private readonly serviceHelper: AxiosServiceHelper;
    private baseStationUrl: string = `https://api.ambientweather.net/v1/devices/${DEVICE_MAC_ADDRESS}?apiKey=${API_KEY}&applicationKey=${APPLICATION_KEY}`;
    private baseSunUrl: string = `https://api.sunrise-sunset.org/json?lat=${LATITUDE}&lng=${LONGITUDE}&date=today&formatted=0`;

    constructor(
        serviceHelper?: AxiosServiceHelper
    ) {
        this.serviceHelper = serviceHelper ?? new AxiosServiceHelper();
    }

    public getWeatherData(): Promise<IWeatherData[]> {
        return this.serviceHelper.fetchList<IWeatherData>({
            url: this.baseStationUrl
        });
    }

    public getWeatherDataEndDate(endDate: Date): Promise<IWeatherData[]> {
        // TODO: Implement date conversion and modify query
        return this.serviceHelper.fetchList<IWeatherData>({
            url: this.baseStationUrl
        });
    }

    public getSunData(): Promise<ISunData> {
        return this.serviceHelper.fetch<ISunData>({
            url: this.baseSunUrl
        });
    }
}