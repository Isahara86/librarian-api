import {
  Controller,
  Post,
  Request,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { FileDto } from './dto/file.dto';
// import { FileConfigService } from './file-config.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService, // private readonly fileConfigService: FileConfigService,
  ) {}

  @Post('/upload')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() upload: Express.Multer.File,
    @Request() req,
  ): Promise<any> {
    const file = await this.fileService.saveFile({
      upload,
      userId: req.user?.id,
    });
    return file;
  }
}
