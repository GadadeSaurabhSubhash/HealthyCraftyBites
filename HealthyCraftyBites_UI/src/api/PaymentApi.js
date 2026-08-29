import axiosInstance from './AxiosInstance';

export const processPayment = (paymentData) => {
    return axiosInstance.post('/paymentbillingservice/payment/process', paymentData);
};

export const getBillDetails = (orderNumber) => {
    return axiosInstance.get(`/paymentbillingservice/payment/bill/${orderNumber}`);
};

export const markOrderPaidAtCounter = (orderNumber, method = 'CASH_ON_COUNTER') => {
    return axiosInstance.post(`/paymentbillingservice/payment/mark-paid/${orderNumber}?method=${method}`);
};
