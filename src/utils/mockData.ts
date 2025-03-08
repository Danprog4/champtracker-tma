/**
 * Default mock data for development environment
 * This file contains constants that can be used throughout the app
 * to ensure consistent mock data for development
 */

/**
 * Get mock init data for Telegram WebApp
 * This mimics the data that would be passed from Telegram to the WebApp
 */
export const getMockInitData = (): string => {
  // First try to get it from the environment
  if (process.env.MOCK_INIT_DATA) {
    return process.env.MOCK_INIT_DATA;
  }

  // Fallback to a hardcoded test user
  return "query_id=AAEHBS8DAQAAAIQFLwOGYqCh&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1612345678&hash=abcdef1234567890abcdef1234567890abcdef1234567890";
};

/**
 * Get mock user data for development
 * This can be used for creating test users or mocking auth
 */
export const getMockUser = () => {
  return {
    id: 123456789,
    first_name: "Test",
    last_name: "User",
    username: "testuser",
    language_code: "en",
    photo_url: undefined,
  };
};

// Export a default user ID for development testing
export const MOCK_USER_ID = 123456789;
