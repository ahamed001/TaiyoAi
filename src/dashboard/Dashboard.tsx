import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { CountryData, GlobalData, HistoricalData } from '../types/apiTypes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Fetch functions
const fetchGlobalData = async () => {
    const res = await axios.get<GlobalData>('https://disease.sh/v3/covid-19/all');
    return res.data;
};

const fetchCountryData = async () => {
    const res = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
    return res.data;
};

const fetchHistoricalData = async () => {
    const res = await axios.get<HistoricalData>('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return res.data;
};

const Dashboard = () => {
    // Fetch worldwide data
    const { data: globalData, error: globalDataError } = useQuery<GlobalData>({
        queryKey: ['globalData'],
        queryFn: fetchGlobalData,
    });

    // Fetch country-specific data
    const { data: countryData, error: countryDataError } = useQuery<CountryData[]>({
        queryKey: ['countryData'],
        queryFn: fetchCountryData,
    });

    // Fetch historical data for the graph
    const { data: historicalData, error: historicalDataError } = useQuery<HistoricalData>({
        queryKey: ['historicalData'],
        queryFn: fetchHistoricalData,
    });

    // Handle errors
    if (globalDataError || countryDataError || historicalDataError) {
        return <div>Error loading data</div>;
    }

    // Prepare data for the line chart
    const chartData = historicalData
        ? {
            labels: Object.keys(historicalData.cases),
            datasets: [
                {
                    label: 'Cases',
                    data: Object.values(historicalData.cases),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
            ],
        }
        : null;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h2>
            <div className="mb-8">
                {chartData && (
                    <Line
                        data={chartData}
                        options={{ responsive: true, maintainAspectRatio: false }}
                        height={400}
                    />
                )}
            </div>

            <div className="h-[500px]">
                <MapContainer center={[20, 0]} zoom={2} maxZoom={16} minZoom={2} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {countryData &&
                        countryData.map((country) => (
                            <Marker
                                key={country.countryInfo._id || country.country}
                                position={[country.countryInfo.lat, country.countryInfo.long]}
                            >
                                <Popup>
                                    <h3>{country.country}</h3>
                                    <p>Active Cases: {country.active}</p>
                                    <p>Recovered: {country.recovered}</p>
                                    <p>Deaths: {country.deaths}</p>
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Dashboard;
