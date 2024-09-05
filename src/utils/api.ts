import axios from "axios";

export const fetchGlobalData = () => axios.get('https://disease.sh/v3/covid-19/all');
export const fetchCountryData = () => axios.get('https://disease.sh/v3/covid-19/countries');
export const fetchHistoricalData = () => axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
