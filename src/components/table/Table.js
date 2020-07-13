import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table.template';
import {handleResizer} from './table.resize';
import {shouldResize, shouldSelected, matrix} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(1000);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:selectCell', $cell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      handleResizer(event.target, this.$root);
    } else if (shouldSelected(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab', 'Enter'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelection(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}

function nextSelection(key, {row, column}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    case 'ArrowLeft':
      column = column - 1 < MIN_VALUE ? MIN_VALUE : column - 1;
      break;
    case 'ArrowRight':
    case 'Tab':
      column++;
      break;
  }

  return `[data-id="${row}:${column}"]`;
}


