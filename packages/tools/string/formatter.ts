export type FormatType = string | number | boolean | null | undefined

export default class Formatter {
    /**
     * 格式化字符串<br>
     * 此方法只是简单将占位符 {} 按照顺序替换为参数<br>
     * 如果想输出 {} 使用 \\转义 { 即可，如果想输出 {} 之前的 \ 使用双转义符 \\\\ 即可<br>
     * 例：<br>
     * 通常使用：format("this is {} for {}", "a", "b") =》 this is a for b<br>
     * 转义{}： format("this is \\{} for {}", "a", "b") =》 this is \{} for a<br>
     * 转义\： format("this is \\\\{} for {}", "a", "b") =》 this is \a for b<br>
     *
     * @param pattern 字符串模板
     * @param params 参数列表
     * @return pattern 被 params 填充后的字符串
     */
    public static format(pattern: string, params: FormatType[]): string {

        if (pattern == "" || params.length == null) {
            return pattern;
        }

        let resStr = "";

        // 记录已经处理到的位置
        let handlePosition = 0;

        // 占位符所在位置
        let delimIndex = 0;

        for (let i = 0; i < params.length; i++) {
            delimIndex = pattern.indexOf("{}", handlePosition);


            // 剩余部分无占位符
            if (delimIndex == -1) {
                // 不带占位符的模板直接返回
                if (handlePosition == 0) {
                    return pattern;
                }
                // 字符串模板剩余部分不在包含占位符，加入剩余部分后返回
                return resStr + pattern.substring(handlePosition)
            }

            // 转义符
            if (delimIndex > 0 && pattern.charAt(delimIndex - 1) === '\\') {
                // 双转义
                if (delimIndex > 1 && pattern.charAt(delimIndex - 2) == '\\') {
                    // 转义符之前还有一个转义符，占位符依旧有效
                    resStr = resStr + pattern.substring(handlePosition, delimIndex - 1);
                    resStr += params[i];
                    handlePosition = delimIndex + 2;
                } else {
                    // 占位符被转义
                    i--;
                    resStr = resStr + pattern.substring(handlePosition, delimIndex - 1);
                    resStr = resStr + "{";
                    handlePosition = delimIndex + 1;
                }
            } else {
                // 正常占位符
                resStr = resStr + pattern.substring(handlePosition, delimIndex);
                resStr += params[i];
                handlePosition = delimIndex + 2;
            }

        }
        // 加入最后一个占位符后所有的字符串
        return resStr + pattern.substring(handlePosition);
    }
}
