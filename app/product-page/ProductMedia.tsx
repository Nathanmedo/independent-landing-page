'use client'

import React, { useEffect, useState } from "react";
import { products } from "@wix/stores";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { WixImage } from "../../components/ui/wiximage";
import { Dispatch, SetStateAction } from "react";


interface ProductMediaPreviewProps{
  eachItem: any;
  media: string;
  index: number;
  selectedImage: {
    url: string;
  };
  selectedVideo: {
    url: string;
  };
  setSelectedMedia: Dispatch<SetStateAction<any>>
}

const ProductMedia = ({ media }:any) => {
  const [selectedMediaState, setSelectedMedia] = useState(
    media?.[0] || null,
  );
  console.log(selectedMediaState);

  useEffect(()=>{
    setSelectedMedia(media?.[0]);
  }, [media])
  //if image was the first item
  const selectedImage = selectedMediaState?.image;

  //if video was the first item
  const selectedVideo = selectedMediaState?.video?.files[0];


  return (
    <div>
      {selectedImage?.url ? (
        <div>
          <div className="md:h-[500px] h-[320px] w-full relative">
              <Zoom>
                <WixImage
                  mediaIdentifier={selectedImage.url}
                  width={700}
                  className={"object-cover w-full h-full absolute"}
                  height={700}
                  altText={`Product Images`}
                />
              </Zoom>
          </div>
        </div>
      ) : (
        <div className="h-[450px] w-full relative">
          <video className="h-full w-full bg-black absolute" controls>
            <source src={selectedVideo?.url} type={`video/${selectedVideo?.format}`} />
          </video>
        </div>
      )}
      <div className="mt-4 flex gap-3 flex-wrap">
        {media?.map((eachItem:any, i:number) => (
          <ProductMediaPreview
            key={i}
            eachItem={eachItem}
            index={i}
            setSelectedMedia={setSelectedMedia}
            media={media}
            selectedImage={selectedImage}
            selectedVideo={selectedVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductMedia;


const ProductMediaPreview = ({
  eachItem,
  media,
  setSelectedMedia,
  index,
  selectedImage,
  selectedVideo,
}:ProductMediaPreviewProps) => {

  //if preview is a video, use video thumbnail
  const thumbnail = eachItem?.thumbnail?.url;

  //to resize the thumbnail
  const stillFramedMediaId = eachItem.video?.stillFrameMediaId;

  const resolvedThumbnailUrl = thumbnail && stillFramedMediaId ?
  thumbnail.split(stillFramedMediaId)[0] + stillFramedMediaId : undefined;

  return (
    <>
      {eachItem.mediaType === products.MediaItemType.image ? (
        <button
          key={index}
          onClick={() =>
            eachItem?.image?.url &&
            setSelectedMedia(media?.[index])
          }
          className={cn(
            "relative lg:h-24 lg:w-24 h-14 w-14 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none",
            selectedImage?.url === eachItem?.image?.url &&
              "ring ring-primary ring-offset-4",
          )}
        >
          <div className="absolute inset-0 overflow-hidden rounded-md object-contain">
            <WixImage
              mediaIdentifier={eachItem?.image?.url}
              width={700}
              height={700}
              className={"bg-gray-500 transition duration-200 hover:scale-105"}
              altText={`Product Images`}
            />
          </div>
        </button>
      ) : eachItem.mediaType === products.MediaItemType.video ? (
        <button
          key={index}
          onClick={() =>
            eachItem?.video?.files[0] &&
            setSelectedMedia(media?.[index])
          }
          className={cn(
            "relative lg:h-24 lg:w-24 h-14 w-14 cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none",
            selectedVideo?.url == eachItem?.video?.files?.[0]?.url &&
              "ring ring-primary ring-offset-4",
          )}
        >
          <div className="relative h-full overflow-hidden rounded-md bg-black object-contain">
          <PlayIcon className="absolute w-full h-full grid place-items-center text-white text-sm" />
          <WixImage
              mediaIdentifier={resolvedThumbnailUrl}
              width={700}
              height={700}
              className={"bg-gray-500 transition duration-200 hover:scale-105"}
              altText={`Product Video`}
            />

          </div>
        </button>
      ) : null}
    </>
  );
};
