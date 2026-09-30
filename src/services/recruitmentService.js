import { apiClient, API_ENDPOINTS } from '../config/apiConfig';

export async function submitRecruitmentApplication(payload) {
	try {
		const response = await apiClient.post(API_ENDPOINTS.recruitment.register, payload);
		return response.data;
	} catch (error) {
		const responseData = error.response?.data;
		const message = error.response
			? responseData?.message || responseData?.error || 'The server rejected your application.'
			: 'Could not reach the recruitment server. Please try again.';
		const normalizedError = new Error(
			message
		);
		normalizedError.fieldErrors = responseData?.fieldErrors || {};
		throw normalizedError;
	}
}
