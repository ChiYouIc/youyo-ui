/**
 * 抽象配置
 */
export default abstract class AbstractComponentConfig {
  private _defaultValue: any;
  private _required: boolean; // 是否必填
  private _rule: string; // 校验规则
  private _disabled: boolean; // 是否禁用
  private _placeholder: string; // 占位符

  constructor(defaultValue: any, required: boolean, rule: string, disabled: boolean, placeholder: string) {
    this._defaultValue = defaultValue;
    this._required = required;
    this._rule = rule;
    this._disabled = disabled;
    this._placeholder = placeholder;
  }

  get defaultValue(): any {
    return this._defaultValue;
  }

  set defaultValue(value: any) {
    this._defaultValue = value;
  }

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  get rule(): string {
    return this._rule;
  }

  set rule(value: string) {
    this._rule = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }
}
