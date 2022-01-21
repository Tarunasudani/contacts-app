
export const validateEmail = (mail) => {
    let regExpressionMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(regExpressionMail)) {
        return true;
    }
    return false;
}

export const validatePhoneNumber = (phoneNumber) => {
    let regExpressionPhoneNumber = /^\d{10}$/;
    if(phoneNumber.match(regExpressionPhoneNumber)) {
        return true;
    }
    return false;
}