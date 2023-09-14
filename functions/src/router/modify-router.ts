import * as functions from "firebase-functions";
import {ErrorResponse} from "../model/response";
import * as admin from "firebase-admin";
import * as path from "path";
import * as os from "os";
import {v4 as uuidv4} from "uuid";
import * as mkdirp from "mkdirp";
import * as logs from "../logs";
import {editImage, ImageParams, ImageResizeOptions} from "../edit-image";
import * as fs from "fs";

export const supportedImageContentTypeMap: { [value: string]: string } = {
  "jpg": "image/jpeg",
  "jpeg": "image/jpeg",
  "png": "image/png",
  "tif": "image/tif",
  "tiff": "image/tiff",
  "webp": "image/webp",
  "gif": "image/gif",
  "avif": "image/avif",
  "jfif": "image/jpeg",
};

const getQueryParams = (req: functions.Request) => {
  return {
    blur: req.query["b"],
    scale: req.query["s"],
    resize: {
      height: req.query["h"],
      width: req.query["w"],
      fit: req.query["fit"],
    },
    rotate: req.query["r"],
    backgroundColor: req.query["bg"],
    sharpen: req.query["shp"],
    greyscale: req.query["gs"],
    quality: req.query["q"],
    jpgCompression: req.query["jpgCp"],
    pngCompression: req.query["pngCp"],
  };
};

const parseQueryParams = (queryParams: any): ImageParams => {
  const params: ImageParams = {};
  if (queryParams.blur) {
    params.blur = Number(queryParams.blur as string);
  }
  if (queryParams.scale) {
    params.scale = Number(queryParams.scale as string);
  }
  const resizeParams: ImageResizeOptions = { };
  if (queryParams.resize.height) {
    resizeParams.height = Number(queryParams.resize.height as string);
  }
  if (queryParams.resize.width) {
    resizeParams.width = Number(queryParams.resize.width as string);
  }
  if (queryParams.resize.fit) {
    resizeParams.fit = queryParams.resize.fit as string;
  }
  if (queryParams.rotate) {
    params.rotate = Number(queryParams.rotate as string);
  }
  if (queryParams.backgroundColor) {
    params.backgroundColor = `#${queryParams.backgroundColor as string}`;
  }
  if (queryParams.sharpen) {
    params.sharpen = Number(queryParams.sharpen as string);
  }
  if (queryParams.greyscale) {
    params.greyscale = true;
  }
  if (queryParams.quality) {
    params.quality = Number(queryParams.quality as string);
  }
  if (queryParams.jpgCompression) {
    params.jpgCompression = true;
  }
  if (queryParams.pngCompression) {
    params.pngCompression = Number(queryParams.pngCompression as string);
  }
  params.resize = resizeParams;
  return params;
};

export const ModifyImgRouter =
    async (req: functions.Request, res: functions.Response) => {
      const file = req.query["file"]; // ukj52pbf1ouz/fb-cover.jpg
      const bucketName = process.env.BUCKET_NAME;
      if (bucketName === undefined) {
        const resData: ErrorResponse = {
          status: 500,
          message: "Missing Bucket Name param.",
        };
        res.status(500).send(resData);
        return;
      }
      if (file === undefined) {
        const resData: ErrorResponse = {
          status: 500,
          message: "Missing file param.",
        };
        res.status(500).send(resData);
        return;
      }
      const filePath = file as string;
      const bucket = admin.storage().bucket(bucketName);
      const parsedPath = path.parse(filePath);

      const type = `${parsedPath.ext.replace(".", "")}`;
      const supported = supportedImageContentTypeMap[type];
      if (supported === undefined) {
        const resData: ErrorResponse = {
          status: 500,
          message: `File format "${type}" not supported.`,
        };
        res.status(500).send(resData);
        return;
      }

      const queryParams = getQueryParams(req);

      let localOriginalFile;
      let remoteOriginalFile;
      let editedImage;

      try {
        localOriginalFile = path.join(os.tmpdir(), uuidv4());
        const tempLocalDir = path.dirname(localOriginalFile);
        await mkdirp(tempLocalDir);
        logs.createdTempDir(localOriginalFile);

        logs.downloadingFile(filePath);
        remoteOriginalFile = bucket.file(filePath);
        await remoteOriginalFile.download({destination: localOriginalFile});
        logs.downloadedOriginalFileAt(localOriginalFile);

        editedImage = await editImage({
          fileLocation: localOriginalFile,
          params: parseQueryParams(queryParams),
        });
      } catch (err: any) {
        logs.error(err);
      } finally {
        if (localOriginalFile) {
          try {
            fs.unlinkSync(localOriginalFile);
            logs.tempOriginalFileDeleted(localOriginalFile);
          } catch (err: any) {
            logs.errorDeleting(err);
          }
        }
      }
      const fileName = `${parsedPath.name}${parsedPath.ext}`;
      res
        .setHeader("Content-Length", editedImage?.byteLength ?? 0)
        .setHeader("Content-Type",
          supportedImageContentTypeMap[
            parsedPath.ext
              .replace(".", "")
              .toLowerCase()
          ])
        .setHeader("Content-Disposition", `inline; filename=${
          encodeURIComponent(fileName)
        }; filename*=UTF-8''${fileName}`)// attachment
        .send(editedImage);
    };
