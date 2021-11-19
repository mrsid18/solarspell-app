import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getbanner() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.banner;
  }

  getVersion() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.version;
  }
}