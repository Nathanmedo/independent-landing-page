import { SUPPORT_EMAIL } from "@/lib/wix-api/constants";
import Link from "next/link";

export function EmailForProduct({ selectedOptions, text }) {
  return (
    <Link
      href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        "I want to make a purchase"
      )}&body=
        ${encodeURIComponent(
          `**Name:[YOUR NAME]
        **Phone Number:[YOUR PHONE NUMBER]
        **Product Details: ${selectedOptions}
        **How can i reach you?`
        )}
        `}
    >
        {text}
    </Link>
  );
}


EmailForProduct.defaultProps = {
    text: 'Email Seller'
}