export interface User {
    id: string;
    email: string;
    name: string;
    // Add any other user-related fields here
    avatarUrl?: string;
    // Example of optional fields
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }