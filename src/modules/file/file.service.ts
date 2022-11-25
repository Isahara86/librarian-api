import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class FileService {
  private readonly s3: S3 = new S3({
    region: S3_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  public async saveFile({ userId, upload }: any): Promise<any> {
    const mimeType = upload.mimetype;

    // TODO validate images only
    // TODO validate max image size
    const extension = mimeDB[mimeType]?.extensions[0] || 'jpg';

    const Key = 'img/' + uuid.v1() + '.' + extension;

    const uploadParams: S3.PutObjectRequest = {
      Bucket: IMAGE_S3_BUCKET_NAME,
      Key,
      Body: upload.buffer,
      ContentType: mimeType,
    };
    const s3Response = await this.s3.upload(uploadParams).promise();

    console.log(JSON.stringify(s3Response, null, 2));
    console.log(IMAGE_DISTRIBUTION_DOMAIN + '/' + Key);

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
}
