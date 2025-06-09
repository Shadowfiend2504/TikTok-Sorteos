import axios from 'axios';

const API_BASE_URL = 'https://api.tiktok.com'; // Replace with the actual TikTok API base URL

export const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const postUpdate = async (updateData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/update`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error posting update:', error);
        throw error;
    }
};

// Additional functions for interacting with the TikTok API can be added here.