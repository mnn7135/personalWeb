import { ISunDataResult } from "./sundataresult.domain";

export interface ISunData {
    results: ISunDataResult,
    status: string,
    tzid: string
}