export function generateInitials(fullName) {
    // Check if fullName is valid
    if (!fullName || typeof fullName !== 'string') {
      return ''; // Return empty string for invalid input
    }
  
    // Split the full name into an array of words and filter out empty strings
    const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);
  
    // If no valid words, return empty string
    if (words.length === 0) {
      return '';
    }
  
    // Get the first letter of each word and join them
    const initials = words.map(word => word.charAt(0)).join('');
  
    // Return uppercase initials
    return initials.toUpperCase();
  }
  