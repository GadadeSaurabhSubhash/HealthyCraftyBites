import axiosInstance from './AxiosInstance';

export const getBusinessInsights = () => {
    return axiosInstance.get('/analyticsservice/insights');
};
