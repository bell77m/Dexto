export interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export interface MessageCardProps {
  avatar: string;
  username: string;
  time: string;
  message: string;
  labels?: string[];
}

export interface ThemeOption {
  icon: string;
  label: string;
  isActive: boolean;
}
