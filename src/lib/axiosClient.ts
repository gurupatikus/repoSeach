import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    },
});

export default axiosClient;