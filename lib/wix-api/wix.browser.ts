import { WIX_COOKIE_TOKEN } from "./constants";
import { getWixClient } from "../wix.base";
import Cookies from "js-cookie";


let tokens = JSON.parse(Cookies.get(WIX_COOKIE_TOKEN) || '{}');
console.log(tokens);


export const wixBrowserClient = getWixClient(tokens);