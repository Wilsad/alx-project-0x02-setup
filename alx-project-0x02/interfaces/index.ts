// Common interfaces for the project
export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  // Card component props interface
  export interface CardProps {
    title: string;
    content: string;
    className?: string; // Optional additional styling
  }
  
  // Post interface for dynamic content
  export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  }
  
  // PostModal component props interface
  export interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  }
  
  // Button component props interface
  export interface ButtonProps {
    children: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    shape: 'rounded-sm' | 'rounded-md' | 'rounded-full';
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }