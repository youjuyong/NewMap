interface Coord {
    latitude : number;
    longitude : number;
}

interface Region extends Coord {
    latitudeDelta : number;
    longitudeDelta: number;
}

export {};