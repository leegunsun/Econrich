import { Module } from '@nestjs/common';
import { PubApiController } from './pub-api.controller';
import { PubApiService } from './pub-api.service';

@Module({
  controllers: [PubApiController],
  providers: [PubApiService]
})
export class PubApiModule {}
