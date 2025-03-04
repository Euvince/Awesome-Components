import { Pipe, PipeTransform } from "@angular/core";

export type fullname = {
  firstname: string,
  lastname: string,
}

@Pipe({
  name : 'fullname'
})
export class TimeAgoPipe implements PipeTransform {

  public transform(value: fullname, locale: 'us' | 'fr') : any {

  }

}
