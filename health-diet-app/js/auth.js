// Utility functions for authentication and API calls
const API_BASE = 'http://localhost:5000/api';

function saveToken(token) {
    localStorage.setItem('jwtToken', token);
}

function getToken() {
    return localStorage.getItem('jwtToken');
}

function removeToken() {
    localStorage.removeItem('jwtToken');
}

// Register user
async function apiRegister(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// Login user
async function apiLogin(data) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// Get user profile (protected)
async function apiGetProfile() {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/profile`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Update user profile (protected)
async function apiUpdateProfile(data) {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(data)
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Add BMI (protected)
async function apiAddBMI({ height, weight }) {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/bmi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ height, weight })
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Add meal log (protected)
async function apiAddMealLog(entry) {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(entry)
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Get meal logs (protected)
async function apiGetMealLogs() {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/meals`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Add weight log (protected)
async function apiAddWeightLog(entry) {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/weights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(entry)
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}

// Get weight logs (protected)
async function apiGetWeightLogs() {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/weights`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.status === 401) { removeToken(); return null; }
    return res.json();
}
