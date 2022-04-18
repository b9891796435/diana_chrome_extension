function getTime(){
    let arrayToReturn: string[]=[]
    let hNow = Date().split(" ")
    let current=hNow[4].split(":")
    arrayToReturn.push(hNow[3]+hNow[1]+hNow[2]);
    arrayToReturn.push(current[0]);
    arrayToReturn.push(current[1]);
    arrayToReturn.push(current[2]);
    return arrayToReturn;
}
export default getTime;