import AbstractComponent from './AbstractComponent';
import { ComponentConstructorOptionType } from './types';

/**
 * 抽象工厂
 */
export interface AbstractFactory {
  name: string;
  creator: (c: ComponentConstructorOptionType) => AbstractComponent;
}

export default class Factory {
  private _cache: Map<string, AbstractFactory> = new Map<string, AbstractFactory>();

  constructor(factories: AbstractFactory[]) {
    factories.forEach(f => this._cache.set(f.name, f));
  }

  public creator(option: ComponentConstructorOptionType): AbstractComponent {
    const factory = this._cache.get(option.component);
    if (factory === undefined) {
      throw new Error(`No constructor found for ${option.component}`);
    }
    return factory.creator(option);
  }
}
