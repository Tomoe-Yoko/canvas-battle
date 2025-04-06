// モンスター情報
export interface Monster {
  id: number;
  userId: number;
  name: string;
  thumbnailImageKey: string;
}

export interface CreateMonsterPostRequestBody {
  userId: number;
  name: string;
  thumbnailImageKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMonsterResponseBody extends Monster {
  createdAt: Date;
  updatedAt: Date;
}
