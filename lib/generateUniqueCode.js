export const  generateUniqueCode =(prefix, fullName) =>{
    // Extract initials from full name
    const initials = fullName.split(" ").map(word => word[0].toUpperCase()).join("");
    
    // Get current timestamp
    const timestamp = Date.now();
    
    // Generate the unique user code
    return `${prefix}-${initials}-${timestamp}`;
}

