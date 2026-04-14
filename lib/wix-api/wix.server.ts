import { cookies } from "next/headers";
import { WIX_COOKIE_TOKEN } from "./constants";
import { cache } from "react";
import { getWixClient } from "../wix.base";


export const getWixServerClient = cache(async() => {
    let tokens;

    try{
        tokens = JSON.parse((await cookies()).get(WIX_COOKIE_TOKEN)?.value || '');
    }catch(error){
        console.log(error);
        
    }

    return getWixClient(tokens);
});