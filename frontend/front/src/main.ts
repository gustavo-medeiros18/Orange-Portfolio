import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as CryptoJS from "crypto-js";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
