
const axios = require('axios');

const BASE_URL = "https://admin.adclubmadras.com/api";

async function checkApi() {
    try {
        const [gallery, category, photos] = await Promise.all([
            axios.get(`${BASE_URL}/gallery`),
            axios.get(`${BASE_URL}/gallerycategory`),
            axios.get(`${BASE_URL}/galleryphotos`)
        ]);

        console.log("Gallery Data Sample:", gallery.data[0]);
        console.log("Category Data Sample:", category.data[0]);
        console.log("Photos Data Sample:", photos.data[0]);

        console.log("Gallery Type:", typeof gallery.data);
        console.log("Category Type:", typeof category.data);
    } catch (e) {
        console.error(e);
    }
}

checkApi();
