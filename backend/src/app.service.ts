import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getNewsAny(filter: any) {
    let para = '';
    for(let index = 0; index < Object.keys(filter).length; index++) {
      if(index != 0) {
        para += `&${Object.keys(filter)[index]}=${Object.values(filter)[index]}`;
      } else {
        para += `${Object.keys(filter)[index]}=${Object.values(filter)[index]}`;
      }
    }
    try {
      const url = `https://newsapi.org/v2/everything?${para}&apiKey=${process.env.NEWS_API_KEY}`;
     
      const response = await axios.get(url);
      return response.data.articles;
    } catch (error) {
      throw new HttpException(
        'News fetching failed internally',
        error.response.status,
      );
    }
  }

  async getBreakingNews(filter:any) {
    let para = '';
    for(let index = 0; index < Object.keys(filter).length; index++) {
      if(index != 0) {
        para += `&${Object.keys(filter)[index]}=${Object.values(filter)[index]}`;
      } else {
        para += `${Object.keys(filter)[index]}=${Object.values(filter)[index]}`;
      }
    }


    
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?${para}&apiKey=${process.env.NEWS_API_KEY}`,
      );
      return response.data.articles;
    } catch (error) {
      throw new HttpException('Failed to fetch news', 500);
    }
  }
}
