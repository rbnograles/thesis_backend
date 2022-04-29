"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicates = void 0;
const checkDuplicates = (requestField, field) => {
    return (req, res, next) => {
        let fieldToCompare = field;
        const items = req.body[requestField];
        const duplicates = [];
        const valueArr = items.map((item) => {
            const arrayItem = Array.isArray(fieldToCompare)
                ? fieldToCompare.map((e) => item[e]).join(" ")
                : item[fieldToCompare];
            return arrayItem;
        });
        const sorted_arr = valueArr.slice().sort();
        for (let i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] === sorted_arr[i]) {
                duplicates.push(sorted_arr[i]);
            }
        }
        if (duplicates.length > 0)
            return res.status(400).json({
                success: false,
                message: `Duplicates for the ${fieldToCompare} property are found on this data set`,
                data: duplicates,
            });
        req.body = Object.assign(Object.assign({}, req.body), { [fieldToCompare]: valueArr });
        next();
    };
};
exports.checkDuplicates = checkDuplicates;
