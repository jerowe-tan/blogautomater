interface AnyObject{
    [key: number|string|symbol]:any
}
/**
 * @info Use this to generate random number base on selected range
 * @param min Number should be the lowest range it can select on random
 * @param max Maximum allowable range of number
 * @param allowDecimal In case you want to include decimals instead of just whole number. It accepts false and number which is the length of decimal digits
 * @returns Random number between min and max params
 */
export function randomizer(min:number=0, max:number=Number.MAX_SAFE_INTEGER, allowDecimal:boolean|number= false){
    const randData = Math.random();
    const minMaxRand:number = randData * (max-min) + min;

    if(minMaxRand % 1 == 0)//If there is no decimal then return immediately
        return minMaxRand;
    
    if(allowDecimal){//If there is a decimal and arguments allowed it, then adjust decimal
        return adjustDecimal(minMaxRand, allowDecimal);
    }else{//If not then just remove the rest.
        return removeDecimal(minMaxRand);
    }
}

/**
 * @info Function that will remove a decimal to a number. If you pass a whole number it will just return that number;
 * @param number Value that will be use to remove decimal
 * @returns Whole number without decimal Value
 */
export function removeDecimal(number:number){
    return number >> 0; //By using module, the orig number minus the remainder of absolute 1 number. With this we remove the decimal
}

/**
 * @info This will transform a number like 1.68 to 2 basically any number that has decimal
 * @param number Value that you want to transform
 * @returns Transform value that is already CEIL
 */
export function ceil(number:number): number{
    if( number % 1 !== 0 ){
        return (number | 0) + 1;
    }
    return number;
}

/**
 * @info This will transform a number like 1.68 to 1 basically any number that has decimal
 * @param number Value that you want to transform
 * @returns Transform value that is already FLOOR
 */
export function floor(number:number): number{
    if( number % 1 !== 0  ){
        return number >> 0;
    }
    return number;
}

/**
 * @Info Transform a negative value or any value into a positive value
 * @param number Value that you want to transform
 * @returns Absolute number with no negative
 */
export function abs(number:number){
    return (0 < number ? number : -number);
}

export function adjustDecimal(number:number, addPlaceValue:boolean|number = true):number{
    const placeValue = typeof addPlaceValue === "boolean" ? (addPlaceValue===true?2:0) : Number(addPlaceValue);
    let result:number = Number(number.toFixed(placeValue));
    const precisionCheck:number = decimalCount(result);

    if(precisionCheck !== placeValue && precisionCheck !== 0){//If the two number decimals didn't match, then further adjustments is needed.
        const precising = String(result).split(".");
        precising[1] = precising[1].slice(0, placeValue);
        result = Number(precising.join("."))
    }

    return result;
}

export function decimalCount(number:number):number{
    const numArrStr = String(number).split(".");
    if(numArrStr.length == 2){
        return numArrStr[1].length;
    }
    return 0;
}

export interface SPLIT_NUMBER{
    sign: boolean,
    whole: number,
    decimal: number,
}
export function separateNumber(raw:number): SPLIT_NUMBER{
    const result: SPLIT_NUMBER = {
        sign: false,
        whole: 0,
        decimal: 0,
    }
    const splitRaw = raw.toString().split(".");
    if(splitRaw[0][0] == "-" ){//check if the first string has "-"
        result.sign = true;
        result.whole = Number(splitRaw[0].substring(1));
    }else{
        result.whole = Number(splitRaw[0]);
    }

    if(splitRaw.length == 2)//If there is decimal
        result.decimal = Number(splitRaw[1]);

    return result;
}

export function combineNumber(data: SPLIT_NUMBER, maintainString:boolean = false):string|number{
    let result = `${data.sign ? "-":""}${data.whole}${ data.decimal!==0 ? "."+data.decimal : "" }`;
    if(maintainString)
        return result;

    return Number(result)
}

export function padNumber(number:number, length:number):string{
    const raw = separateNumber(number); //The reason for separation is to prevent negative numbers from not having a pad
    if(length < 0)
        length = 0;
    const paddingValue = 10 ** length;
    if(paddingValue > raw.whole){
        const padValue = (paddingValue + raw.whole).toString().substring(1);
        return `${raw.sign?"-":""}${padValue}${raw.decimal?"."+raw.decimal:""}`;
    }
    return String(combineNumber(raw, true));
}
/**
 * @info Cut Only Whole Number, the decimal will be remove
 * @param number
 * @param cutWhere 
 */
export function fixedNumber(number:number, limit:number=2, cutWhere:"left"|"right" = "right"){
    const raw = separateNumber(number);
    switch(cutWhere){
        case "left":
            return Number((raw.sign ? "-" :"")+String(raw.whole).substring(0, limit));

        case "right":
            return Number((raw.sign ? "-" :"")+String(raw.whole).substring( String(raw.whole).length > limit ? String(raw.whole).length - limit : 0));
   
    }
}

export function numberAddComma(number:number) {
    const splittedNumber = separateNumber(number);
    return (splittedNumber.sign ? "-":"") + (splittedNumber.whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + (splittedNumber.decimal !== 0 ? "."+splittedNumber.decimal : "");
}

/*|------------------------------------------------------------------------------------------|*/
/*|                Date Transformer                                                          |*/
/*|------------------------------------------------------------------------------------------|*/
export function transformDate(date: Date|string|number, format:string|"simple"|"yyyy-mm-dd"|"iso"|"simple-named"|"time-12h"|"time-24-seconds"|"mnt, dd yyyy"="simple", utc=false){
    if(utc){
        date = new DateUTC(date);
    }else{
        date = new Date(date);
    }
    switch(format){
        case "simple":{
            return `${date.getFullYear()}, ${date.getMonth()+1}-${date.getDate()} | ${date.getHours()}:${date.getMinutes()}`;
        }
        case "yyyy-mm-dd":{
            return `${padNumber(date.getFullYear(), 4)}-${padNumber(Number(date.getMonth()+1), 2)}-${padNumber(date.getDate(), 2)}`;
        }
        case "iso":{
            return `${date.getFullYear()}-${padNumber(date.getMonth()+1, 2)}-${padNumber(date.getDate(), 2)}T${padNumber(date.getHours(), 2)}:${padNumber(date.getMinutes(), 2)}`
        }
        case "simple-named":{
            return `${date.getFullYear()}, ${ monthName(date.getMonth()+1) } ${date.getDate()} ${dayName(date.getDay()+1)} | ${hour12(date.getHours())}:${padNumber(date.getMinutes(), 2)}${ date.getHours() >=12 ? "pm":"am"  }`;
        }
        case "time-12h":{
            return `${hour12(date.getHours())}:${padNumber(date.getMinutes(), 2)} ${ date.getHours() >=12 ? "pm":"am"  }`;
        }
        case "time-24-seconds":{
            return `${padNumber(date.getHours(), 2)}:${padNumber(date.getMinutes(), 2)}:${padNumber(date.getSeconds(), 2)}`
        }
        case "mnt, dd yyyy":{
            return `${monthName(date.getMonth()+1)} ${padNumber(date.getDate(), 2)}, ${padNumber(date.getFullYear(), 4)}`;
        }
        default:{
            return "TRANSFORMATION KEY FOR DATE NOT AVAILABLE";
        }
    }
}
export class DateUTC extends Date{
    getFullYear() {
        return this.getUTCFullYear();
    }
    getMonth(): number {
        return this.getUTCMonth();
    }
    getDate(): number {
        return this.getUTCDate();
    }
    getHours(): number {
        return this.getUTCHours();
    }
    getMinutes(): number {
        return this.getUTCMinutes();
    }
    getSeconds(): number {
        return this.getUTCSeconds();
    }
    getMilliseconds(): number {
        return this.getUTCMilliseconds();
    }
    getDay(): number {
        return this.getUTCDay();
    }
}

export function getToday(format:string = "simple"){
    return transformDate(Date.now(), format);
}
export type NUMBER_OF_MONTHS = number|1|2|3|4|5|6|7|8|9|10|11|12;
export type NUMBER_OF_DAYS = number|1|2|3|4|5|6|7;

export function numberOfDays(month:string|NUMBER_OF_MONTHS, year = new Date().getFullYear(), date:undefined|string|number|Date = undefined):30|31|29|28|undefined{
    if(typeof month === "string" && isNaN(Number(month))){
        month = month.toLowerCase();
    }else{
        month = month.toString();
    }
    if(typeof year == "string"){
        year = Number(year);
    }
    if(date!==undefined){
        date = new Date(date)
        month = (date.getMonth()+1).toString();
        year = date.getFullYear();
    }

    switch(month){
        case "1":
        case "january":
            return 31;
        case "2":
        case "february":
            return year % 4 === 0 ? 29: 28;
        case "3":
        case "march":
            return 31;
        case "4":
        case "april":
            return 30;
        case "5":
        case "may":
            return 31;
        case "6":
        case "june":
            return 30;
        case "7":
        case "july":
            return 31;
        case "8":
        case "august":
            return 31;
        case "9":
        case "september":
            return 30;
        case "10":
        case "october":
            return 31;
        case "11":
        case "november":
            return 30;
        case "12":
        case "december":
            return 31;
        default:
            throw new Error("Invalid Number of Months")
    }
}
export function monthName(number:NUMBER_OF_MONTHS, format="short"){ //Short or Full
    switch(number){
        case 1:
            return format=="short"?"Jan":"January";
        case 2:
            return format=="short"?"Feb":"February";
        case 3:
            return format=="short"?"Mar":"March";
        case 4:
            return format=="short"?"Apr":"April";
        case 5:
            return format=="short"?"May":"May";
        case 6:
            return format=="short"?"Jun":"June";
        case 7:
            return format=="short"?"Jul":"July";
        case 8:
            return format=="short"?"Aug":"August";
        case 9:
            return format=="short"?"Sep":"September";
        case 10:
            return format=="short"?"Oct":"October";
        case 11:
            return format=="short"?"Nov":"November";
        case 12:
            return format=="short"?"Dec":"December";
    }
}
export function dayName(number:NUMBER_OF_DAYS, format="short"){
    switch(number){
        case 1:
            return format=="short"?"Sun":"Sunday";
        case 2:
            return format=="short"?"Mon":"Monday";
        case 3:
            return format=="short"?"Tue":"Tuesday";
        case 4:
            return format=="short"?"Wed":"Wednesday";
        case 5:
            return format=="short"?"Thu":"Thursday";
        case 6:
            return format=="short"?"Fri":"Friday";
        case 7:
            return format=="short"?"Sat":"Saturday";
    }
}
export function hour12(hour24:number){
    return removeDecimal(hour24%12) || 12;
}
export function timeToMilliseconds(timeString:string){
    if(!timeString.match(/^\d+:\d{1,2}:\d{1,2}(:\d{1,4})?$/))
        return 0;
    
    const splitTime = timeString.split(":").map(x=>Number(x));
    if(splitTime.length === 3){
        splitTime.push(0);
    }
    return splitTime[0]*hour + splitTime[1]*minute + splitTime[2]*second + splitTime[3];
}

//Time in Milliseconds
const second = 1000; //1000 milliseconds == 1 second;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

export class DateNavigator extends Date{
    private reference = {
        second: second,
        minute: minute,
        hour: hour,
        day: day,
    }
    private timezone?:string;

    constructor(date:undefined|string|number|Date = undefined){
        if(date === undefined){
            //@ts-ignore
            super()
        }else
            super(date);
    }
    // changeDate(date:string|number|Date){
    //     // TO BE CONTINUE
    //     return this;
    // }
    //---- Time Zone ----//
    setTimezone(custom?:string|"Asia/Manila"|"+08:00"){//Sample timezone, empty means browser timezone *be careful with vpn users
        if(custom == null){
            const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const timeSplit = Intl.DateTimeFormat("en-us", {
                timeZone: timeZoneName,
                timeZoneName: "longOffset",
            }).formatToParts();
            const timeZoneFormat = timeSplit[timeSplit.findIndex(x=>x.type === "timeZoneName")].value;
            const timeZoneCut = timeZoneFormat.replace("GMT", "");
            this.timezone = timeZoneCut;
        }
        return this;
    }
    //---- Time Zone----//

    //Stabilizer of Date
    normalize(whatTime:string, type:"min"|"max" = "min"){//@whatTime = Year(2037 or 1970), Month(0 or 11), Day(0, 28,29,30,31), Hour(0, 23), Minute(0, 59), Seconds(0, 59), Milliseconds(0,999)
        const {day} = this.reference;
        const translate:AnyObject = {
            "0":0, "millisecond":0, "Millisecond":0, "ms":0,    "MS":0,      "mls":0,   "MIS":0,
            "1":1, "second":1,      "Second":1,      "s":1,     "S":1,       "ss":1,    "SS":1,
            "2":2, "minute":2,      "Minute":2,      "m":2,     "M":2,       "mi":2,    "MI":2,
            "3":3, "hour":3,        "Hour":3,        "h":3,     "H":3,       "hh":3,    "HH":3,
            "4":4, "day":4,         "Day":4,         "date":4,  "Date":4,    "d":4,     "D":4,      "dd":4,    "DD":4,  "week":4,  "Week":4,
            "5":5, "month":5,       "Month":5,       "mm":5,    "MM":5,
            "6":6, "year":6,        "Year":6,        "y":6,     "Y":6,       "yyyy":6,  "YYYY":7,
        }

        if(translate[whatTime] == undefined){
            return this;
        }

        if( translate[whatTime] >=0 ){
            super.setMilliseconds( type=="min"?0:999 );
        }

        if( translate[whatTime] >=1 ){
            super.setSeconds( type=="min"?0:59 );
        }

        if( translate[whatTime] >=2 ){
            super.setMinutes( type=="min"?0:59 );
        }

        if( translate[whatTime] >=3 ){
            super.setHours( type=="min"?0:23 );
        }

        if(translate[whatTime] >=4){
            if(whatTime == "week" || whatTime == "Week"){
                if(type=="min"){
                    super.setTime(   super.getTime() - day*(super.getDay())    )//Set the starting to sunday;
                }
                else{
                    super.setTime(   super.getTime() + day*(6-super.getDay())    )//Set the ending saturday.
                }
            }else{
                if(type=="min"){
                    super.setDate(1);
                }
                else{
                    super.setDate(32);
                    super.setDate(0);
                }
            }

        }

        if(translate[whatTime] >=5){
            super.setMonth( type=="min"?0:11 );
        }

        if(translate[whatTime] >=6){
            super.setFullYear( type=="min"?1970:2037 );
        }

        return this;
    }

    //---- PREV----//
    prevMillisecond(n=1){
        // const millisecond = 1000;
        super.setTime( super.getTime() - n );
        return this;
    }
    prevSecond(n=1){
        const {second} = this.reference;
        super.setTime( super.getTime() - (second*n) );
        return this;
    }
    prevMinute(n=1){
        const {minute} = this.reference;
        super.setTime( super.getTime() - (minute*n) );
        return this;
    }
    prevHour(n=1){
        const {hour} = this.reference;
        super.setTime( super.getTime() - (hour*n) );
        return this;
    }
    prevDay(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() - (day*n) );
        return this;
    }
    prevWeek(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() - (day*7*n) );
        return this;
    }
    prevMonth(n=1, type:"min"|"max"|"same"="min"){
        const refDay = super.getDate();
        while(n>0){
            super.setDate(0);
            --n;
        }
        if(type=="min")
            super.setDate(1);
        else if(type == "max"){

        }
        else if(type == "same"){
            const checkIfOffsetDate = numberOfDays( (super.getMonth()+1), super.getFullYear() ) as number;
            if(checkIfOffsetDate < refDay){
                super.setDate(checkIfOffsetDate);
            }else{
                super.setDate(refDay);
            }
        }
        return this;
    }
    prevYear(n=1){
        super.setFullYear( super.getFullYear()-n );
        return this;
    }
    prevDecade(n=1){
        super.setFullYear( super.getFullYear()-n*10 );
        return this;
    }
    prevCentury(n=1){
        super.setFullYear( super.getFullYear()-n*100 );
        return this;
    }

    //---- NEXT----//
    nextMillisecond(n=1){
        // const millisecond = 1000;
        super.setTime( super.getTime() + n );
        return this;
    }
    nextSecond(n=1){
        const {second} = this.reference;
        super.setTime( super.getTime() + second*n );
        return this;
    }
    nextMinute(n=1){
        const {minute} = this.reference;
        super.setTime( super.getTime() + minute*n );
        return this;
    }
    nextHour(n=1){
        const {hour} = this.reference;
        super.setTime( super.getTime() + hour*n );
        return this;
    }
    nextDay(n =1){
        const {day} = this.reference;
        super.setTime( super.getTime() + day*n );
        return this;
    }
    nextWeek(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() + day*7*n );
        return this;
    }
    nextMonth(n=1, type="min"){
        while(n>0){
            super.setDate(32);
            super.setDate(1);
            --n;
        }
        if(type=="max"){
            super.setDate(32);
            super.setDate(0);
        }

        return this;
    }
    nextYear(n=1){
        super.setFullYear( super.getFullYear()+n );
        return this;
    }
    nextDecade(n=1){
        super.setFullYear( super.getFullYear()+n*10 );
        return this;
    }
    nextCentury(n=1){
        super.setFullYear( super.getFullYear()+n*100 );
        return this;
    }

    //---- GAP----//
    gapMillisecond(dateRef:Date){
        return super.getTime() - dateRef.getTime();
    }
    gapSecond(dateRef:Date){
        const {second} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/second );
    }
    gapMinute(dateRef:Date){
        const {minute} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/minute );
    }
    gapHour(dateRef:Date){
        const {hour} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/hour );
    }
    gapDay(dateRef:Date){
        const {day} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/day );
    }
    gapWeek(dateRef:Date){
        const {day} = this.reference;
        super.setTime(    super.getTime() +  day*( 6-super.getDay() )    );
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/(7*day) );
    }
    gapMonth(dateRef:Date){
        let annualGap = super.getFullYear() - dateRef.getFullYear();
        let monthGap = super.getMonth() - dateRef.getMonth();
        if(monthGap < 0){
            annualGap-=1;
            monthGap+=12;
        }
        return (annualGap*12) + monthGap;
    }
    gapYear(dateRef:Date){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return annualGap;
    }
    gapDecade(dateRef:Date){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return removeDecimal(annualGap/10);
    }
    gapCentury(dateRef:Date){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return removeDecimal(annualGap/100);
    }

    //---- Advance----//
    toISOStringRevise(){
        const original = `${padNumber(this.getFullYear(), 4)}-${padNumber(this.getMonth()+1, 2)}-${padNumber(this.getDate(), 2)}T${padNumber(this.getHours(), 2)}:${padNumber(this.getMinutes(), 2)}:${padNumber(this.getSeconds(), 2)}`;
        //Format Sample 2024-10-10T03:10:00+08:00
        //** This revise is a must since the old is following the UTC Format */
        // let modified = original.substring(0, original.length-5);
        let modified = original;
        if(this.timezone){
            modified = modified+this.timezone;
        }
        return modified;
    }   
    //---- Advance----//
}


//------------ Phone Number Transformer ------------//
export const countryPhoneMap = {
    "ph":"+63",   
}

export function convertLocalPhone(country:keyof typeof countryPhoneMap, mobileNumber:string|number){
    if( typeof mobileNumber === "number"){
        return countryPhoneMap[country] + String(mobileNumber);
    }
    if( mobileNumber.charAt(0) === "0"){
        return countryPhoneMap[country] + mobileNumber.substring(1);;
    }
    return countryPhoneMap[country] + mobileNumber;
}