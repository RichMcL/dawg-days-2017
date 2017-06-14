import { Pipe, PipeTransform } from '@angular/core';

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
