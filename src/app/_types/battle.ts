export interface Battle {
  id: number;
  userId: number;
  monsterId: number; // 自分のモンスターID（外部キー）
  enemyId: number; // 対戦相手のモンスターID
  result: "win" | "lose" | "draw" | null; // バトル結果（勝ち・負け・引き分け）
}

// バトルリクエスト型（APIへ送るデータ）
export interface CreateBattleRequestBody {
  userId: number;
  monsterId: number;
  enemyId: number;
  result: "win" | "lose" | "draw" | null;
}

// バトルレスポンス型（APIから受け取るデータ）
export interface CreateBattleResponseBody {
  battleId: number;
  userId: number;
  monsterId: number;
  enemyId: number;
  result: "win" | "lose" | "draw" | null; // ← null を許容
}
