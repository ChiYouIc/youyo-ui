export interface AvatarMenu {
  title: string;
  icon: string;
  action: () => void;
}

export type AvatarType = {
  username: string;
  avatar: string;
  menuItem: AvatarMenu[];
};
