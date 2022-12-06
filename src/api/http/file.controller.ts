import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../../modules/file/file.service';
import { JwtAuthAdminGuard } from '../../modules/auth/jwt-auth-admin.guard';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService, // private readonly fileConfigService: FileConfigService,
  ) {}

  // @Post('/upload')
  // @UseGuards(JwtAuthAdminGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() upload: Express.Multer.File, @Request() req): Promise<any> {
  //   // const file = await this.fileService.httpSaveFile({
  //   //   upload,
  //   //   userId: req.user?.id,
  //   // });
  //   // return file;
  // }
}
