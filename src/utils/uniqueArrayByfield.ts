const uniqueArrayByfield = (array, field) => {
    let hashValue;
    const uniequeArray = [];
    array.forEach((item, index) => {
        if (!index || hashValue !== item[field]) {
            hashValue = item[field];
            uniequeArray.push(item);
        }
    });
    return uniequeArray;
};

export default uniqueArrayByfield;
