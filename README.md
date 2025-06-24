# 個人網站

本專案為使用 React、TypeScript 與 Vite 建置的個人網站。它具備熱模組替換（HMR）功能以提供快速的開發體驗，並包含基礎的 ESLint 設定。

## 核心技術

- React
- TypeScript
- Vite

## 環境需求

- Node.js：`23.10.0`
- 套件管理器：`npm`

## 開始使用

若要取得本地副本並執行，請依照下列簡單步驟操作。

### 安裝

1.  複製儲存庫：

    ```sh
    git https://github.com/ts03085781/my-vite-react-app.git
    ```

2.  進入專案資料夾

    ```sh
    cd my-vite-react-app
    ```

3.  安裝 NPM 套件：
    ```sh
    npm install
    ```

### 執行開發伺服器

若要啟動具備 HMR 功能的開發伺服器：

```sh
npm run dev
```

應用程式通常會在 `http://localhost:5173/`（或 Vite 指定的連接埠）上提供。

### 為生產環境建置

若要建立最佳化的生產版本：

```sh
npm run build
```

建置成果將儲存於 `dist/` 目錄中。

### 程式碼檢查

若要檢查程式碼是否有語法錯誤：

```sh
npm run lint
```

## 可用的腳本

在專案目錄中，您可以執行以下腳本：

- `npm run dev`
  - 啟動開發伺服器 (使用 Vite)。
- `npm run build`
  - 編譯 TypeScript (使用專案引用 `-b`) 並使用 Vite 打包專案。
- `npm run lint`
  - 使用 ESLint 檢查目前目錄 (`.`) 下的所有檔案。
- `npm run preview`
  - 在本機預覽生產環境的建置成果。
- `npm run format`
  - 使用 Prettier 自動格式化專案中所有符合規則的檔案 (直接修改檔案)。
- `npm run format:check`
  - 使用 Prettier 檢查專案中所有檔案的格式是否符合規範 (不修改檔案)。
- `npm run prepare`
  - 安裝 Husky 預設檔案所執行的語法, 會在執行 npm install 時觸發並執行。
- `npm run commit`
  - 預執行 commit 時,可以執行此命令, 以讓 commit 信息符合規範
- `npm run storybook`
  - 執行 Storybook 在 port:6006
- `npm run test`
  - 執行 vitest 的單元測試
