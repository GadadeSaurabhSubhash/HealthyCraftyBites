import axiosInstance from './AxiosInstance';

export const placeOrder = (orderData) => {
    return axiosInstance.post('/orderservice/orders/place', orderData);
};

export const getUserOrders = (username) => {
    return axiosInstance.get(`/orderservice/orders/user/${username}`);
};

export const getAllOrders = () => {
    return axiosInstance.get('/orderservice/orders/all');
};

export const updateOrderStatus = (orderId, newStatus) => {
    return axiosInstance.patch(`/orderservice/orders/status/${orderId}?newStatus=${newStatus}`);
};

export const updatePaymentStatus = (orderId, paymentStatus) => {
    return axiosInstance.patch(`/orderservice/orders/payment-status/${orderId}?paymentStatus=${paymentStatus}`);
};
