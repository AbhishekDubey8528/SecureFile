import { apiRequest } from "@/lib/queryClient";

export const verifyMfa = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiRequest("POST", "/api/mfa/verify", { token });
    const data = await response.json();
    const { token: newToken } = data;
    
    // Update the stored token
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
    
    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    console.error("Error verifying MFA:", error);
    throw error;
  }
};

export const disableMfa = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiRequest("POST", "/api/mfa/disable");
    const data = await response.json();
    const { token: newToken } = data;
    
    // Update the stored token
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
    
    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    console.error("Error disabling MFA:", error);
    throw error;
  }
}; 