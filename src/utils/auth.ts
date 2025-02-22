export function setLoggedInUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('roundtable_user', JSON.stringify(user));
    }
  }
  
  export function getLoggedInUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('roundtable_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
  
  export function clearLoggedInUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('roundtable_user');
    }
  }
  