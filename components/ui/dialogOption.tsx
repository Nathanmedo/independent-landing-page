import {SUPPORT_PHONE_NUMBER} from "@/lib/wix-api/constants"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./button";
import { WixImage } from "./wiximage";
import Link from "next/link";
import {EmailForProduct} from "./emailSeller"


import { ShoppingCartIcon } from "lucide-react";

interface DialogOptionProps{
  image: {
    url: string;
    title: string;
  };
  product: any;
  selectedOptions: any;
}

export function DialogOption({ image, product, selectedOptions }:DialogOptionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full py-1 hover:bg-primary hover:text-secondary transition-colors duration-150"
          variant="outline"
        >
          <ShoppingCartIcon size={4} /> {""}
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="shadcn-dialog-content">
        <DialogTitle className="shadcn-dialog-title">
          Request Details
        </DialogTitle>
        <DialogDescription className="shadcn-dialog-description flex flex-col gap-2">
          <>
            <div className="flex items-center gap-2">
              <WixImage
                mediaIdentifier={image?.url}
                altText={image?.title || "Product Image"}
                width={40}
                height={40}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col">
                <div className="text-sm font-semibold">{product?.name}</div>
                <div className="text-xs text-muted-foreground flex gap-1">
                  {Object.entries(selectedOptions as [string, string][]).map(([key, value]) => (
                    <>
                      {key === "color" && (
                        <div className="flex">
                          <strong>Color:</strong>{" "}
                          <span
                            className="h-2 w-2"
                            style={{ backgroundColor: "white" }}
                          />
                          {value}
                        </div>
                      )}
                      <div key={key}>
                        <strong>{key}</strong>: {value}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p>You can either call the product seller or email them.</p>
            </div>
          </>
        </DialogDescription>
        <DialogFooter className="shadcn-dialog-footer">
          <Button variant="default" size="sm" className="recommended-tag">
            <Link href={`tel:${SUPPORT_PHONE_NUMBER}`}>Call seller</Link>
          </Button>
          <Button variant="secondary" size="sm">
            <EmailForProduct
              selectedOptions={selectedOptions}
              text="Email seller"
            />
          </Button>
          <DialogClose asChild>
            <Button variant="link" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
