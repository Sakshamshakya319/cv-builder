// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  USERS: {
    GENERATE_ID: `${API_BASE_URL}/api/users/generate-id`
  },
  CV: {
    SAVE: `${API_BASE_URL}/api/cv/save`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/cv/${id}`,
    GET_BY_USER: (userId) => `${API_BASE_URL}/api/cv/user/${userId}`,
    MARK_DOWNLOADED: (id) => `${API_BASE_URL}/api/cv/${id}/downloaded`,
    DELETE: (id) => `${API_BASE_URL}/api/cv/${id}`
  }
};

export default API_BASE_URL;