const MAX_VAL = 999999;
const MIN_VAL = 100000;

module.exports.createRandomKey = () => {
    return Math.floor(MIN_VAL + Math.random() * (MAX_VAL - MIN_VAL));
}