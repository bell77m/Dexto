export interface SocialLinkProps {
  src: string;
  alt: string;
}

export interface NavigationLinkProps {
  text: string;
  href: string;
}

export interface NavigationSectionProps {
  title: string;
  links: NavigationLinkProps[];
}