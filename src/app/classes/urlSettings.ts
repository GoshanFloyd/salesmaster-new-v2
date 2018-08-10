import {environment} from '../../environments/environment';

export class UrlSettings {

  private static currentEnv = environment.production;

  private static baseProtocol = 'https://';

  private static testDomain = 'test.salesmaster.me';
  private static prodDomain = 'back.salesmaster.me';

  private static testBackUrl = `test.salesmaster.me/api/v1/`;
  private static prodBackUrl = 'back.salesmaster.me/api/v1/';

  private static testBackAuthUrl = 'test.salesmaster.me/api/';
  private static prodBackAuthUrl = 'back.salesmaster.me/api/';

  constructor () {}

  public static getBackendUrl() {
    if (this.currentEnv) {
      return `${this.baseProtocol}${this.prodBackUrl}`;
    } else {
      return `${this.baseProtocol}${this.testBackUrl}`;
    }
  }

  public static getAuthBackendUrl() {
    if (this.currentEnv) {
      return `${this.baseProtocol}${this.prodBackAuthUrl}`;
    } else {
      return `${this.baseProtocol}${this.testBackAuthUrl}`;
    }
  }

  public static getBackendUrlWithoutApi() {
    if (this.currentEnv) {
      return `${this.baseProtocol}${this.prodDomain}`;
    } else {
      return `${this.baseProtocol}${this.testDomain}`;
    }
  }
}
