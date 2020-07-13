import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribes = [];
    this.prepare();
  }

  // настраиваем наш компонент до init
  prepare() {}

  // return template component
  toHTML() {
    return '';
  }

  // паттерн фасад
  // уведомляем слушателя о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribes.push(unsub);
  }

  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDomListener();
  }

  // удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDomListener();
    this.unsubscribes.forEach(unsub => unsub());
  }
}
