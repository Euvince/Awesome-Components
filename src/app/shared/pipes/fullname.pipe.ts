import { Pipe, PipeTransform } from "@angular/core";

export type fullname = {
  firstname: string,
  lastname: string,
}

@Pipe({
  name : 'fullname'
})
export class FullnamePipe implements PipeTransform {

  public transform(value: fullname, locale: 'us' | 'fr') : string {
    return locale === 'fr'
      ? `${value.lastname.toUpperCase()} ${value.firstname}`
      : `${value.firstname} ${value.lastname}`
  }

}
