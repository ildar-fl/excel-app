import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {handleResizer} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(1000);
  }

  onMousedown(event) {
    if (shouldResize(event)) handleResizer(event.target, this.$root);
  }
}
