// lib/api.js
import axios from "axios";
import { cache } from "react";

const BASE_URL = "https://admin.adclubmadras.com/api";

export const getoptions = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getoptions`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getPastPresidents = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/pastpresidents`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getExecutiveCommittee = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/executive-comittee`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getEvents = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// ✅ NEW: Get events by category slug
export const getEventsSlug = cache(async (categorySlug, filters = {}) => {
    const res = await axios.get(`${BASE_URL}/events/category/${categorySlug}`, {
        params: filters, // optional query parameters: { search, from, to, partner_event }
    });
    return res.data.events; // return only event list
});

export const getEventsCategory = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/eventscategory`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getGallery = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/gallery`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getGalleryCategory = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/gallerycategory`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getGalleryPhotos = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/galleryphotos`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getUpcommingEvents = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/events`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getHomeGellery = cache(async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/gallery`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const memberLogin = async (data) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        userEmail: data.email,
        userPassword: data.password,
    });
    return response.data;
};

export const memberRegister = async (formData) => {
    const payload = {
        signUpEmail: formData.email,
        signUpFullName: formData.name,
        signUpPassword: formData.password,
        signUpPassword_confirmation: formData.confirmPassword,
    };
    const response = await axios.post(`${BASE_URL}/register`, payload);
    return response.data;
};

export const forgotPassword = async (forgotEmail) => {
    const response = await axios.post(`${BASE_URL}/forgotpassword`, { forgotEmail });
    return response.data;
};

export const forgotPasswordReset = async (payload) => {
    const response = await axios.post(`${BASE_URL}/resetpassword/:id`, payload);
    return response.data;
};

// ✅ Get User Details
export const getUserDetails = async (payload) => {
    return await axios.post(`${BASE_URL}/user/getprofile`, payload);
};

// ✅ Update Profile
export const updateUserProfile = async (payload) => {
    return await axios.post(`${BASE_URL}/user/updateprofile`, payload);
};

// ✅ Change Password
export const changeUserPassword = async (payload) => {
    return await axios.post(`${BASE_URL}/user/updatepassword`, payload);
};

export const submitMembershipApplication = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/membership/apply`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

export const submitMembershipRenewal = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/membership/renewal`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

export const getMembershipDetails = async (payload) => {
    return await axios.post(`${BASE_URL}/membership-details`, payload);
};

export const postContactForm = async (data) => {
    const response = await axios.post(`${BASE_URL}/contact`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const postJobApplication = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/job-opportunity`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Job Application Error:", error.response?.data || error.message);
        throw error;
    }
};
