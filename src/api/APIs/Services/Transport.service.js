import { axiosClient } from "..";
import { getAuthToken } from "../../Auth";

export const createPurchase = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

export const getPurchaseById = async (id) => {
    try {
        const response = await axiosClient.get(`/files/${id}`, {
            headers: {
                accept: "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};
// GET: Fetch Purchases 
export const getPurchase = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// DELETE: Delete a Purchase by ID
export const deletePurchase = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// PUT: Update a Purchase by ID
export const updatePurchase = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// CRUD for LogBook - Petrol Mileage

// POST: Create A Petrol Mileage

export const createMileage = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: 'application/json',
                'Content-Type': "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};


export const getMileageById = async (data) => {
    try {
        // Create a FormData object
        const formData = new FormData();

        // Append data to the FormData object
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        const response = await axiosClient.post('/', formData, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API Endpoint:", error);
        throw error;
    }
};

// GET: Fetch Mileage
export const getMileage = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// DELETE: Delete a Mileage by ID
export const deleteMileage = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// PUT: Update Mileage by ID
export const updateMileage = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: 'application/json',
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// CRUD for Vehicle Movement

// POST: Create a Vehicle Movement
export const createMovement = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// GET: Fetch Movement
export const getMovement = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// DELETE: Delete Movement by ID
export const deleteMovement = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// PUT: Update Movement by ID
export const updateMovement = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// CRUD for Handed Over Form        

// POST: Create a Handed Over Form
export const createHandedForm = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// GET: Fetch Handed Over Form
export const getHandedForm = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
}

// DELETE: Delete Handed Over Form by ID
export const deleteHandedForm = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
}

// PUT: Update Handed Over Form by ID
export const updateHandedForm = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
}

// CRUD for Vehicles and Drivers

// CRUD for Vehicles

// POST: Create Vehicle
export const createVehicle = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// GET: Fetch Vehicles
export const getVehicles = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// DELETE: Delete Vehicles by ID
export const deleteVehicles = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// PUT: Update Vehicles by ID
export const updateVehicles = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// CRUD for Drivers

// POST: Create Drivers
export const createDrivers = async (data) => {
    try {
        const response = await axiosClient.post('/', data, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// GET: Fetch Drivers
export const getDrivers = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// DELETE: Delete Drivers by ID
export const deleteDrivers = async (id) => {
    try {
        const response = await axiosClient.delete(`/files/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};

// PUT: Update Drivers by ID
export const updateDrivers = async (id, updatedData) => {
    try {
        const response = await axiosClient.put(`/files/update/${id}`, updatedData, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching API EndPoint:", error);
        throw error;
    }
};



// CRUD for Summary

// GET: Fetch Drivers and Vehicles 
export const getDriversVehicles = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error Fetching API EndPoint:", error);
        throw error;
    }
};


// GET: Fetch Poll 
export const getPoll = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error Fetching API EndPoint:", error);
        throw error;
    }
};


// GET: Fetch Make and Model-Wise 
export const getMakeModel = async (currentPage, pageSize, userId) => {
    try {
        const response = await axiosClient.get(
            `/files?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
        );
        return response?.data;
    } catch (error) {
        console.error("Error Fetching API EndPoint:", error);
        throw error;
    }
};