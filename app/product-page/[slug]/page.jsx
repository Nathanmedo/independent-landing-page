import {getWixClient} from "@/lib/wix.base"
import ProductDetails from '../ProductDetails';
import {getProductBySlug} from "@/lib/wix-api/products"

const RootProductPage = async({params}) => {
    const { slug } = await params;
    const wixClient = getWixClient()
    const productdetail = await getProductBySlug(wixClient, slug);

    console.log(productdetail);
    
  return (
    <>
      <ProductDetails productInfo={productdetail} />
    </>
  )
}

export default RootProductPage
