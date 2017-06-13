import { Pipe, PipeTransform } from '@angular/core';

/**
 * Partial match the value against the email, case-insensitive.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, value: string): Array<any> {
        if (value && items) {
            return items.filter(function (item) {
                return item.displayName && item.displayName.toLowerCase().includes(value.toLowerCase());
            });
        }

        return items;
    }
}
