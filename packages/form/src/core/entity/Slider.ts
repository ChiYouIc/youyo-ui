import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class Slider extends AbstractComponent {
  public value: string = undefined;
  public placeholder: string = undefined;

  constructor(option: ComponentOption) {
    super(option);
  }

  init(config: AbstractComponentConfig): void {
    console.log(config);
  }
}

export default Slider;
