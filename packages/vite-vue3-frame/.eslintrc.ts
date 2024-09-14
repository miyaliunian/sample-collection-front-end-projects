module.exports = {
  root: true,
  globals: {
    process: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },

  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ['babel', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 使用2个空格缩进
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    // 是否能使用debugger,开发可以，线上不可以
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    // switch必须提供 default
    'default-case': 'error',
    // 禁止扩展原生属性
    'no-extend-native': 'error',
    // 禁止一成不变的循环,防止代码出现死循环
    'no-unmodified-loop-condition': 'error',
    // 禁止在变量未声明之前使用
    'no-use-before-define': 'error',
    // 注释 // 或 /* 之后必须有一个空格
    'spaced-comment': ['error', 'always'],
    // 禁止重复导入模块，对于同一模块内内容，应一次导入
    'no-duplicate-imports': 'error',
    // 必须使用let 或 const, 不能使用var
    'no-var': 'error',
    // js中应使用单引号替代双引号
    quotes: ['error', 'single'],
    // 要求大括号内必须有空格
    'object-curly-spacing': ['error', 'always'],
    // 数组前后不需要添加空格
    'array-bracket-spacing': ['error', 'never'],
    // 箭头函数前后必须要有空格
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    // 代码中可出现console
    'no-console': 'off',
    // 正则中可以出现控制字符
    'no-control-regex': 'off',
    // 未使用的变量不能声明，除了rest结构出来的
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        // 可以声明未使用的h，方便jsx
        argsIgnorePattern: 'h'
      }
    ],
    // vue 属性顺序
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    // 一行最多几个属性
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // 组件名称必须是大驼峰
    'vue/name-property-casing': ['error', 'PascalCase'],
    // vue Html元素单标签关闭方式
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'never',
          void: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 统一换行符
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    "vue/no-v-model-argument":  "off"
  }
}
