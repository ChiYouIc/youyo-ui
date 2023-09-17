import { ComponentOption, ComponentSelectType } from '../types';
import AbstractComponent from '../core/AbstractComponent';
import Form from '../core/entity/Form';
import componentFactory from '../core/componentFactory';

let instance: Form;

function useFormHook() {
  if (instance === undefined) {
    instance = new Form();
  }

  return {
    save: (c: ComponentOption): AbstractComponent | undefined => {
      const component = componentFactory.creator(c);
      if (component !== undefined) {
        instance.save(component);
      }
      return component;
    },
    remove: instance.remove,
  };
}

export default useFormHook;
