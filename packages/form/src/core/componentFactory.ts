import AbstractComponent from './AbstractComponent';
import { ComponentModeType, ComponentOption } from '../types';
import InputNumber from './entity/InputNumber';
import Input from './entity/Input';
import Radio from './entity/Radio';
import Rate from './entity/Rate';
import Select from './entity/Select';
import Slider from './entity/Slider';
import Switch from './entity/Switch';
import Table from './entity/Table';
import TimePicker from './entity/TimePicker';
import DatePicker from './entity/DatePicker';
import Upload from './entity/Upload';

/**
 * 抽象工厂
 */
interface AbstractFactory {
  creator: (c: ComponentOption) => AbstractComponent;
}

const InputFactory: AbstractFactory = { creator: c => new Input(c) };
const DatePickerFactory: AbstractFactory = { creator: c => new DatePicker(c) };
const InputNumberFactory: AbstractFactory = { creator: c => new InputNumber(c) };
const RadioFactory: AbstractFactory = { creator: c => new Radio(c) };
const RateFactory: AbstractFactory = { creator: c => new Rate(c) };
const SelectFactory: AbstractFactory = { creator: c => new Select(c) };
const SliderFactory: AbstractFactory = { creator: c => new Slider(c) };
const SwitchFactory: AbstractFactory = { creator: c => new Switch(c) };
const TableFactory: AbstractFactory = { creator: c => new Table(c) };
const TimePickerFactory: AbstractFactory = { creator: c => new TimePicker(c) };
const UploadFactory: AbstractFactory = { creator: c => new Upload(c) };

class ComponentFactory {
  private _cache: Map<ComponentModeType, AbstractFactory> = new Map<ComponentModeType, AbstractFactory>();

  constructor() {
    this._cache.set('Input', InputFactory);
    this._cache.set('DatePicker', DatePickerFactory);
    this._cache.set('InputNumber', InputNumberFactory);
    this._cache.set('Radio', RadioFactory);
    this._cache.set('Rate', RateFactory);
    this._cache.set('Select', SelectFactory);
    this._cache.set('Slider', SliderFactory);
    this._cache.set('Switch', SwitchFactory);
    this._cache.set('Table', TableFactory);
    this._cache.set('TimePicker', TimePickerFactory);
    this._cache.set('Upload', UploadFactory);
  }

  public creator(option: ComponentOption): AbstractComponent {
    const factory = this._cache.get(option.name);
    if (factory === undefined) {
      throw new Error(`No constructor found for ${option.name}`);
    }
    return factory.creator(option);
  }
}

const componentFactory = new ComponentFactory();

export default componentFactory;
