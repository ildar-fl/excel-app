import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $el.html(component.toHTML());
      $el.innerHTML = component.toHTML();
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    // console.log(this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test epta</h1>`);
    // const node = document.createElement('h1');
    // node.textContent = 'TEST';
    this.$el.append(this.getRoot());

    this.components.forEach(component => component.init());
  }
}
