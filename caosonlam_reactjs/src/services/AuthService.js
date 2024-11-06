// src/services/AuthService.js
import httpAxios from './httpAxios'; // Giả sử httpAxios đã được cấu hình sẵn

const API_URL = 'http://localhost:8000/api'; // Cập nhật URL cơ bản

const register = async (formData) => { // Thay đổi tham số để nhận formData
    try {
        const response = await httpAxios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đặt header cho multipart
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error during registration:', error); // In ra lỗi nếu có
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
};


const login = async (email, password) => {
    try {
        const response = await httpAxios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error during login:', error.response.data); // In ra lỗi từ phản hồi
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
};


export default {
    register,
    login,
};
