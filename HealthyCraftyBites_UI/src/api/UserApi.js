import axiosInstance from './AxiosInstance';

export const getUserProfile = (username) => {
    return axiosInstance.get(`/userservice/profile/${username}`);
};

export const updateUserProfile = (username, profileData) => {
    return axiosInstance.put(`/userservice/profile/${username}`, profileData);
};

export const addFavorite = (favoriteData) => {
    return axiosInstance.post('/userservice/favorites/add', favoriteData);
};

export const getFavorites = (username) => {
    return axiosInstance.get(`/userservice/favorites/${username}`);
};

export const removeFavorite = (username, favoriteId) => {
    return axiosInstance.delete(`/userservice/favorites/${username}/${favoriteId}`);
};

export const addProductReview = (reviewData) => {
    return axiosInstance.post('/userservice/reviews/add', reviewData);
};

export const getProductReviews = (productId) => {
    return axiosInstance.get(`/userservice/reviews/product/${productId}`);
};

export const getAllReviews = () => {
    return axiosInstance.get('/userservice/reviews/all');
};
