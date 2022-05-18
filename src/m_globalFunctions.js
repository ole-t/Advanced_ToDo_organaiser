export { myRandomId };

function myRandomId() {
    let dateNow = Date.now();
    let rndmNumb = Math.floor(Math.random() * 1000000000);
    let rndmSum = dateNow + '_' + rndmNumb;
    return (rndmSum);
}