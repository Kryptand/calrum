export const isNullOrUndefined=(value:any)=>{
    return value === null || value === undefined;
}
export const throwIfNullOrUndefined=(value:any,message?:string)=>{
  
    if(isNullOrUndefined(value)){
        throw new Error(`${message?message:"The provided value was null or undefined"}`);
    }
}