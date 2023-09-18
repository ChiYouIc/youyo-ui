import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class InputNumber extends AbstractComponent {
  public value: number | undefined = undefined;
  public min: number = -1000;
  public max: number = 1000;
  public placeholder: string = '请输入数值';

  constructor(option: ComponentOption) {
    super(option);
  }
  init(_: AbstractComponentConfig): void {}
}

export default InputNumber;
