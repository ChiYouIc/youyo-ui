import { reactive, toRefs } from 'vue';

export type LogoType = {
  name: string;
  img: string;
  width: number;
  height: number;
  showName: boolean;
};

const logo = reactive<LogoType>({
  name: '',
  img: '',
  width: 40,
  height: 40,
  showName: true,
});

export default function useLogoHook() {
  return {
    logo,
    ...toRefs(logo),
    setupLogo: (param: LogoType) => {
      logo.name = param.name;
      logo.img = param.img;
      param.width ? (logo.width = param.width) : undefined;
      param.height ? (logo.height = param.height) : undefined;
      param.showName ? (logo.showName = param.showName) : undefined;
    },
    switchShowName() {
      logo.showName = !logo.showName;
    },
  };
}
