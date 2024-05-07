export interface AvatarMenu {
  title: string;
  icon: string;
  action: () => void;
}

export interface AvatarProps {
  username: string;
  avatar: string;
  menuItem: AvatarMenu[];
}
