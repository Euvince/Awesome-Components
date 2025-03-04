import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name : 'shorten'
})
export class ShortenPipe implements PipeTransform {

  public transform(value: any, minLength: number) : string {
    if (value <= minLength) {
      return value
    }
    else {
      return value.substring(0, minLength) + '...'
    }
  }

}
