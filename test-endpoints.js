
const axios = require('axios');
const BASE_URL = "https://admin.adclubmadras.com/api";

const testEndpoints = async () => {
    try {
        console.log("Testing specific endpoints...");

        // Try getting a single gallery by ID (assuming ID 1 exists from previous logs)
        try {
            const res1 = await axios.get(`${BASE_URL}/gallery/1`);
            console.log("Success /gallery/1:", res1.status);
        } catch (e) {
            console.log("Failed /gallery/1:", e.response?.status || e.message);
        }

        // Try query param for gallery
        try {
            const res2 = await axios.get(`${BASE_URL}/gallery?id=1`);
            console.log("Success /gallery?id=1:", res2.status);
        } catch (e) {
            console.log("Failed /gallery?id=1:", e.response?.status || e.message);
        }

        // Try getting photos for specific gallery
        try {
            const res3 = await axios.get(`${BASE_URL}/galleryphotos?gallery_id=1`);
            console.log("Success /galleryphotos?gallery_id=1:", res3.status, "Length:", res3.data.length);
        } catch (e) {
            console.log("Failed /galleryphotos?gallery_id=1:", e.response?.status || e.message);
        }

        // Try getting photos with ID path
        try {
            const res4 = await axios.get(`${BASE_URL}/galleryphotos/1`);
            console.log("Success /galleryphotos/1:", res4.status);
        } catch (e) {
            console.log("Failed /galleryphotos/1:", e.response?.status || e.message);
        }

    } catch (error) {
        console.error("Test failed:", error.message);
    }
};

testEndpoints();
