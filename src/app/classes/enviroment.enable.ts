import {environment} from '../../environments/environment';


export class EnviromentEnable {

  private enviroment =  environment.production;

  constructor() {}

  public productionDisable(): boolean {
    return !environment.production;
  }
}
