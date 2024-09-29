export const formatTemperature = ( temperature: number ) => {
    const kelvin = 237.15;
    return parseInt((temperature - kelvin).toString());
};