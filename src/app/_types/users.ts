// ユーザー情報
export interface UserProfileResponse {
  id: number; // ユーザーID（主キー）
  name: string | null; // ユーザー名（ログイン用）
}

export interface UserProfileUpdateRequest {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpForm {
  userName: string;
  email: string;
  password: string;
}

export interface LoginForm {
  userName?: string;
  email: string;
  password: string;
}
