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
