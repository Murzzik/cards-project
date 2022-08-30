export const convertDate = (date: string): string[] => {
    const dataTime = date.split('T');
    const x = dataTime[0].split('-').reverse().join('.');
    const y = dataTime[1].substring(0, 8);
    return [x, y];

};

//todo: convertor date
