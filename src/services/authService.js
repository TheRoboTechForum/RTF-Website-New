// src/services/authService.js
// ─────────────────────────────────────────────────────────────
// ALL calls to our backend's /api/auth/* routes live here.
// Components NEVER call axios directly — they call these
// functions. This is what makes it easy to change the API base
// URL, add auth headers globally, or swap libraries later,
// without touching every component.
// ─────────────────────────────────────────────────────────────

import axios from 'axios';

// Single axios instance, configured once, reused everywhere.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://localhost:5000/api
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Registers a new user (member self-registration).
 * @param {object} formData - matches the backend's registerSchema shape
 *   (name, collegeEnrollmentNo, collegeEmail, personalEmail, branch,
 *    yearOfPassing, phone, domain, password)
 * @returns {Promise<object>} data from a successful response
 * @throws {object} a normalized error: { message, fieldErrors? }
 */
export async function registerUser(formData) {
  try {
    const response = await api.post('/auth/register', formData);
    // Backend always responds { success: true, data: {...} } on success
    return response.data.data;
  } catch (error) {
    // Axios puts the server's JSON body in error.response.data.
    // We normalize it here so components don't need to know
    // anything about axios's error shape — just { message, fieldErrors }.
    if (error.response) {
      // Server responded with an error status (400, 409, 500...)
      throw {
        message: error.response.data.error || 'Registration failed',
        fieldErrors: error.response.data.fieldErrors || null,
      };
    } else if (error.request) {
      // Request was sent but no response came back — server down,
      // no internet, CORS issue, etc.
      throw { message: 'Could not reach the server. Check your connection.' };
    } else {
      // Something went wrong just building the request
      throw { message: 'Something went wrong. Please try again.' };
    }
  }
}