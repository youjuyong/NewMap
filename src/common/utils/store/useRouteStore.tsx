import { create } from 'zustand';
import { RouteSubWayInfo, locationType } from "../../../type/common";
import { RouteInfoState } from "../../../type/common";

const useRouteStore = create<RouteInfoState>( set => ({
    routeSubwayInfo : null,
    setRouteSubwayInfo : (routeSubwayInfo:locationType) => set({routeSubwayInfo}),
}))

export default useRouteStore;