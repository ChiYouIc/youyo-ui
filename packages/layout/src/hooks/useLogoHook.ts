import { reactive } from 'vue';
import { LogoType } from '../types/logo';

export default function useLogoHook(name: string, img: string, width?: number, height?: number, showName?: boolean) {
  const logo = reactive<LogoType>({
    name,
    img,
    width: width || 40,
    height: height || 40,
    showName: showName || true,
  });

  function switchShowName() {
    logo.showName = !logo.showName;
  }

  return { logo, switchShowName };
}
