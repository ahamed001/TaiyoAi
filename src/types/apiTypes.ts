// Type for global COVID-19 data
export interface GlobalData {
    cases: number;
    deaths: number;
    recovered: number;
}

// Type for country-specific COVID-19 data
export interface CountryData {
    country: string;
    countryInfo: {
        _id: string;
        lat: number;
        long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
}

// Type for historical data for the graph
export interface HistoricalData {
    cases: { [date: string]: number };
    deaths: { [date: string]: number };
    recovered: { [date: string]: number };
}
