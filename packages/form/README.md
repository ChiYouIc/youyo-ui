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

- Input 输出框
- Select 选择框
- InputNumber 数字输出框
- Radio 单选框
- Rate 评分
- Switch 开光
- TimerPicker 时间选择框
- DatePicker 日期选择框
- Upload 上传
- Table 表格
- Fence 栅栏

### 套件库

暂定

### 组件和套件的配置

- Input 输出框
- Select 选择框
- InputNumber 数字输出框
- Radio 单选框
- Rate 评分
- Switch 开光
- TimerPicker 时间选择框
- DatePicker 日期选择框
- Upload 上传
- Table 表格
- Fence 栅栏

## 核心 API

### Form

- `new Form(id, name, version, description, components?, labelWidth = '120px', width = '100%', height = '100%', verticalSpacing = 16, horizontalSpacing = 16, labelLayout = 'horizontal')`：创建表单；间距参数用于统一设置预览中组件的上下、左右间距，单位为 px；`labelLayout` 控制标签与组件左右或上下排列
- `Form.fromJson(json)`：从 `toJson()` 输出的 json 还原表单
- `form.toJson()`：输出表单配置 json，包含 `labelWidth` / `width` / `height` / `components`
- `form.formValue()`：输出表单当前值，以组件的 `name` 为 key
- `form.validate()`：校验表单，返回 `{ valid, errors }`，`errors` 为 `{ name, message }` 列表。包含两项规则：必填校验、字段名重复（重复的 `name` 会让 `formValue()` 归并时相互覆盖）
- `form.remove(component)`：移除组件，栅栏内的组件同样支持
- `form.clear()`：清空所有组件

### 类型

对外暴露的 props / inject 用的是**结构化的描述类型**，而不是类本身：

- `FormModel`：表单，`components`、`clear()`、`remove()`、`formValue()`、`toJson()`、`validate()`
- `ComponentModel`：组件，`id`、`label`、`name`、`component`、`required`、`disabled`、`getVal()`、`validate()`、`node()` 等
- `FenceModel`：栅栏，继承 `ComponentModel`，额外有 `row`、`col`、`list`、`remove()`
- `isFenceModel(component)`：判断是否为栅栏组件

实体类实现了对应类型（`Form implements FormModel`、`AbstractComponent implements ComponentModel`、`Fence implements FenceModel`），因此实例、`Form.fromJson()` 的结果、以及 `ref()` / `reactive()` 包过的实例（`UnwrapRef` 会丢掉类的私有字段）都能直接传入，不需要类型断言。

> `FormModel.components` 是只读的，设计器用 `:list` 而不是 `v-model:list` 绑定（vuedraggable 会原地修改数组，无需回写）。

### 组件校验

组件的必填规则统一由 `AbstractComponent.validate()` 提供：`required` 为真且值为空（`undefined` / `null` / 空字符串 / 空数组）时返回错误信息，否则返回 `undefined`。`Form.validate()` 会下沉到栅栏内部组件，因此 `errors` 里是具体字段的 `name`。

### 栅栏 Fence

`configToJson()` 输出的 `list` 与行列数等长，空白单元格为 `null`，`Fence.init()` 据此按原位置还原，不会出现字段前移。栅栏支持 1–3 列；缩小行列时会自动扩展行数，以保留所有已放置的组件。

### 新增组件

新增一个组件需要在两处注册，key 都是组件的 `component`：

1. `src/config.ts`：`factories` 里补 entity 的 creator，`componentList` 里补调色板条目。
2. `src/design/config/index.ts`：`configPanels` 里补配置面板，key 与 `component` 一致。缺少面板时设计器会提示「暂未提供配置面板」，不会出现空白面板。

## 表单预览

- 组件渲染排版
- 栅栏组件的渲染
- 表单内容的校验

## bugfix

- 栅栏组件
