# youyo-form 使用说明

`youyo-form` 提供两个开箱即用的组件：

| 组件 | 导出名 | 全局标签名 | 用途 |
| --- | --- | --- | --- |
| 设计器 | `YouyoFormDesign` | `youyo-form-design` | 拖拽排版、编辑属性、查看 JSON 与表单值、预览 |
| 预览 | `YouyoFormView` | `youyo-form-preview` | 只读回显或填写已保存表单，支持表单/文本两种模式 |

类结构与加载链路见 [architecture.md](./architecture.md)，完整 API 清单见 [README.md](../README.md)。

- [1. 环境与安装](#1-环境与安装)
- [2. 最小示例：设计器](#2-最小示例设计器)
- [3. 预览与填写](#3-预览与填写)
- [4. 取值、配置 JSON 与校验](#4-取值配置-json-与校验)
- [5. 加载已有表单（JSON 往返）](#5-加载已有表单json-往返)
- [6. 自定义组件接入](#6-自定义组件接入)
- [7. 套件](#7-套件)
- [8. 注意事项](#8-注意事项)

## 1. 环境与安装

```bash
pnpm add youyo-form
```

- **Vue 3**：`^3.4`。
- **ant-design-vue 4**：组件渲染与主题 token 依赖它，需要在应用里全局注册：`app.use(Antd)`。
- **less**：以源码方式引入（`youyo-form/src`）时宿主需要能编译 less；构建产物会附带编译后的 `css`。

两种引入方式：

```ts
// 构建产物（css 随包提供）
import { Form, YouyoFormDesign, YouyoFormView, setupForm } from 'youyo-form';

// 源码，便于本地调试（需要宿主支持 less）
import { Form, YouyoFormDesign } from 'youyo-form/src';
```

> 类型补充：`AbstractComponent`、`Form`、`Factory` 等类与 `ComponentModel`、`FormModel`、`SuiteModel` 等类型都从包入口导出，自定义组件时用得到。

## 2. 最小示例：设计器

`Form` 的第一个参数由调用方生成的唯一 id，后面的参数依次是名称、版本、描述、组件列表：

```vue
<template>
  <YouyoFormDesign :form="form" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uuid } from 'vue-uuid';
import { Form, YouyoFormDesign } from 'youyo-form';

// id / name / version / description / components
const form = ref(new Form(uuid.v1(), '报名表单', '1.0.0', '示例表单', []));
</script>
```

模板标签按导入名解析（`<YouyoFormDesign>` / `<youyo-form-design>`）；也可以 `app.use(YouyoFormDesign)` 全局注册后直接使用标签（预览组件同理，全局标签为 `<youyo-form-preview>`）。

设计器与宿主共享同一个 `Form` 实例：选中、拖拽、删除都在内部完成并原地修改该实例，宿主随时可以读取 `form.components`、`toJson()`、`formValue()` 拿到最新结构（当前版本设计器不对外抛出事件，Demo 中写法的 `@selected` 不会触发）。

设计器右侧面板的「表单配置」用于设置名称、描述、渲染宽高、间距与标签排列方式；「组件配置」用于编辑选中组件的属性。左侧页签依次是组件库、套件库、`Json`（`form.toJson()`）与 `Json Value`（`form.formValue()`），可随时核对落库结构。

## 3. 预览与填写

```vue
<template>
  <!-- mode="form"：可交互填写；mode="text"：只读文本回显 -->
  <YouyoFormView :form="form" :data="values" mode="form" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, YouyoFormView } from 'youyo-form';
import schema from './form.json';

const form = ref(Form.fromJson(schema));
const values = ref(form.value.formValue());
</script>
```

模板标签按导入名解析（`<YouyoFormView>` / `<youyo-form-view>`）；`app.use(YouyoFormView)` 全局注册后标签是 `<youyo-form-preview>`。

| prop | 类型 | 说明 |
| --- | --- | --- |
| `form` | `FormModel` | 表单实例，`new Form(...)` 或 `Form.fromJson(...)` 都行，也接受 `ref()` / `reactive()` 包装后的实例 |
| `data` | `Record<string, any>` | 表单值对象，透传给内部 `<form>` 的 `model` |
| `mode` | `'form' \| 'text'` | `form` 渲染可交互组件，`text` 渲染纯文本；`Table` 与套件在两种模式下都由组件自身渲染 |

宽高、间距与标签布局来自表单配置（`labelWidth` / `width` / `height` / `verticalSpacing` / `horizontalSpacing` / `labelLayout`），预览会自动带上，同时注入 antd 主题 token，跟随宿主亮暗主题。

## 4. 取值、配置 JSON 与校验

```ts
const json = form.value.toJson();       // 表单配置，用于持久化
const value = form.value.formValue();   // 表单当前值
const { valid, errors } = form.value.validate(); // { valid: boolean, errors: { name, message }[] }

form.value.remove(component); // 移除某个组件（栅栏内的组件同样支持）
form.value.clear();           // 清空所有组件
```

- `formValue()` 输出**扁平结构**，key 是组件的 `name`；栅栏内的组件会被平铺，套件内部字段以 `${套件name}_${字段名}` 作为 key。
- `validate()` 包含必填校验、字段名重复校验，以及复选框的最少/最多选中项、套件跨字段等规则。
- 校验错误的 `name` 指向具体字段；套件内部字段的错误由套件整体上报，`name` 是套件的 `name`。

## 5. 加载已有表单（JSON 往返）

```ts
import { Form } from 'youyo-form';
import type { FormModel } from 'youyo-form';

// 保存
const schema = form.value.toJson();

// 还原
const restored: FormModel = Form.fromJson(schema);
```

`Form.fromJson()` 与 `new Form(...)` 走同一条加载链路：按 `component` / `suiteType` 从工厂取实体，再调用实体自己的 `init()` 还原属性、校验配置与组件值。栅栏会按 `list` 的原始下标还原并补齐空单元格，字段位置不会前移。

版式参数缺省值为：`labelWidth = '120px'`、`width = '100%'`、`height = '100%'`、`verticalSpacing = 16`、`horizontalSpacing = 16`、`labelLayout = 'horizontal'`。

## 6. 自定义组件接入

自定义组件分两步：实现一个组件实体类，再用 `setupForm()` 注册进工厂与调色板。

```ts
import { AbstractComponent, setupForm } from 'youyo-form';
import type { ComponentConstructorOptionType } from 'youyo-form';
import { h, type VNode } from 'vue';
import MyWidget from './MyWidget.vue';

class MyWidgetEntity extends AbstractComponent {
  private _value: string = '';

  init({ value }: Record<string, any>): void {
    this._value = value ?? this.defaultValue ?? '';
  }

  getVal(): string {
    return this._value;
  }

  protected setVal(val: any): void {
    this._value = val ?? '';
  }

  node(): VNode {
    return h(MyWidget, {
      id: this.primaryId(),
      value: this._value,
      'onUpdate:value': (val: string) => (this._value = val),
      disabled: this.disabled,
    });
  }

  configToJson(): Record<string, any> {
    return { ...super.configToJson(), value: this._value };
  }
}

setupForm({
  componentFactories: [{ name: 'MyWidget', creator: (c: ComponentConstructorOptionType) => new MyWidgetEntity(c) }],
});
```

必须实现的四个成员：

| 成员 | 作用 |
| --- | --- |
| `init(json)` | 从 JSON 还原自身属性与值，缺失时回落到 `defaultValue` |
| `getVal()` | 输出当前值，供 `formValue()` 使用 |
| `setVal(val)` | 程序化写值，`defaultValue` 的 setter 会调用它 |
| `node()` | 返回 `h(渲染组件, props)`；交互要写回私有字段，`formValue()` 才能取到新值 |

补充约定：

- 需要扩展 `toJson()` 输出时重写 `configToJson()`，先 `...super.configToJson()` 再追加自己的字段。
- 需要自定义校验时重写 `validate()`，通过返回 `undefined`，否则返回错误信息。
- `required` 的默认校验由基类提供，错误信息固定为「请输入」，值为空（`undefined` / `null` / 空串 / 空数组）时触发。
- `setupForm({ componentFactories })` 只是把自定义工厂**追加**到内置工厂之后；内置组件不受影响。
- `setupForm({ componentList })` 传入后会**整体替换**调色板，需要把想显示的条目都列出来：

```ts
setupForm({
  componentList: [
    { name: '输入框', component: 'Input', description: '输入框' },
    { name: '我的组件', component: 'MyWidget', description: '自定义组件' },
  ],
  componentFactories: [{ name: 'MyWidget', creator: (c: ComponentConstructorOptionType) => new MyWidgetEntity(c) }],
});
```

> 属性配置面板目前是包内注册表（`src/design/config/index.ts`），外部自定义组件在设计器里选中后会提示「暂未提供配置面板」，只影响属性编辑，不影响拖拽、渲染与取值。

## 7. 套件

套件用于表达**单个组件无法完成的跨字段校验**，例如「两次密码一致」「结束日期不早于开始日期」。内置 `PasswordSuite` 与 `DateRangeSuite` 随包自动注册，直接在设计器「套件」页签拖入即可。

自定义套件用 `defineSuite()` 声明，一处定义同时产出实体与调色板条目：

```ts
import { defineSuite } from 'youyo-form';

export const passwordSuite = defineSuite({
  type: 'PasswordSuite',
  label: '密码套件',
  description: '密码与确认密码，校验一致性',
  fields: [
    { name: 'password', label: '密码', component: 'Input', required: true, config: { type: 'password' } },
    { name: 'confirmPassword', label: '确认密码', component: 'Input', required: true, config: { type: 'password' } },
  ],
  validate({ values, labelOf }) {
    if (values.password !== values.confirmPassword) {
      return `${labelOf('confirmPassword')}与${labelOf('password')}不一致`;
    }
    return undefined;
  },
});
```

- 自定义套件要在应用入口 `import` 一次，注册随即生效。
- 内部字段的清单、组件类型、标签与必填由代码固定，设计器只暴露外层属性：标题、名称、必填、禁用。
- 套件必填 ⇒ 内部字段全部必填；套件禁用 ⇒ 内部字段全部禁用。
- 内部字段名会带上实例名前缀，因此同一表单可以放多个同类套件。
- 跨字段校验通过后返回 `undefined`；返回字符串即错误信息。

## 8. 注意事项

- **字段名唯一**：`name` 重复会让 `formValue()` 归并时互相覆盖，`validate()` 会报「字段名称重复」。设计器拖入组件时会自动分配未占用的 `name`。
- **栅栏**：最多 3 列；缩小行列时会自动补足行数，避免已放置的组件丢失；空单元格在 JSON 中为 `null`，还原时按原位置保留。
- **套件**：内部不允许再嵌套 `Fence` / `Suite`，`defineSuite()` 会做字段名校验与嵌套校验并抛出明确错误。
- **上传组件**：只管理文件列表，不会自动发送到服务端，由业务侧读取 `formValue()` 后自行上传。
- **实例与类型**：对外的 props / inject 使用结构化的 `FormModel` / `ComponentModel` 等类型，`ref()` / `reactive()` 包装过的实例可以直接传入（`UnwrapRef` 会丢掉类的私有字段，不要用类本身做 props 类型）。
- **设计器绑定**：画布用 `:list` 绑定 `form.components`，拖拽是原地修改数组，不需要也不应该用 `v-model:list`。
