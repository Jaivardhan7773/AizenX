export const isAuthenticated = () => {
    const token = localStorage.getItem("Token");
    return !!token; 
  };
  
  export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.isAdmin; 
  };
  