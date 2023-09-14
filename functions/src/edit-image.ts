import * as sharp from "sharp";
import * as logs from "./logs";

export type ImageResizeOptions = {
    height?: number
    width?: number
    fit?: "contain" | "cover" | "fill" | "inside" | "outside" | string
}

export type ImageParams = {
    blur?: number | boolean
    scale?: number
    resize?: ImageResizeOptions
    rotate?: number,
    backgroundColor?: string,
    sharpen?: number,
    greyscale?: boolean,
    quality?: number,
    jpgCompression?: boolean,
    pngCompression?: number
}

export type EditImage = {
    fileLocation: string
    params: ImageParams
}

export const editImage = async ({
  fileLocation,
  params,
}: EditImage) => {
  const sharpImg = sharp(fileLocation);
  if (params.blur) {
    const finalBlur = params.blur > 0.2 ? params.blur: 0.3;
    sharpImg.blur(finalBlur);
    logs.imageChanges( `Blur: ${params.blur}`);
  }
  if (params.rotate) {
    sharpImg.rotate(params.rotate, {
      background: params.backgroundColor,
    });
    logs.imageChanges( `Rotate: ${params.rotate} |
    background: ${params.backgroundColor}`);
  }
  if (params.sharpen) {
    sharpImg.sharpen({
      sigma: params.sharpen,
    });
    logs.imageChanges( `Sharpen: ${params.sharpen}`);
  }
  if (params.greyscale) {
    sharpImg.grayscale();
    logs.imageChanges( "Greyscale: true");
  }
  if (params.quality) {
    const metadata = await sharpImg.metadata();
    const qu = Math.round(params.quality < 100 ? params.quality: 100);
    switch (metadata.format) {
    case "jpeg":
      sharpImg
        .jpeg({quality: qu, mozjpeg: params.jpgCompression});
      break;
    case "png":
      sharpImg
        .png({
          quality: qu,
          compressionLevel: params.pngCompression,
        });
      break;
    case "webp":
      sharpImg
        .webp({quality: qu, alphaQuality: qu, lossless: true});
      break;
    case "heif":
      sharpImg
        .heif({quality: qu});
      break;
    case "jp2":
      sharpImg
        .jp2({quality: qu});
      break;
    }
    logs.imageChanges( `Quality: ${qu} format=${metadata.format}|
     jpgCompression=${params.jpgCompression} |
     pngCompression=${params.pngCompression}`);
  }
  if (params.scale) {
    const finalScale = params.scale > 0 ? params.scale: 0.1;
    const metadata = await sharpImg.metadata();
    sharpImg.resize({
      width: Math.round(metadata.width! * finalScale),
      height: Math.round(metadata.height! * finalScale),
      background: params.backgroundColor,
    });
    logs.imageChanges( `Scale: ${finalScale} |
    background: ${params.backgroundColor}`);
  } else if (params.resize && (params.resize.width || params.resize.height)) {
    const w = params.resize.width ? Math.round(params.resize.width): undefined;
    const h = params.resize.height ?
      Math.round(params.resize.height): undefined;
    const fit = params.resize.fit ? params.resize.fit as any: "fill";
    sharpImg.resize(w, h, {
      fit,
    });
    logs.imageChanges( `Resize: width=${w} height=${h} fit=${fit}`);
  }
  return sharpImg.toBuffer();
};
