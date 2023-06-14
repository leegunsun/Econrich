import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as xml2js from 'xml2js';
import { AlarmInfoParams } from './interface/pub-api.interface';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PubApiService {
  /**
   * 1. 미세먼지 공공 API
   *
   * @param alarmInfoParams
   * @returns
   */
  async getSomeData(alarmInfoParams: AlarmInfoParams): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.BASE_URL}/getUlfptcaAlarmInfo`,
        { params: { serviceKey: process.env.APIKEY, ...alarmInfoParams } },
      );

      const items = await this.convertXmlToJson(response.data);

      // "districtName"이 params에 있다면 해당 값으로 필터링하고, 아니면 모든 아이템을 반환
      if (alarmInfoParams.districtName) {
        return items.filter(
          (item) => item.districtName === alarmInfoParams.districtName,
        );
      } else {
        return items;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        '예상치 못한 서버 장애가 발생했습니다.',
      );
    }
  }

  /**
   *  2. 미세먼지 공공 API XML => JSON
   *
   * @param xml
   * @returns
   */
  async convertXmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(
        xml,
        { mergeAttrs: true, explicitArray: false },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.response.body.items.item);
          }
        },
      );
    });
  }
}
