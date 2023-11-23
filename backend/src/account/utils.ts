export const getAccountNumber = () => {
    let digits = '';
    for (let i = 0; i < 11; i++) {
        digits += Math.floor(Math.random() * 10).toString();
    }
    return digits;
}