export declare module CommonType {

    export type RootStackPageList = {
        default : undefined;
        home : undefined;
        locationSearch : undefined;
        arrivalStationSearch : undefined;
    }
}

export interface ArrivalInfo {
          LINE_NUM ?: string ,
         SUBWAY_ID ?: number,
    afterStationNm ?: string,
      preStationNm ?: string,
         upArrival ?: Array<Object>,
       downArrival ?: Array<Object>,
           subName ?: string
}