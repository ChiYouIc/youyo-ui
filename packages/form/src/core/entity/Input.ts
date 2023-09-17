import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class Input extends AbstractComponent {
  public value: string = '';
  public placeholder: string = '';
  public maxlength: number = 500;

  constructor(option: ComponentOption) {
    super(option);
  }
  init(config: AbstractComponentConfig): void {}

  public change(): void {}

  public pressEnter(): void {}
}

export default Input;
