export type dashboardItems = {
  external: boolean;
  disabled: boolean;
  menu?: boolean;
  title: string;
  path: string;
  module: string;
  icon: JSX.Element;
  onClick?: () => void;
  active?: boolean;
  children?: {
    path: string;
    active: boolean;
    icon: JSX.Element;
    title: string;
  }[];
};
