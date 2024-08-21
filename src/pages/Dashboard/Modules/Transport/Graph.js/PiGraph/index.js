import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Sample data
const carData = [
    { plateNumber: 'ABC123', petrol: 300, service: 200, other: 50 },
    { plateNumber: 'XYZ123', petrol: 40, service: 100, other: 20 },
    { plateNumber: 'XYZ456', petrol: 110, service: 90, other: 20 },
    { plateNumber: 'XYZ789', petrol: 50, service: 105, other: 10 },
];

const PieGraph = () => {
    const [selectedCar, setSelectedCar] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = () => {
        const car = carData.find(car => car.plateNumber === selectedCar);
        if (car) {
            const fetchedData = {
                labels: ['Petrol', 'Service', 'Other'],
                datasets: [
                    {
                        label: 'Car Data',
                        data: [car.petrol, car.service, car.other],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgb(255, 99, 132)', 'rgba(255, 206, 86, 1)'],
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
                paddingBottom: '50%', 
            }}>
                {data && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}>
                        <Pie
                            data={data}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                let label = context.label || '';
                                                if (label) {
                                                    label += ': ';
                                                }
                                                if (context.parsed !== null) {
                                                    label += `${context.parsed}%`;
                                                }
                                                return label;
                                            },
                                        },
                                    },
                                },
                                layout: {
                                    padding: 10,
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PieGraph;
