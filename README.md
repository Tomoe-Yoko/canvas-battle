# 🆚 Canvas Battle
[![キャンバスバトルTOP画像](https://github.com/user-attachments/assets/b6b08aa1-4583-4382-96a9-1a378f02eb19)](https://canvasbattle-woad.vercel.app)


## 概要

**Canvas Battle** は、お絵描きしたキャラクターで**じゃんけんバトル**を楽しめる、子どもから大人まで遊べるWebアプリです。
---

## URL
https://canvasbattle-woad.vercel.app

---
## 開発の経緯

このアプリは、以下のような思いをもとに開発いたしました。
- **学習の復習とアウトプット**として形に残したかった
- **React（JavaScript）を使ったゲーム開発**に挑戦してみたかった
- **息子が喜ぶ要素**を詰め込んで一緒に楽しめるアプリを作りたかった
- **出先で小さな子どもが退屈しないように**、遊び感覚で触れる仕組みにしたかった

---
## 遊び方

 <markdown-accessiblity-table data-catalyst=""><table>
<thead>
<tr>
<th>おえかき</th>
<th>じゃんけん</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="https://github.com/user-attachments/assets/44c2fc82-a3ab-44fb-81cf-4b4a3d44d5bb" alt="image" style="max-width: 100%;"></td>
<td><img src="https://github.com/user-attachments/assets/1f61da31-966a-47b4-a6b5-f3c115455cc2" alt="image" style="max-width: 100%;"></td>
</tr>
<tr>
<td>ログイン後、お絵描きページにて、自由にキャラクターをお絵描きします。</td>
<td>じゃんけんページにて自分と敵のモンスターを選定します。</td>
</tr>
</tbody>
</table></markdown-accessiblity-table>

<markdown-accessiblity-table data-catalyst=""><table>
<thead>
<tr>
 <th>バトル開始</th>
<th>じゃんけんバトル</th>

</tr>
</thead>
<tbody>
<tr> 
<td><img src="https://github.com/user-attachments/assets/d3bf64f3-4d7d-40bf-a264-18a164b21b9d" alt="image" style="max-width: 100%;"></td>
<td><img src="https://github.com/user-attachments/assets/745f44a3-56f0-49ef-807e-28c95d6ed7b6" alt="image" style="max-width: 100%;"></td>
</tr>
<tr>
 <td>描いたキャラクターでじゃんけんバトルに挑戦です。</td>
<td>　"敵"か"きみ"のどちらかのハート（HP）がなくなるとゲーム終了。何度も対戦できます。</td>
</tr>
</tbody>
</table></markdown-accessiblity-table>


 
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
![機能の表](https://github.com/user-attachments/assets/db0d6961-6d16-41d9-a251-4a1194f69721)

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


### バックエンド & データベース

- **使用技術:**
  - Next.js 15（API Routes）
  - Prisma（ORM）
  - Supabase（認証・DB連携）

### デプロイ
- **Vercel**

---

## ER図
![機能の表](https://github.com/user-attachments/assets/9b648eb0-1159-45b4-bbbd-d85378e56689)

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
