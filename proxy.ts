import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server";
import { WIX_COOKIE_TOKEN } from "./lib/wix-api/constants";

console.log("middleware function running");
const wixClient = createClient({
    auth: OAuthStrategy({clientId: process.env.WIX_CLIENT_TOKEN!}),
});

export async function proxy(req:any){
    const cookie = req.cookies;

    let sessionCookie = cookie.get(WIX_COOKIE_TOKEN);
    
    let sessionToken = sessionCookie ? 
    JSON.parse(sessionCookie.value) : await wixClient.auth.generateVisitorTokens();

    console.log(sessionToken);
    
    if(sessionToken.accessToken.expiresAt < Math.floor(Date.now())){
        try{
            sessionToken = await wixClient.auth.renewToken(sessionToken.refreshToken);
        }catch(error){
            sessionToken = await wixClient.auth.generateVisitorTokens();
        }
    }

    //updating the cookie on the server side only
    req.cookies.set(WIX_COOKIE_TOKEN, JSON.stringify(sessionToken));

    //setting the token to the client-side response;
    const response = NextResponse.next();  

    response.cookies.set(WIX_COOKIE_TOKEN, JSON.stringify(sessionToken), {
        maxAge: 60 * 60 * 24 * 14,  //setting the cookie to expire every 14days
        secure: process.env.NODE_ENV === "production",  //secure : true if NODE_ENV is production
    });

    return response
};


//set up routes that the middleware function will run
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};

