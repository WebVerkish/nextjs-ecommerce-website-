export const  generateCouponCode = (title='',expiryDate='')=>{
    const formattedTilte = title.toUpperCase().replace(/\s+/g,"");
    const formatterExpiryDate = expiryDate.split("-").reverse().join("");

    const couponCode = `${formattedTilte}-${formatterExpiryDate}`;
    return couponCode;
}