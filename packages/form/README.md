# 动态表单

## 表单设计器

### 表单

- 表单配置
  - 表单名称
  - 表单描述
  - 表单渲染大小（高宽）
- 表单详情显示
- 表单操作
  - 版本选择
  - 版本升级
  - 表单内容获取（JSON）

### 组件库

- Input 输入框
- Textarea 多行输入框
- Select 选择框
- Cascader 级联选择
- InputNumber 数字输入框
- Slider 滑块
- Radio 单选框
- Checkbox 复选框
- Rate 评分
- Switch 开关
- TimePicker 时间选择框
- DatePicker 日期选择框
- Upload 上传
- Table 表格
- Fence 栅栏

### 套件库

套件是**硬编码**的组件实体，和栅栏一样通过工厂创建；区别是套件内部封装了多个字段，并由套件自己实现跨字段的联动与同步校验。

- PasswordSuite 密码套件：密码 + 确认密码，校验一致性、长度与字符组成
- DateRangeSuite 日期区间套件：开始日期 + 结束日期，校验先后顺序

套件在设计器中只能调整外层属性（标题、名称、必填、禁用），内部字段清单与校验规则由代码固定。

### 组件和套件的配置

- Input 输入框
- Textarea 多行输入框
- Select 选择框
- Cascader 级联选择
- InputNumber 数字输入框
- Slider 滑块
- Radio 单选框
- Checkbox 复选框
- Rate 评分
- Switch 开关
- TimePicker 时间选择框
- DatePicker 日期选择框
- Upload 上传
- Table 表格
- Fence 栅栏

## 核心 API

### Form

- `new Form(id, name, version, description, components?, labelWidth = '120px', width = '100%', height = '100%', verticalSpacing = 16, horizontalSpacing = 16, labelLayout = 'horizontal')`：创建表单；间距参数用于统一设置预览中组件的上下、左右间距，单位为 px；`labelLayout` 控制标签与组件左右或上下排列
- `Form.fromJson(json)`：从 `toJson()` 输出的 json 还原表单
- `form.toJson()`：输出表单配置 json，包含 `labelWidth` / `width` / `height` / `verticalSpacing` / `horizontalSpacing` / `labelLayout` / `components`
- `form.formValue()`：输出表单当前值，以组件的 `name` 为 key
- `form.validate()`：校验表单，返回 `{ valid, errors }`，`errors` 为 `{ name, message }` 列表。包含必填校验、字段名重复校验，以及复选框的最少/最多选中项校验（重复的 `name` 会让 `formValue()` 归并时相互覆盖）
- `form.remove(component)`：移除组件，栅栏内的组件同样支持
- `form.clear()`：清空所有组件

### 类型

对外暴露的 props / inject 用的是**结构化的描述类型**，而不是类本身：

- `FormModel`：表单，`components`、`clear()`、`remove()`、`formValue()`、`toJson()`、`validate()`
- `ComponentModel`：组件，`id`、`label`、`name`、`component`、`required`、`disabled`、`getVal()`、`validate()`、`node()` 等
- `FenceModel`：栅栏，继承 `ComponentModel`，额外有 `row`、`col`、`list`、`remove()`
- `SuiteModel`：套件，继承 `ComponentModel`，额外有 `suiteType`、`fields`
- `isFenceModel(component)`：判断是否为栅栏组件
- `isSuiteModel(component)`：判断是否为套件组件

实体类实现了对应类型（`Form implements FormModel`、`AbstractComponent implements ComponentModel`、`Fence implements FenceModel`），因此实例、`Form.fromJson()` 的结果、以及 `ref()` / `reactive()` 包过的实例（`UnwrapRef` 会丢掉类的私有字段）都能直接传入，不需要类型断言。

> `FormModel.components` 是只读的，设计器用 `:list` 而不是 `v-model:list` 绑定（vuedraggable 会原地修改数组，无需回写）。

### 组件校验

组件的必填规则统一由 `AbstractComponent.validate()` 提供：`required` 为真且值为空（`undefined` / `null` / 空字符串 / 空数组）时返回错误信息，否则返回 `undefined`。复选框可额外配置最少/最多选中项数；级联选择的值为从根到末级的路径数组；套件在自身 `validate()` 中先跑内部字段校验，再跑跨字段规则。`Form.validate()` 会下沉到栅栏内部组件，因此 `errors` 里是具体字段的 `name`；套件内部字段由套件统一上报，`errors` 里是套件的 `name`。

### 组件配置

- Select 支持单选、多选/标签、搜索、清空、最大选择数及禁用候选项。
- Radio 与 Checkbox 支持横向/纵向排列、禁用候选项；Checkbox 输出选中值数组。
- DatePicker / TimePicker 支持默认值、格式与范围选择。日期选择还支持可选日期上下界。
- Upload 支持文件类型、多文件、数量及单文件大小限制；上传文件由表单组件管理，不会自动发送到服务端。
- Table 支持列宽、对齐方式、分页及每页行数。
- InputNumber / Slider 支持数值范围与步长；InputNumber 另支持小数精度，Slider 支持区间值。
- Suite 套件只暴露外层属性：标题、名称、必填（下发给全部内部字段）、禁用；内部字段清单以只读方式展示。

### 栅栏 Fence

`configToJson()` 输出的 `list` 与行列数等长，空白单元格为 `null`，`Fence.init()` 据此按原位置还原，不会出现字段前移。栅栏支持 1–3 列；缩小行列时会自动扩展行数，以保留所有已放置的组件。

### 套件 Suite

套件用来表达**单个组件无法完成的跨字段校验**，例如「两次密码一致」「结束日期不早于开始日期」。

- **组件类型统一为 `Suite`**，用 JSON 中的 `suiteType` 区分具体套件；工厂、调色板与配置面板都只需要一份注册。
- **内部字段由代码固定**：字段清单、组件类型、标签、必填都在套件定义里写死，设计器只暴露标题、名称、必填、禁用。
- **字段名前缀**：内部字段名输出为 `${套件name}_${字段名}`，因此同一表单可以放多个同类套件；修改套件 `name` 会同步重写内部字段名。
- **外层属性**：套件 `required` 打开会让内部所有字段必填，`disabled` 会禁用内部所有字段。
- **校验顺序**：先逐个内部字段执行其自身校验（错误信息形如「密码：请输入」），再执行套件的跨字段校验，返回第一条错误。
- **JSON 往返**：`configToJson()` 输出 `suiteType` 与 `values`（以定义字段名为 key）。内部字段的标签、必填、组件类型不落盘，代码定义始终是唯一来源。
- **排版**：内部字段垂直排列，沿用表单的 `labelLayout` 与上下间距配置；文本预览模式下由套件自身渲染文本值。套件**不渲染外层 label**（与栅栏一致），由内部字段各自带标签；设计画布上会在套件左上角显示「标题 + 名称」标记，预览中不出现。
- **限制**：套件内部不允许再嵌套 `Fence` / `Suite`；`defineSuite()` 会做字段名校验与嵌套校验并抛出明确错误。

### 新增套件

套件通过 `defineSuite()` 声明，一处定义即可同时出现在实体工厂与调色板，不需要再改注册表：

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

跨字段校验的上下文提供：

- `values`：不带前缀的内部字段值
- `valueOf(field)`：按定义字段名取字段值
- `labelOf(field)`：按定义字段名取字段标签，便于拼装错误信息
- `fieldOf(field)`：按定义字段名取内部字段实体

`defineSuite()` 返回 `{ definition, Entity }`，注册是它的副作用；调用即在注册表中登记，因此只要模块被执行到，套件就会出现在设计器的「套件」页签中。

### 新增组件

新增一个组件需要在两处注册，key 都是组件的 `component`：

1. `src/config.ts`：`factories` 里补 entity 的 creator，`componentList` 里补调色板条目。
2. `src/design/config/index.ts`：`configPanels` 里补配置面板，key 与 `component` 一致。缺少面板时设计器会提示「暂未提供配置面板」，不会出现空白面板。

套件不需要改这两处：`defineSuite()` 会把定义写入套件注册表，「套件」页签与 `Suite` 工厂都从注册表读取，详见上文「新增套件」。

## 表单预览

- 组件渲染排版
- 栅栏组件的渲染
- 表单内容的校验

## bugfix

- 栅栏组件
