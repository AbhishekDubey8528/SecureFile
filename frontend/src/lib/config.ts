// Use relative paths to allow Vite proxy to handle API routing in development
// and native domain routing in production.
export const API_BASE_URL = "";

export const API_ENDPOINTS = {
  FILES: "/api/files",
  TEAM_FILES: "/api/files/team",
  SHARED_FILES: "/api/shared-files",
  AUTH: "/api/auth",
  MFA: "/api/mfa",
  ADMIN: "/api/admin",
  TEAM_MEMBERS: "/api/team/members",
  TEAM: {
    MEMBERS: "/api/team/members",
    UPDATE_ACCESS: (userId: number) => `/api/team/members/${userId}/access`,
    REMOVE_MEMBER: (userId: number) => `/api/team/members/${userId}`,
  }
} as const;