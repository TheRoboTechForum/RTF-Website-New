// src/services/authService.js
// ─────────────────────────────────────────────────────────────
// ALL calls to our backend's /api/auth/* routes live here.
// Components NEVER call axios directly — they call these
// functions. This is what makes it easy to change the API base
// URL, add auth headers globally, or swap libraries later,
// without touching every component.
// ─────────────────────────────────────────────────────────────

import { API_ENDPOINTS, apiClient } from '../config/apiConfig';

function normalizeAuthError(error, fallbackMessage) {
  if (error.response) {
    throw {
      message: error.response.data.error || fallbackMessage,
      fieldErrors: error.response.data.fieldErrors || null,
    };
  }

  if (error.request) {
    throw { message: 'Could not reach the server. Check your connection.' };
  }

  throw { message: 'Something went wrong. Please try again.' };
}

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
    const config = formData instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};

    const response = await apiClient.post(API_ENDPOINTS.auth.register, formData, config);
    return response.data;
  } catch (error) {
    normalizeAuthError(error, 'Registration failed');
  }
}

export async function loginUser(credentials) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
    return response.data.data;
  } catch (error) {
    normalizeAuthError(error, 'Unable to sign in. Please try again.');
  }
}
