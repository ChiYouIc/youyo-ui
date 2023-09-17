import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class Select extends AbstractComponent {
  public value: string = undefined;
  public placeholder: string = undefined;
  public options: Array<{ label: string; value: string }> = [];

  constructor(option: ComponentOption) {
    super(option);
  }

  init(config: AbstractComponentConfig): void {
    console.log(config);
  }
}

export default Select;
