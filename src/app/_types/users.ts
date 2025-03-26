// export interface CreateLoginPostRequestBody {
//   name: string;
//   email: string;
//   password: string;
// }

// ユーザー情報
export interface UserProfileResponse {
  id: number; // ユーザーID（主キー）
  name: string | null; // ユーザー名（ログイン用）
  // email?: string;     // メールアドレス（オプション）
  // password?: string;  // パスワード（ログイン用 / セキュリティ的にはハッシュ化するべき）
}

export interface UserProfileUpdateRequest {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
