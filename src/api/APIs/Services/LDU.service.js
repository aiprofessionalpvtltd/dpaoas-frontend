import { axiosClient } from "..";

export const getAllLawActs = async(currentPage ,pageSize)=> {
    try {
        const response = await axiosClient.get(
            `/lawActs?currentPage=${currentPage}&pageSize=${pageSize}`,
        );
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
}

export const deleteLawActsBill = async (id) => {
    try {
      const response = await axiosClient.delete(
        `/lawActs/delete/${id}`
        
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };

  export const getLawActsBillById = async (id) => {
    try {
        const response = await axiosClient.get(
            `/lawActs/${id}`,
        );
        console.log("get lawActs by Id",response?.data)
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const updateLawActsBill = async (id, data) => {
    try {
        const response = await axiosClient.put(
            `/LawActs/update/${id}`, data
        );
        console.log("updated data",response?.data)
        return response?.data;
    } catch (error) {
        console.error("Error fetching API endpoint:", error);
        throw error;
    }
};

export const createLawActsBill = async (data) => {
    try {
      const response = await axiosClient.post(`/lawActs/create`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error fetching API endpoint:", error);
      throw error;
    }
  };