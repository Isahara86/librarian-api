import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  IMAGE_DISTRIBUTION_DOMAIN,
  IMAGE_S3_BUCKET_NAME,
  S3_BUCKET_REGION,
} from '../../environment';
import * as mimeDB from 'mime-db';
import * as uuid from 'uuid';
import { FileUpload } from '../../api/gql/dto/file-upload.interface';
import * as sharp from 'sharp';
import { Buffer } from 'buffer';
import { ImageVariantsInterface } from './image-variants.interface';

@Injectable()
export class FileService {
  private readonly s3: S3;
  private readonly IMAGE_S3_BUCKET_NAME: string;

  constructor() {
    if (!S3_BUCKET_REGION) {
      throw new Error('S3_BUCKET_REGION is required');
    }
    if (!AWS_ACCESS_KEY_ID) {
      throw new Error('S3_BUCKET_REGION is required');
    }
    if (!AWS_SECRET_ACCESS_KEY) {
      throw new Error('S3_BUCKET_REGION is required');
    }
    if (!IMAGE_S3_BUCKET_NAME) {
      throw new Error('S3_BUCKET_REGION is required');
    }

    this.s3 = new S3({
      region: S3_BUCKET_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.IMAGE_S3_BUCKET_NAME = IMAGE_S3_BUCKET_NAME;
  }

  public async httpSaveImage({ upload }: any): Promise<any> {
    const mimeType = upload.mimetype;

    // TODO validate images only
    // TODO validate max image size
    const extension = mimeDB[mimeType]?.extensions[0] || 'jpg';

    const Key = 'img/' + uuid.v1() + '.' + extension;

    const uploadParams: S3.PutObjectRequest = {
      Bucket: this.IMAGE_S3_BUCKET_NAME,
      Key,
      Body: upload.buffer,
      ContentType: mimeType,
    };
    const s3Response = await this.s3.upload(uploadParams).promise();

    // console.log(JSON.stringify(s3Response, null, 2));
    // console.log(IMAGE_DISTRIBUTION_DOMAIN + '/' + Key);

    // const file = await this.db.file.create({
    //   data: {
    //     userId,
    //     mimeType,
    //     extension,
    //     s3Key,
    //     url: s3Response.Location,
    //     thumbnail: `${OPTIMIZED_PUBLIC_URL}/${s3Key}.${THUMBNAIL_END}`,
    //   },
    // });

    // return { id: file.id, url: file.url, thumbnail: file.thumbnail };
  }

  private async streamToBuffer(stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const data: any[] = [];

      stream.on('data', (chunk: any) => {
        data.push(chunk);
      });

      stream.on('end', () => {
        resolve(Buffer.concat(data));
      });

      stream.on('error', err => {
        reject(err);
      });
    });
  }

  public async gqlSaveImage(upload: Promise<FileUpload>): Promise<ImageVariantsInterface> {
    const { createReadStream, filename, mimetype } = await upload;
    const fileStream = createReadStream();

    // TODO validate images only
    // TODO validate max image size
    const origExtension = mimeDB[mimetype]?.extensions[0] || 'jpg';

    const origBuffer = await this.streamToBuffer(fileStream);
    const jpegBuffer = await sharp(origBuffer).jpeg({ progressive: true, force: false }).toBuffer();
    const webpBuffer = await sharp(origBuffer).webp().toBuffer();
    const jpegThumbnailBuffer = await sharp(origBuffer)
      .resize(200)
      .jpeg({ progressive: true, force: false })
      .toBuffer();
    const webpThumbnailBuffer = await sharp(origBuffer)
      .resize(200)
      .webp({ quality: 70 })
      .toBuffer();

    const keyPrefix = 'img/' + uuid.v1();
    const origKey = keyPrefix + '.' + origExtension;
    const jpegKey = keyPrefix + '-optimized-full-size.jpeg';
    const webpKey = keyPrefix + '-full-size.webp';
    const jpegThumbnailKey = keyPrefix + '-preview.jpeg';
    const webpThumbnailKey = keyPrefix + '-preview.webp';

    await Promise.all([
      this.s3
        .upload({
          Bucket: this.IMAGE_S3_BUCKET_NAME,
          Key: origKey,
          Body: origBuffer,
          ContentType: mimetype,
        })
        .promise(),
      this.s3
        .upload({
          Bucket: this.IMAGE_S3_BUCKET_NAME,
          Key: jpegKey,
          Body: jpegBuffer,
          ContentType: 'image/jpeg',
        })
        .promise(),
      this.s3
        .upload({
          Bucket: this.IMAGE_S3_BUCKET_NAME,
          Key: webpKey,
          Body: webpBuffer,
          ContentType: 'image/webp',
        })
        .promise(),
      this.s3
        .upload({
          Bucket: this.IMAGE_S3_BUCKET_NAME,
          Key: jpegThumbnailKey,
          Body: jpegThumbnailBuffer,
          ContentType: 'image/jpeg',
        })
        .promise(),
      this.s3
        .upload({
          Bucket: this.IMAGE_S3_BUCKET_NAME,
          Key: webpThumbnailKey,
          Body: webpThumbnailBuffer,
          ContentType: 'image/webp',
        })
        .promise(),
    ]);

    const urlPrefix = IMAGE_DISTRIBUTION_DOMAIN + '/';

    return {
      previewOrig: urlPrefix + origKey,
      previewJpeg: urlPrefix + jpegKey,
      previewWebp: urlPrefix + webpKey,
      previewJpegThumbnail: urlPrefix + jpegThumbnailKey,
      previewWebpThumbnail: urlPrefix + webpThumbnailKey,
    };
  }
}
