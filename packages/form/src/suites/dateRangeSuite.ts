import dayjs from 'dayjs';
import { defineSuite } from '../core/suite/index';

/**
 * 日期区间套件：开始日期 + 结束日期。
 *
 * 单个日期选择器只能校验自己是否必填，区间先后顺序必须由套件在 validate() 中判断。
 */
export const dateRangeSuite = defineSuite({
  type: 'DateRangeSuite',
  label: '日期区间套件',
  description: '开始与结束日期，校验先后顺序',
  fields: [
    {
      name: 'start',
      label: '开始日期',
      component: 'DatePicker',
      defaultValue: '',
      required: true,
      config: { placeholder: '请选择开始日期', picker: 'date', valueFormat: 'YYYY-MM-DD' },
    },
    {
      name: 'end',
      label: '结束日期',
      component: 'DatePicker',
      defaultValue: '',
      required: true,
      config: { placeholder: '请选择结束日期', picker: 'date', valueFormat: 'YYYY-MM-DD' },
    },
  ],
  validate: context => {
    const start = context.valueOf('start');
    const end = context.valueOf('end');

    if (!start || !end) {
      return undefined;
    }

    const startDate = dayjs(String(start));
    const endDate = dayjs(String(end));

    if (!startDate.isValid() || !endDate.isValid()) {
      return undefined;
    }

    if (endDate.isBefore(startDate, 'day')) {
      return `${context.labelOf('end')}不能早于${context.labelOf('start')}`;
    }

    return undefined;
  },
});

export default dateRangeSuite;
