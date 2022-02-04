export interface Forecast {
    lat:             number;
    lon:             number;
    timezone:        string;
    timezone_offset: number;
    current:         Current;
    minutely:        Minutely[];
}

export interface Current {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    Weather[];
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Minutely {
    dt:            number;
    precipitation: number;
}