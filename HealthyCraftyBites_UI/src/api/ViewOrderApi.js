import axiosInstance from "./AxiosInstance";

export const viewOrder = async (orderNo) => {
  try {
    const response = await axiosInstance.get(`/cashcounter/orders/${orderNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderByNumber = async (orderNo) => {
  try {
    const response = await axiosInstance.get(`/cashcounter/orders/${orderNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const placeOrderPayment = async (orderNo, paymentMode) => {
  try {
    const response = await axiosInstance.post(`/cashcounter/orders/${orderNo}/payment`, {
      orderNumber: orderNo,
      paymentMode
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
