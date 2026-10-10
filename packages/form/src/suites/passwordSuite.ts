import { defineSuite } from '../core/suite/index';

/**
 * 密码套件：密码 + 确认密码。
 *
 * 字段清单写死在代码里，跨字段校验在 validate() 中读取两个内部字段的值。
 */
export const passwordSuite = defineSuite({
  type: 'PasswordSuite',
  label: '密码套件',
  description: '密码与确认密码，校验一致性、长度与字符组成',
  fields: [
    {
      name: 'password',
      label: '密码',
      component: 'Input',
      defaultValue: '',
      required: true,
      config: { type: 'password', placeholder: '请输入密码', maxlength: 32 },
    },
    {
      name: 'confirmPassword',
      label: '确认密码',
      component: 'Input',
      defaultValue: '',
      required: true,
      config: { type: 'password', placeholder: '请再次输入密码', maxlength: 32 },
    },
  ],
  validate: context => {
    const password = String(context.values.password ?? '');
    const confirmPassword = String(context.values.confirmPassword ?? '');

    if (password !== confirmPassword) {
      return `${context.labelOf('confirmPassword')}与${context.labelOf('password')}不一致`;
    }

    if (password.length < 8) {
      return `${context.labelOf('password')}长度不能少于 8 位`;
    }

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return `${context.labelOf('password')}需同时包含字母和数字`;
    }

    return undefined;
  },
});

export default passwordSuite;
