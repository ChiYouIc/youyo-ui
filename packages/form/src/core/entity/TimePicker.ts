import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class TimePicker extends AbstractComponent {
  public value: string = undefined;
  public placeholder: string = undefined;

  constructor(option: ComponentOption) {
    super(option);
  }

  init(config: AbstractComponentConfig): void {}
}

export default TimePicker;
