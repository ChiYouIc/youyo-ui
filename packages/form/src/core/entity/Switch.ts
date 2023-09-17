import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class Switch extends AbstractComponent {
  public value: boolean = false;

  constructor(option: ComponentOption) {
    super(option);
  }

  init(config: AbstractComponentConfig): void {}
}

export default Switch;
