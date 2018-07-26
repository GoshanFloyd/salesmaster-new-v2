
import {environment} from '../../environments/environment';

export class Logger {

  private static isProduction = environment.production;

  public static log(message: string) {
    if (!this.isProduction) {
      console.log(message);
    } else {
      return false;
    }
  }
}
