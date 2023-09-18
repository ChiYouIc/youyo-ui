import AbstractComponentConfig from '../AbstractComponentConfig';
import AbstractComponent from '../AbstractComponent';
import { ComponentOption } from '../../types';

class Radio extends AbstractComponent {
  public value: string | undefined = undefined;
  public optionType: 'button' | 'default' = 'default';
  public options: Array<{ label: string; value: string; disabled?: boolean }> = [];

  constructor(option: ComponentOption) {
    super(option);
  }

  init(_: AbstractComponentConfig): void {}
}

export default Radio;
