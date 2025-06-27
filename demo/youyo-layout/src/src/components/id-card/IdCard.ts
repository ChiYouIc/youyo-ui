import { AbstractComponent } from 'youyo-form';
import { h, VNode } from 'vue';
import CIdCard from './IdCard.vue';
import { ComponentConstructorOptionType } from 'youyo-form/src';

class IdCard extends AbstractComponent {
  private _value: string;

  constructor(option: ComponentConstructorOptionType) {
    super(option);
  }

  getVal(): any {
    return this._value;
  }

  init({ value }: { value: string }): void {
    this._value = value;
  }

  node(): VNode {
    return h(CIdCard, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string) => (this._value = val),
      placeholder: '请输入身份证号码',
      disabled: this.disabled,
      maxlength: 50,
    });
  }

  configToJson(): Record<string, any> {
    const json = super.configToJson();
    json['value'] = this._value;
    return json;
  }

  protected setVal(val: string): void {
    this._value = val;
  }
}

export default IdCard;
