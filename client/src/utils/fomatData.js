
/**
 * 
 * @param {*} money chuỗi tiền tệ cần format 
 * @returns chuỗi tiền tệ đã được format
 * Author:NLB(11/09/2023)
 */
export const formatMoney = (money) => {
    return (+money).toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDate = () => {

};
export const formatEmail = () => {

};