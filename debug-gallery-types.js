
const axios = require('axios');
const BASE_URL = "https://admin.adclubmadras.com/api";

async function analyzePhotos() {
    try {
        const { data: photos } = await axios.get(`${BASE_URL}/galleryphotos`);

        console.log("Total Photos:", photos.length);

        const types = {};
        let matchesWithGalleryType = 0;
        let matchesWithEmptyType = 0;

        photos.forEach(p => {
            types[p.type] = (types[p.type] || 0) + 1;
            if (p.type === 'gallery') matchesWithGalleryType++;
            if (!p.type) matchesWithEmptyType++;
        });

        console.log("Type Distribution:", types);
    } catch (e) {
        console.error(e);
    }
}

analyzePhotos();
