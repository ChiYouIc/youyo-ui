/**
 * 组件选择类型
 */
export type ComponentSelectType = {
  name: string;
  component: string;
  description: string;
  /** 套件条目的套件类型标识 */
  suiteType?: string;
};

export type DateType = {
  date: string;
  year: string;
  month: string;
  week: string;
  quarter: string;
};
