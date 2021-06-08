const toFixed = (inputNumber) => {
    let outputNumber = inputNumber;
    if (Math.abs(outputNumber) < 1.0) {
        const e = parseInt(outputNumber.toString().split('e-')[1], 10);
        if (e) {
            outputNumber *= (10 ** (e - 1));
            outputNumber = `0.${(new Array(e)).join('0')}${outputNumber.toString().substring(2)}`;
        }
    } else {
        let e = parseInt(outputNumber.toString().split('+')[1], 10);
        if (e > 20) {
            e -= 20;
            outputNumber /= (10 ** e);
            outputNumber += (new Array(e + 1)).join('0');
        }
    }
    return outputNumber;
};

const PriceDisplay = {
    nbDecimal: 3,
    toFixedTrunc(inputNumber) {
        const outputNumber = toFixed(inputNumber);

        const splitNumber = (typeof outputNumber === 'string' ? outputNumber : outputNumber.toString()).split('.');
        const integerPart = splitNumber[0];
        if (this.nbDecimal <= 0) return parseFloat(integerPart);
        let decimalPart = splitNumber[1] || '';
        if (decimalPart.length > this.nbDecimal) return parseFloat(`${integerPart}.${decimalPart.substr(0, this.nbDecimal)}`);
        while (decimalPart.length < this.nbDecimal) decimalPart += '0';
        return parseFloat(`${integerPart}.${decimalPart}`);
    },
};

export default PriceDisplay;
