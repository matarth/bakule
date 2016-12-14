/**
 * Created by mata on 5.12.16.
 */
export default class Logger{

    static log(message: string){
        console.log(message);
    }

    static logAllProperties(object: any){
        for(var key in object){
            this.log(key + " - " + object[key]);
        }
    }

    static logAllPropertyNames(object: any){
        for(var key in object){
            this.log(key);
        }
    }

}