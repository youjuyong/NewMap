export declare module CommonType {

    export type RootStackPageList = {
                     default : undefined;
                        home : undefined;
              locationSearch : undefined;
        arrivalStationSearch : undefined;
                   timeTable : undefined;
                       login : undefined;
                      myInfo : undefined;
                 favorSubway : undefined;
       favorSubwayArriveInfo : undefined;
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

export interface NaverAuthType {
    canGoForward : boolean,
    loading : true,
    title : string,
    canGoBack : boolean,
    locakIdentifier : number,
    url : string,
    target : any
}

export interface KakaoLoginProfileType {
    data : {
        id : number,
        connected_at : string
    },
    status : number,
    url : string,
}

export type RootStackParamList = {
  Home: undefined,
  Movie: {
    id: number;
    title: string;
    overview: string;
    voteCount: number;
  },
  Login: {
    id: number;
    title: string;
    overview: string;
    voteCount: number;
  },
  login: {
    id: number;
    title: string;
    overview: string;
    voteCount: number;
  },
  home : any,
};

export interface RouteSubWayInfo {
  STATION_NM : string,
  STATION_CD : string,
  X_CRDN : string,
  Y_CRDN : string,
  CHANGE_STAT_YN : string
} 

export interface  locationType {
  latitude : number | undefined,
  longitude : number | undefined,
  subWayInfoList : RouteSubWayInfo[] | any
}

export interface RouteInfoState {
   routeSubwayInfo: any;
  setRouteSubwayInfo: (e : locationType) => void;
}