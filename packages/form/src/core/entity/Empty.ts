import AbstractComponent from '../AbstractComponent';
import AbstractComponentConfig from '../AbstractComponentConfig';

class Empty extends AbstractComponent {
  constructor() {
    super({ id: 'xxx', name: 'Empty', component: 'empty' });
  }

  init(_: AbstractComponentConfig): void {}
}

export default Empty;
