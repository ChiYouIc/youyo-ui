import Formatter, { FormatType } from './formatter';

/**
 * 格式化字符串
 * @param format 格式化模板
 * @param params 参数
 * @return format 被 params 填充后的字符串
 */
function format(format: string, params: FormatType[]): string {
  return Formatter.format(format, params);
}

export default {
  format,
};
