import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

const carData = [
    { plateNumber: 'ABC123', petrol: 300, service: 200, other: 50 },
    { plateNumber: 'XYZ123', petrol: 40, service: 100, other: 20 },
    { plateNumber: 'XYZ456', petrol: 110, service: 90, other: 20 },
    { plateNumber: 'XYZ789', petrol: 50, service: 105, other: 10 },
];

const LineGraph = () => {
    const [selectedCar, setSelectedCar] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = () => {
        const car = carData.find(car => car.plateNumber === selectedCar);
        if (car) {
            const fetchedData = {
                labels: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                    {
                        label: 'Petrol',
                        data: [car.petrol, car.petrol + 15, car.petrol + 30, car.petrol + 10, car.petrol + 20, car.petrol + 25, car.petrol + 5, car.petrol + 18, car.petrol + 23, car.petrol + 10, car.petrol + 12, car.petrol + 17],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Service',
                        data: [car.service, car.service + 5, car.service + 10, car.service + 20, car.service + 15, car.service + 5, car.service + 10, car.service + 12, car.service + 19, car.service + 21, car.service + 16, car.service + 13],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Other',
                        data: [car.other, car.other + 10, car.other + 5, car.other + 15, car.other + 10, car.other + 20, car.other + 5, car.other + 12, car.other + 22, car.other + 11, car.other + 14, car.other + 18],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1,
                    },
                ],
            };
            setData(fetchedData);
        }
    };

    return (
        <div className="container">
            <div className="d-flex flex-row mb-3">
                <select
                    className="form-select"
                    style={{ width: '33%', marginRight: '0.5rem' }}
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                >
                    <option value="" disabled>Car Plate Number</option>
                    {carData.map(car => (
                        <option key={car.plateNumber} value={car.plateNumber}>
                            {car.plateNumber}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="btn btn-success text-white"
                >
                    Show Graph
                </button>
            </div>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingBottom: '50%' /* Aspect ratio */,
                overflow: 'hidden'
            }}>
                {data && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}>
                        <Bar
                            data={data}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    zoom: {
                                        pan: {
                                            enabled: true,
                                            mode: 'x',
                                            threshold: 10, // Allows smoother panning
                                        },
                                        zoom: {
                                            enabled: true,
                                            mode: 'x',
                                            speed: 0.1, // Adjust speed for better control
                                            rangeMin: {
                                                x: 0,
                                            },
                                            rangeMax: {
                                                x: 11,
                                            },
                                            limits: {
                                                x: { min: 0, max: 11 }, // Set limits for the range
                                            },
                                        },
                                    },
                                },
                                layout: {
                                    padding: 10,
                                },
                                scales: {
                                    x: {
                                        min: 0, 
                                        max: 11, 
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            autoSkip: false,
                                        },
                                        barPercentage: 0.8,
                                        categoryPercentage: 1.0,
                                    },
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LineGraph;
