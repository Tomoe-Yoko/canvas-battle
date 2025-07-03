# 🆚 Canvas Battle

[アプリを開く](https://canvasbattle-woad.vercel.app)

## 概要

**Canvas Battle** は、お絵描きしたキャラクターで**じゃんけんバトル**を楽しめる、子どもから大人まで遊べるWebアプリです。

---
## 開発の経緯

このアプリは、以下のような思いをもとに開発いたしました。
- **学習の復習とアウトプット**として形に残したかった
- **React（JavaScript）を使ったゲーム開発**に挑戦してみたかった
- **息子が喜ぶ要素**を詰め込んで一緒に楽しめるアプリを作りたかった
- **出先で小さな子どもが退屈しないように**、遊び感覚で触れる仕組みにしたかった

---
## 遊び方
-お絵描きページにて、自由にキャラクターをお絵描きします。
-描いたキャラクターでじゃんけんバトルに挑戦します。
　"敵"か"きみ"のどちらかのハート（HP）がなくなるとゲーム終了。何度も対戦できます。
 
---

## 主な機能

- **お絵描き機能**  
  - 自由にキャラクターを描ける（`React Sketch Canvas`）
  - 色・太さの変更や画像保存も可能
- **じゃんけんバトル**  
  - 描いたキャラでじゃんけん勝負
- **HP**  
  - 勝敗によってHPが減り、0になるとゲーム終了
- **繰り返しプレイ**  
  - バトルは何度でもリトライ可能
- **ユーザー絵画登録**  
  - ログイン中のユーザーは描いた絵を保存可能
- **ルーレット演出**  
  - バトル時に `React Custom Roulette` で遊び心のある演出
- **アニメーション**  
  - `Framer Motion` による動きのあるUI

---

## 使用技術

### フロントエンド
- **言語:** TypeScript
- **フレームワーク／ライブラリ:**
  - Next.js 15
  - React 19
  - Tailwind CSS 4
  - React Hook Form + Zod（フォーム管理）
  - SWR（データ取得とキャッシュ）
  - React Hot Toast
  - React Icons
  - React Modal
  - React Sketch Canvas（お絵描き）
  - React Custom Roulette（ルーレット）
  - Canvas Confetti（演出）
  - Framer Motion（アニメーション）
  - Browser Image Compression（※結果的に不要かも）

### バックエンド & データベース

- **使用技術:**
  - Next.js 15（API Routes）
  - Prisma（ORM）
  - Supabase（認証・DB連携）

### デプロイ
- **Vercel**

---

## 今後

- **UI改善:**  
  ユーザー体験の向上を目指してUIの改善を継続予定
- **機能追加:**  
  順次アップデートを実施予定

---

## 開発者向け情報

### パッケージインストール

```bash
npm install
# または
yarn install
