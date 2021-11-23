

/**
 * JSONParseSafely is a wrapper around JSON.parse
 * returns undefined instead of throwing an error
 * 
 * @param data to parse
 * @returns 
 */
export function JSONParseSafely(data: any) {
    try{
        let parsedData = JSON.parse(data);
        return parsedData;
    }catch(e){
        return;
    }
}