import { reactive, toRefs } from 'vue';

export type LogoType = {
  name: string;
  img: string;
  width: number;
  height: number;
  showName: boolean;
};

const logo = reactive<LogoType>({
  width: 40,
  height: 40,
  showName: true,
});

export default function useLogoHook() {
  return {
    ...toRefs(logo),
    setupLogo: ({ name, img, width, height, showName }: LogoType) => {
      logo.name = name;
      logo.img = img;
      width ? (logo.width = width) : undefined;
      height ? (logo.height = height) : undefined;
      showName ? (logo.showName = showName) : undefined;
    },
    switchShowName() {
      logo.showName = !logo.showName;
    },
  };
}
