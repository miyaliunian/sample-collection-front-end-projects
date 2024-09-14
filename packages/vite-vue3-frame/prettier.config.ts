module.exports = {
  arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号
  bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
  htmlWhitespaceSensitivity: 'css', // 指定 HTML 文件的全局空白区域敏感度
  insertPragma: false, // 标记指定文件格式需要被格式化
  jsxBracketSameLine: false, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
  jsxSingleQuote: false, // 在JSX中使用单引号
  printWidth: 100, // 单行输出（不折行）的（最大）长度
  proseWrap: 'preserve', // 是当屏幕放不下时发生的软折行
  quoteProps: 'as-needed', // 对象属性周围添加引号
  requirePragma: false, // 严格按照按照文件顶部的一些特殊的注释格式化代码
  singleQuote: true, // 使用单引号而非双引号
  tabWidth: 2, // 每一个水平缩进的空格数
  trailingComma: 'none', // 在任何可能的多行中输入尾逗号
  useTabs: false, // 使用tab（制表位）缩进而非空格
  semi: false, // 在语句末尾添加分号
  endOfLine: 'auto'
}
