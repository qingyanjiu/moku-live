import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EmitService {

  public eventEmit: any;

  constructor() {
    this.eventEmit = new EventEmitter();
  }

}
