// export function generateIsoFormattedDate(normalDate){
//     const dateObject = new Date(normalDate);
//     const isoFormattedDate = dateObject.toISOString();
//     return isoFormattedDate;
// }

export function generateIsoFormattedDate(normalDate) {
    if (!normalDate) {
        return new Date().toISOString(); // Default to current date
    }
    const date = new Date(normalDate);
    if (isNaN(date.getTime())) {
        return new Date().toISOString(); // Fallback for invalid dates
    }
    return date.toISOString();
}