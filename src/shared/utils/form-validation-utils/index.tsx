
/**
 * Checking number validation digits,backspace,tab,ctrl, c and v
 */
const isDigit = (char: string): boolean => {
    const digits = '0123456789';
    return digits.includes(char);
};

export const isBackspace = (key: string): boolean => {
    return key === 'Backspace';
};
export const isDelete = (key: string) => {
    return key === 'Delete';
}

export const isTab = (key: string): boolean => {
    return key === 'Tab';
};

export const isCtrl = (key: string): boolean => {
    return key === 'Control' || key === 'Ctrl';
};

export const isC = (key: string): boolean => {
    return key === 'c' || key === 'C';
};

export const isV = (key: string): boolean => {
    return key === 'v' || key === 'V';
};
export const isA = (key: string): boolean => {
    return key === 'a' || key === 'A';
};

export const isArrow = (key: string): boolean => {
    return key === 'ArrowLeft' || key === 'ArrowRight';
};

export const handleKeyDownNumber = (event: any) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    if (
        !isDigit(event.key) &&
        !isBackspace(event.key) &&
        !isDelete(event?.key) &&
        !isTab(event.key) &&
        !isArrow(event.key) &&
        !isCtrl(event.key) &&
        !(isV(event.key) && isCtrlPressed) &&
        !(isC(event.key) && isCtrlPressed) &&
        !(isA(event.key) && isCtrlPressed)
    ) {
        event.preventDefault();
    }
};



/**
 * Character validation
 */
const checkCharacter = (value: string): boolean => {
    for (let i = 0; i < value?.length; i++) {
        const charCode = value?.charCodeAt(i);
        if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122)
        ) {
            return true;
        }
    }
    return false;
};
export const isSpace = (character: string): boolean => {
    return character === " ";
};

export const isHyphen = (character: string): boolean => {
    return character === "-";
};
export const handleKeyDownAlphabet = (event: any) => {
    if (
        !checkCharacter(event.key) &&
        !isSpace(event.key) &&
        !isHyphen(event.key)
    ) {
        event.preventDefault();
    }
}