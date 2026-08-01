import axiosInstance from "./axiosInstance";

export const fetchTransactionsByFilter = async (mode = 'all') => {
  try {
    const config = {};
    if (mode && mode !== 'all') {
      config.params = { paymentMode: mode };
    }
    const response = await axiosInstance.get('/cashcounter/orders', config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
