import axios from 'axios';
 

export class APIAdsService {

  constructor() {}


  createAds(ads) {
    const url = `${process.env.API_URL}/ads/create/`;
    return axios.post(url, ads);
  }
}
