# GGO FC 26 Tournament Dashboard

A real-time, Google Sheets-powered tournament management dashboard featuring live standings, automated match calculations, knockout brackets, and player statistics.

## 🚀 Key Features
- **Live Sync**: Pulls data directly from private or public Google Sheets every 5 minutes.
- **Auto-Calculations**: Automatically updates goal differences, points, and group rankings based on match results.
- **Dynamic Views**:
  - **Standings**: Group-by-group table with top-2 qualification highlighting.
  - **Matches**: Filterable list (Played, Upcoming, Today, Tomorrow).
  - **Knockout**: Visual bracket for Round of 16 through to the Grand Final.
  - **Stats**: Leaderboards for top scorers, most wins, and best goal difference.
  - **Schedule**: Dynamic schedule pulled directly from the "SCHEDULE" tab.

## 🏗️ Architecture
The system uses a "Relay" architecture to bypass CORS and private sheet permission issues:
1. **Google Sheets**: The source of truth (Players, Matches, Schedule).
2. **Apps Script Bridge (`bridge.js`)**: A standalone web app that acts as a secure data relay. It runs with the user's permissions to fetch data and serves it as JSON.
3. **Frontend (`tourney.html`)**: A vanilla HTML/JS dashboard that fetches JSON from the relay and renders the UI with custom branding.

## 🛠️ Setup Instructions

### 1. The Spreadsheet
Mirror your tournament data into a new Google Sheet. Ensure you have the following tabs named exactly:
- `Players` (Headers: Name, Group)
- `Matches` (Headers: Day, Time, Player 1, Player 2, Score 1, Score 2)
- `SCHEDULE` (Headers: Day, Time, Label)
- `Qualified 16` (Headers: Position, Name)

### 2. Deploy the Bridge
1. Open your Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the code from `bridge.js`.
4. Click **Deploy > New Deployment**.
5. Select **Web App**.
6. Set **Execute as: Me** and **Who has access: Anyone**.
7. **Copy the Web App URL**.

### 3. Connect the Dashboard
1. Open `tourney.html` in your browser.
2. Click the **Gear Icon (⚙️)** in the top right.
3. Paste your **Spreadsheet ID** (from the sheet URL).
4. Paste your **Web App URL** from Step 2.
5. Click **Save & Sync**.

## 🔄 Optimizing Workflow
Since `IMPORTRANGE` does not copy styling, use the **Mirror Formatting Script** provided in the `optimization_strategy.md` artifact to keep your public mirror sheet looking as professional as the source.

---
*Created for the GGO FC 26 Tournament.*
