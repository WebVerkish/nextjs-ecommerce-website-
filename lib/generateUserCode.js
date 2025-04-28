export const generateUserCode=(name)=> {
    const sanitizedName = name.replace(/\s+/g, '').toUpperCase();
    const timestamp = new Date().getTime();
    const userCode = `${sanitizedName}_${timestamp}`;
    return userCode;
}

