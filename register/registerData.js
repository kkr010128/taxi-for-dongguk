let code = null;
let timeOver = false;
let webMail = null;

function setCode(tempCode) {
    code = tempCode;
}

function setTimeOver(boolean) {
    timeOver = boolean;
}

function setWebMail(str) {
    webMail = str;
}

export { timeOver, code, webMail, setCode, setTimeOver, setWebMail };