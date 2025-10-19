# UI設計方針 - Apple Human Interface Guidelines準拠

このプロジェクトは、Apple Human Interface Guidelines (HIG) に基づいた UI 設計を採用しています。

## 核心原則

### 1. 階層 (Hierarchy)
**明確な視覚的階層を確立し、コンテンツを強調・区別する**

#### 実装方針:
- ✅ **タイポグラフィの階層**: 見出し(h1) → サブ見出し(h2) → 本文 の明確な差別化
  - `/map`: タイトル `text-2xl sm:text-3xl md:text-4xl`
  - `/time`: タイトル `text-xl sm:text-2xl md:text-3xl`
  - 説明文: `text-sm sm:text-base`

- ✅ **視覚的重み付け**: 重要なアクションを目立たせる
  - プライマリボタン: グラデーション背景 + shadow
  - セカンダリボタン: 半透明背景 + border
  - 例: `/result` ページの「記憶を刻む」ボタンが最も目立つ

- ✅ **Z軸の深度**: レイヤーの明確な分離
  - 背景: `bg-gradient-to-br`
  - コンテンツ: `backdrop-blur-xl bg-white/10`
  - モーダル: `z-50` with backdrop

#### 改善点:
- [ ] フォーカス状態の視覚的フィードバックを統一
- [ ] 情報密度を適切に管理（余白の一貫性）

---

### 2. 調和 (Harmony)
**ハードウェアとソフトウェアの同心円状のデザインに合わせた調和を生み出す**

#### 実装方針:
- ✅ **統一されたデザイン言語**: 
  - すべてのページで紫〜ピンク〜青のグラデーション背景を使用
  - ガラスモーフィズム効果 (`backdrop-blur`, `bg-white/10`)
  - 円形アイコン + グラデーション背景の統一

- ✅ **トランジションとアニメーション**:
  - `animate-fadeIn`, `animate-slideUp` による自然な遷移
  - `transition-all duration-300` による滑らかな変化
  - ホバー時の `scale-[1.02]` による微細な反応

- ✅ **マテリアルデザイン**:
  - グラスモーフィズム: `backdrop-blur-sm`, `bg-white/5`
  - 影による深度表現: `shadow-lg shadow-purple-500/50`

#### 改善点:
- [ ] レスポンシブブレークポイントの統一 (現在: sm/md、追加検討: lg/xl)
- [ ] アニメーション速度の統一基準を明文化

---

### 3. 一貫性 (Consistency)
**プラットフォームで使用されている規則を採用し、一貫性のあるデザインを維持**

#### 実装方針:
- ✅ **レイアウトの一貫性**:
  - すべてのページで `fixed inset-0 overflow-hidden` による固定レイアウト
  - 縦スクロールを防止し、座標ズレを回避
  - レスポンシブ対応: `sm:` (640px), `md:` (768px)

- ✅ **カラーパレットの統一**:
  ```
  プライマリ: purple-500, pink-500
  背景: purple-900, indigo-900, blue-900
  テキスト: purple-200, white
  アクセント: amber-*, slate-*
  ```

- ✅ **コンポーネントの一貫性**:
  - ボタン: `rounded-lg`, `px-4 py-2`, `hover:scale-[1.02]`
  - カード: `backdrop-blur-xl`, `border border-white/20`
  - 入力フィールド: `bg-white/5`, `border-2 border-white/20`

- ✅ **アイコンの統一**:
  - Heroicons を使用
  - サイズ: `w-4 h-4` (small), `w-6 h-6` (medium), `w-8 h-8` (large)

#### 改善点:
- [ ] エラー状態の統一的な処理
- [ ] ローディング状態の統一的な表示

---

## レスポンシブデザイン原則

### ブレークポイント戦略
```
モバイル:  < 640px  (デフォルト)
タブレット: 640px+  (sm:)
デスクトップ: 768px+  (md:)
ワイド:    1024px+ (lg:) ※必要に応じて
```

### レスポンシブパターン
1. **テキストサイズ**: `text-sm sm:text-base md:text-lg`
2. **パディング**: `p-4 sm:p-6 md:p-8`
3. **アイコンサイズ**: `w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16`
4. **ギャップ**: `gap-2 sm:gap-3 md:gap-4`

---

## アクセシビリティ

### 必須要件
- ✅ 十分なコントラスト比 (WCAG AA準拠目標)
- ✅ タッチターゲットサイズ: 最小 44x44px
- ✅ フォーカス可能な要素への視覚的フィードバック
- ✅ alt属性の適切な使用

### 改善検討事項
- [ ] キーボードナビゲーションの完全サポート
- [ ] スクリーンリーダー対応の強化
- [ ] 動きの削減設定への対応

---

## コンポーネント設計原則

### 単一責任の原則
各コンポーネントは1つの明確な責務を持つべき:

#### 良い例:
```tsx
// ✅ 単一責任: ヘッダー表示のみ
<TimePageHeader />

// ✅ 単一責任: 日時入力のみ
<DateTimeInput value={...} onChange={...} />
```

#### 悪い例:
```tsx
// ❌ 複数の責任: レイアウト + データ取得 + 表示ロジック
<PageWithEverything />
```

### 再利用性
- 共通UIパターンはコンポーネント化
- プロップスで柔軟にカスタマイズ可能
- プレゼンテーション層とロジック層の分離

---

## パフォーマンス

### 最適化戦略
- ✅ 動的インポート: `dynamic(() => import(...))`
  - 例: Leaflet マップの SSR 無効化
- ✅ 画像最適化: Next.js Image コンポーネント（検討中）
- ✅ メモ化: 必要に応じて `useMemo`, `useCallback`

---

## デザイントークン

### スペーシング
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
```

### 角丸
```
小: rounded-sm (2px)
中: rounded-lg (8px)
大: rounded-xl (12px)
特大: rounded-2xl (16px)
完全: rounded-full
```

### トランジション
```
高速: duration-150 (150ms)
標準: duration-300 (300ms)
低速: duration-500 (500ms)
```

---

## 実装チェックリスト

各ページ/コンポーネント作成時:
- [ ] 階層: 視覚的優先順位は明確か？
- [ ] 調和: 他のページと一貫したデザインか？
- [ ] 一貫性: 既存のパターンを踏襲しているか？
- [ ] レスポンシブ: モバイル/タブレット/デスクトップで正しく表示されるか？
- [ ] アクセシビリティ: キーボード操作、スクリーンリーダー対応は？
- [ ] パフォーマンス: 不要な再レンダリングは発生していないか？

---

## 参考リンク
- [Apple Human Interface Guidelines](https://developer.apple.com/jp/design/human-interface-guidelines/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Best Practices](https://nextjs.org/docs)
