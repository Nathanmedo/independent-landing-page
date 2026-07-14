import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getFormattedPrice(product:any){
  
  const minValue = product?.priceRange?.minValue;
  const maxValue = product?.priceRange?.maxValue;

  if(maxValue && minValue && maxValue != minValue){
    return `From ${product.priceData.formatted.price}`
  }else{
    return product?.price?.formatted?.discountedPrice || product?.price?.formatted?.price || 'n/a'
  }

};

export function findVariant(products:any, selectedOptions:any){

  const variant = products?.variants?.find( (eachVariant:any) =>(
    Object.entries(selectedOptions).every(([key, value])=>(eachVariant.choices?.[key] === value))
  )) || null;

  return variant;
};

export function ProductPrice({product, selectedVariant}:{product: any; selectedVariant:any;}){
  const priceOption = selectedVariant?.variant?.priceData || product?.priceData;
  
  const hasDiscount = priceOption?.price !== priceOption?.discountedPrice;
  
   return <div className="text-3xl tracking-tight text-white flex-col flex justify-center">
     <span className={cn('bg-muted max-w-fit bg-opacity-50  py-1 text-white font-extrabold flex items-center', hasDiscount && 'font-normal line-through text-muted-foreground text-sm')}>{priceOption?.formatted?.price}</span>

     {hasDiscount && <span>{priceOption.formatted.discountedPrice}</span>}
  </div>
}