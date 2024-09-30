export interface IProduct {
  id: number;
  name: string;
  image: string;
  categoryId: number;
  price: number;
  description: string;
  stock: number;
}

export interface IFormErrors {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
}

export interface IOrder {
  id: number;
  status: string;
  date: string;
  products: IProduct[];
}

export interface IUserInfoProps {
  altText: string;
  imagePath: string;
}

export interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export interface ICardProductProps {
  id: number;
  name: string;
  image: string;
}
export interface IUserFormsProps {
  formType: "login" | "register";
  onClose: () => void;
}

export interface IUserImageProps {
  imagePath: string;
  altText: string;
}

export interface ISearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export interface IUserMenuProps {
  userFormsRef: React.RefObject<HTMLDivElement>;
  onButtonClick: () => void;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IUserContextType {
  userData: IUser | null;
  token: string | null;
  setUserData: (userData: IUser | null, token: string | null) => void;
}

export interface ISearchResultsProps {
  id: string;
}

export interface IPageParams {
  id: string;
}

export interface IUser{
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}
