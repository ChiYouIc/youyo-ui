# 动态表单（youyo-form）类图与加载流程

本文用 Mermaid 描述 `youyo-form` 的静态结构与运行时加载链路，VS Code / GitHub 可直接预览。
图只画主干，精确类型以 [src/core/types.ts](../src/core/types.ts) 为准。

> 安装、设计器/预览用法、自定义组件与套件见 [usage.md](./usage.md)。

- [1. 类图](#1-类图)
- [2. 加载流程：从 JSON 还原为可渲染的表单](#2-加载流程从-json-还原为可渲染的表单)
- [3. 加载后的渲染与取值链路](#3-加载后的渲染与取值链路)
- [4. 设计器侧的组件创建链路](#4-设计器侧的组件创建链路)

## 1. 类图

类图拆成两张：**1.1 看「谁实现哪个接口」**，**1.2 看「实体的成员、继承与组合」**。

### 1.1 接口与实现关系

```mermaid
classDiagram
    direction LR

    class ComponentActionType {
        <<interface>>
        +primaryId() string
        +init(json) void
        +configToJson() Record
        +valToJson() Record
        +node() VNode
        +validate() string
    }

    class ComponentModel {
        <<interface>>
        +id
        +label
        +name
        +defaultValue
        +component
        +required
        +disabled
        +getVal() any
    }

    class FenceModel {
        <<interface>>
        +row
        +col
        +list
        +remove(component) boolean
    }

    class SuiteModel {
        <<interface>>
        +suiteType
        +fields
    }

    class FormModel {
        <<interface>>
        +id
        +name
        +description
        +version
        +labelWidth
        +width
        +height
        +verticalSpacing
        +horizontalSpacing
        +labelLayout
        +components
        +clear() void
        +remove(component) boolean
        +formValue() Record
        +toJson() Record
        +validate() FormValidateResult
    }

    ComponentActionType <|-- ComponentModel
    ComponentModel <|-- FenceModel
    ComponentModel <|-- SuiteModel

    class AbstractComponent {
        <<abstract>>
    }
    class Form
    class Fence
    class Suite

    ComponentModel <|.. AbstractComponent
    FormModel <|.. Form
    FenceModel <|.. Fence
    SuiteModel <|.. Suite : 结构上满足 isSuiteModel
```

`AbstractComponent` 是**唯一直接实现 `ComponentModel` 的类**（`implements ComponentModel`），也是所有组件实体的共同父类；`Form` / `Fence` / `Suite` 各自实现更宽的结构化类型。其中 `Fence` 显式 `implements FenceModel`，`Suite` 没有写 `implements`，而是靠成员结构满足 `SuiteModel`，因此对外用 `isSuiteModel()` 守卫判断。

代码中这些位置的引用类型都是 `ComponentModel`，运行时实现统一是 `AbstractComponent` 的子类：`Form.components`、`Fence.list`、`Suite.fields`、渲染组件收到的 `component` prop。

### 1.2 实体类的继承与成员

接口实现关系见 1.1；本图只画实体自身的成员，以及实体之间的继承、组合与工厂依赖。

```mermaid
classDiagram
    direction LR

    class AbstractComponent {
        <<abstract>>
        -string _id
        -string _label
        -string _name
        -any _defaultValue
        -string _component
        -boolean _required
        -boolean _disabled
        +getVal() any
        #setVal(val) void
        +setValue(val) void
        +init(json) void
        +node() VNode
        #isBlank(val) boolean
        +validate() string
        +valToJson() Record
        +configToJson() Record
        +primaryId() string
    }

    AbstractComponent <|-- Input
    AbstractComponent <|-- Textarea
    AbstractComponent <|-- Select
    AbstractComponent <|-- Cascader
    AbstractComponent <|-- InputNumber
    AbstractComponent <|-- Slider
    AbstractComponent <|-- Radio
    AbstractComponent <|-- Checkbox
    AbstractComponent <|-- Rate
    AbstractComponent <|-- Switch
    AbstractComponent <|-- TimePicker
    AbstractComponent <|-- DatePicker
    AbstractComponent <|-- Upload
    AbstractComponent <|-- Table
    AbstractComponent <|-- Fence
    AbstractComponent <|-- Suite

    class Input {
        -string _value
        -string _placeholder
        -number _maxlength
        -string _type
        +init(json) void
        +node() VNode
        +getVal() any
        +configToJson() Record
        #setVal(val) void
    }

    class Fence {
        -number _row
        -number _col
        -_list
        +init(json) void
        +node() VNode
        +remove(component) boolean
        +getVal() Record
        +configToJson() Record
        #setVal(val) void
        -fillEmptyCells() void
    }

    class Suite {
        -SuiteDefinition _definition
        -_fields
        -_fieldDefinitions
        +suiteType
        +fields
        +init(json) void
        +validate() string
        +node() VNode
        +getVal() Record
        +valToJson() Record
        +configToJson() Record
        #setVal(val) void
        -buildFields() void
        -createField(def) AbstractComponent
        -fieldByName(name) AbstractComponent
        -rawValues() Record
        -syncFieldNames() void
        -applyOuterAttributes() void
    }

    class SuiteEntity {
        <<defineSuite 动态生成>>
    }
    Suite <|-- SuiteEntity

    class Form {
        -string _id
        -string _name
        -string _description
        -string _labelWidth
        -string _width
        -string _height
        -number _verticalSpacing
        -number _horizontalSpacing
        -string _labelLayout
        -_components
        +fromJson(json) Form$
        +clear() void
        +remove(component) boolean
        +validate() FormValidateResult
        +formValue() Record
        +toJson() Record
        -initComponents(list) void
        -collectErrors(components, errors) void
        -collectDuplicateNames(components, errors) void
        -collectNames(components, names) void
    }

    class Factory {
        -_cache
        +creator(option) AbstractComponent
    }

    class AbstractFactory {
        <<interface>>
        +name
        +creator(option) AbstractComponent
    }

    class FormConfig {
        <<module globalConfig>>
        +componentList
        +componentFactory Factory
        +setupForm(options) void
    }

    Factory "1" o-- "*" AbstractFactory
    Factory ..> AbstractComponent : 反射创建
    FormConfig "1" o-- "1" Factory
    Form ..> FormConfig : globalConfig.componentFactory
    Suite ..> FormConfig : 内部字段同样经工厂创建
    Fence ..> FormConfig : init 时递归创建单元格组件
    Form "1" o-- "*" AbstractComponent : _components
    Fence "1" o-- "*" AbstractComponent : _list 单元格
    Suite "1" o-- "*" AbstractComponent : _fields
    Suite ..> SuiteDefinition : 字段清单与跨字段校验
    AbstractComponent ..> VNode : node() 返回组件节点
```

### 1.3 关键成员类型对照

| 类 | 成员 | 实际类型 | 说明 |
| --- | --- | --- | --- |
| `AbstractComponent` | `_defaultValue` | `any` | setter 会调用 `setVal()`，容器类组件据此回填内部字段 |
| `AbstractComponent` | `validate()` | `string \| undefined` | 必填且 `isBlank()` 为真时返回错误信息 |
| `Fence` | `_list` | `Array<Array<AbstractComponent>>` | 按行优先排列，空单元格为空数组 |
| `Suite` | `_fields` | `Array<AbstractComponent>` | 与 `_fieldDefinitions` 下标一一对应 |
| `Suite` | `_fieldDefinitions` | `SuiteFieldDefinition[]` | 来自 `_definition.fields`，是字段清单的唯一来源 |
| `Form` | `_components` | `Array<AbstractComponent>` | 顶层组件，`components` 为只读视图 |
| `Form` | `labelLayout` | `'horizontal' \| 'vertical'` | 标签与组件的排列方式 |
| `Factory` | `_cache` | `Map<string, AbstractFactory>` | key 为组件的 `component` |
| `FormConfig` | `componentList` | `ComponentSelectType[]` | 设计器「组件」页签的数据源 |

### 1.4 注册关系

- **组件**：`config.ts` 的 `factories` 声明 `component → creator`，`componentList` 声明调色板条目，两者 key 都是 `component`。
- **套件**：`defineSuite()` 生成实体类并写入注册表，`config.ts` 里 `Suite` 的 creator 通过 `getSuite(suiteType)` 取到 `Entity` 再 `new`；`suitePaletteItems()` 用同一份注册表生成调色板条目。
- 内置套件通过 `config.ts` 顶部的 `import './suites'` 在模块加载时完成注册。

## 2. 加载流程：从 JSON 还原为可渲染的表单

`Form` 构造与 `Form.fromJson()` 走同一条链路：先由工厂造出实体，再交给实体自己的 `init()` 还原字段。

```mermaid
sequenceDiagram
    autonumber
    participant App as 调用方
    participant Form as Form
    participant Fac as Factory globalConfig.componentFactory
    participant Reg as 套件注册表 registry
    participant Ent as 组件实体

    App->>Form: Form.fromJson(json)
    Form->>Form: new Form(id, name, version, description, components, 版式参数)
    Form->>Form: initComponents(components)
    Form->>Form: components 为空则直接返回

    loop list 中的每个组件 JSON
        Form->>Fac: creator(option)
        Note over Fac: option 含 id/name/component/defaultValue/label/required/disabled/suiteType
        Fac->>Fac: _cache.get(option.component)
        alt option.component === 'Suite'
            Fac->>Reg: getSuite(suiteType)
            Reg-->>Fac: DefinedSuite 定义 + Entity
            Fac->>Ent: new suite.Entity(option)
            Ent->>Ent: buildFields() 用工厂递归创建内部字段并 init
        else 其他组件
            Fac->>Ent: new Xxx(option)
            Note over Ent: Fence 构造时先 fillEmptyCells 补齐单元格
        end
        Form->>Ent: component.init(json)
        Note over Ent: 还原 value / placeholder / options / 行列数等
        Form->>Form: _components.push(component)
    end

    Form-->>App: Form 实例
    Note over App: 可直接 toJson() / formValue() / validate()，或交给预览组件渲染
```

栅栏的内部加载是递归的，单独看一遍：

```mermaid
flowchart TD
    A["Fence.init(json)"] --> B["钳制 col 到 1..3、row 至少为 1"]
    B --> C["遍历 json.list，按行优先还原单元格"]
    C --> D{"单元格为 null ?"}
    D -- 是 --> E["push 空数组占位"]
    D -- 否 --> F["globalConfig.componentFactory.creator(item)"]
    F --> G["component.init(item)"]
    G --> H["push 单个组件的单元格"]
    E --> I["fillEmptyCells()"]
    H --> I
    I --> J["按已有组件的最大下标补足 total = row * col"]
    J --> K["渲染与拖拽时下标不越界，字段位置不前移"]
```

## 3. 加载后的渲染与取值链路

```mermaid
flowchart TD
    A["Form 实例（组件实体已就绪）"] --> B["YouyoFormPreview preview/index.vue<br/>provide mode"]
    B --> C["YForm preview/form.vue<br/>provide form"]
    C --> D{"遍历 form.components"}
    D -->|"component === 'Fence'"| E["FormFenceItem 按 row × col 网格铺开 list"]
    E --> F["YFormItem preview/formItem.vue<br/>标签宽度取 form.labelWidth"]
    D -->|"其他组件"| F
    F --> G{"mode 为 form ?"}
    G -- 是 --> H["Factory factory/index.vue"]
    G -- 否 --> I["文本模式：直接输出 component.getVal()，Table / Suite 除外"]
    H --> J["component.node()"]
    J --> K["h(CInput / CCheckbox / CFence / CSuite ...)"]
    K --> L["用户交互触发 onUpdate:value，回写实体私有字段"]
    L --> M["form.formValue() / form.toJson() / form.validate()"]
    C --> N["Form.validate() 下沉栅栏内部组件"]
    N --> O["errors 为具体字段的 name，套件按其自身 name 上报"]
```

## 4. 设计器侧的组件创建链路

设计器拖拽产生组件的路径与加载同源，都汇聚到 `Factory.creator()`：

```mermaid
flowchart LR
    P1["调色板「组件」页签<br/>globalConfig.componentList"] --> C["onClone design/select.vue"]
    P2["调色板「套件」页签<br/>suitePaletteItems()"] --> C
    C --> R["globalConfig.componentFactory.creator(option)<br/>id 取 uuid，name 取未占用的 nextFieldName"]
    R --> S["form.components.push(实体)<br/>画布由 vuedraggable 绑定同一数组"]
    S --> T["design.vue 渲染 draggableItem，config.vue 编辑属性面板"]
    T --> U["emit toConfig / toRemove / toClean 回写 Form 与配置面板"]
```

## 5. 相关源码

| 关注点 | 文件 |
| --- | --- |
| 类型定义与守卫 | [src/core/types.ts](../src/core/types.ts) |
| 表单实体与校验 | [src/core/Form.ts](../src/core/Form.ts) |
| 组件基类 | [src/core/AbstractComponent.ts](../src/core/AbstractComponent.ts) |
| 抽象工厂 | [src/core/Factory.ts](../src/core/Factory.ts) |
| 组件实体 | [src/core/entity/](../src/core/entity/) |
| 套件基类与注册表 | [src/core/suite/Suite.ts](../src/core/suite/Suite.ts)、[src/core/suite/index.ts](../src/core/suite/index.ts) |
| 工厂与调色板注册 | [src/config.ts](../src/config.ts) |
| 预览渲染 | [src/preview/](../src/preview/) |
| 设计器 | [src/design/](../src/design/) |
