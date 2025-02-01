
export const genCode= (count, length = 6) => {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const usedCodes = new Set();
    const codes = [];

    while (codes.length < count) {
        let code = Array.from({ length }, () => alpha[Math.floor(Math.random() * alpha.length)]).join('');
        
        if (!usedCodes.has(code)) { // Ensure uniqueness
            usedCodes.add(code);
            codes.push(code);
        }
    }

    return codes;
};


