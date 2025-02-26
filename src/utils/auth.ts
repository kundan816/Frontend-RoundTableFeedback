export function setLoggedInUser(user: any) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("roundtable_user", JSON.stringify(user)); 
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }
}

export function getLoggedInUser() {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("roundtable_user"); 
    if (userString) {
      try {
        const user = JSON.parse(userString);
        console.log("Parsed User:", user); 
        return {
          ...user,
          admin: Boolean(user.admin), 
          employeeType: user.employeeType || "B6", 
        };
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
  }
  return null;
}

export function clearLoggedInUser() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("roundtable_user");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  }
}

export const getUserRole = (email: string): "admin" | "employee" => {
  const ADMIN_EMAILS = ["rajshorya893@gmail.com"]; 
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? "admin" : "employee";
};
