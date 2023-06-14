import { Controller, Get, Query } from '@nestjs/common';
import { PubApiService } from './pub-api.service';
import { AlarmInfoParams } from './interface/pub-api.interface';

@Controller('pub-api')
export class PubApiController {
  constructor(private pubApiService: PubApiService) {}

  /**
   * 1. 미세먼지 공공 API
   *
   * @param alarmInfoParams
   * @returns
   */
  @Get('/')
  async test(@Query() alarmInfoParams: AlarmInfoParams) {
    return await this.pubApiService.getSomeData(alarmInfoParams);
  }
}
