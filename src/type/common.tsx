export declare module CommonType {

    export type RootStackPageList = {
                     default : undefined;
                        home : undefined;
              locationSearch : undefined;
        arrivalStationSearch : undefined;
                   timeTable : undefined;
                       login : undefined;
                      myInfo : undefined;
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

export interface SubWayInfo {
    STATION_CD : number,
    STATION_NM : string,
    afterStationNm : string,
    preStationNm : string
} 

export interface FavorType {
    userId : any,
    statNm : string | undefined
    navigation : any
}