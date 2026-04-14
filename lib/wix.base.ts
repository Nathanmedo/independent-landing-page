import { createClient, OAuthStrategy } from "@wix/sdk";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { collections, products } from "@wix/stores";


export function getWixClient(tokens: any) {
  return createClient({
    modules: {
      backInStockNotifications,
      checkout,
      currentCart,
      orders,
      recommendations,
      collections,
      products,
      files,
    },
    auth: OAuthStrategy({ clientId: process.env.WIX_CLIENT_TOKEN!, tokens }),
  });
}
