import React, { Fragment } from "react";
import { products } from "@wix/stores";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface ProductOptionsProps {
  productInfo: any;
  selectedOptions: any;
  checkInStock: any;
  setSelectedOptions: Dispatch<SetStateAction<any>>;
}


const ProductOptions = ({
  productInfo,
  selectedOptions,
  checkInStock,
  setSelectedOptions,
}:ProductOptionsProps) => {

  if(productInfo?.productOptions.length == 0){
    return null
  }
  return (
    <div className="mt-4">
      {productInfo?.productOptions.map((options:any, i:number) => (
        <fieldset className="my-2" key={i}>
          <legend>{options.name}</legend>
          <div className='mt-2 flex gap-2 flex-wrap ' data-value={options.name}>
            {options.choices.map((choice:any) => (
              <Fragment key={choice.value}>
                {choice.visible && 
                  <div>
                  <input
                    type="radio"
                    value={choice?.value}
                    id={choice?.description}
                    name={options?.name}
                    checked={selectedOptions[options.name || ''] === choice.description}
                    className="hidden peer"
                    onChange={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [options.name || ""]: choice.description,
                      })
                    }
                  />
                  <label 
                  className={cn("cursor-pointer border-neutral-600 transition duration-100 ease-in gap-1 items-center justify-center flex border-2 peer-checked:font-bold text-sm peer-checked:border-neutral-200 px-2 py-1 ", !checkInStock(productInfo, selectedOptions) && 'opacity-75')}
                  htmlFor={choice?.description}>
                    {options.optionType === products.OptionType.color &&
                      <span
                      className="rounded-full size-4 border"
                      style={{backgroundColor: choice.value}} 
                      />
                    }
                    {choice.description}
                  </label>
                  </div>
                }
              </Fragment>
            ))}
          </div>
        </fieldset>
      ))}

    </div>
  );
};

export default ProductOptions;
