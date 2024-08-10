import { Controller, Get, Headers, Query } from '@nestjs/common';
import axios from 'axios';

@Controller('import')
export class ImportController {
  @Get()
  async getPresignedUrl(
    @Query('name') name: string,
    @Headers('authorization') authorization,
  ) {
    console.log('Import products');
    console.log(name);
    console.log(authorization);
    try {
      const resp = await axios.get(`${process.env.IMPORT}/import`, {
        params: {
          name,
        },
        headers: { Authorization: authorization },
      });
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
}
