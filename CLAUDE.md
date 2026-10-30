# Warlock of Firetop Mountain

A React + Vite web adaptation of the Fighting Fantasy gamebook. Commands: `npm run dev`, `npm run build`.

## Where things live

- `src/utils/infoPagesObj.js` - all page content, keyed by id (book section number, or a slug for rules/intro pages). Its header comment documents the page schema (`type`, `choices`, `effects`, `onEnter`, `enemies`, ...). Keep that comment up to date when the schema changes.
- `src/components/PageContainer.jsx` - player state reducer, navigation (`goTo`), stat effects, luck/skill tests, death transition.
- `src/components/BattlePage.jsx` + `src/utils/battleLogic.js` - combat rounds and luck-in-battle damage.
- `src/components/Inventory.jsx` - item/potion usage.

## Conventions

- Player stats are stored as strings (`'00'`), so always `parseInt` before doing maths.
- Player state only changes through reducer actions (`dispatch` in `PageContainer`); components receive it as `setPlayerState`, so never pass it a function or a plain object. Add a new action instead.
- Stat keys in effects: `Sta`, `Skill`, `Luck`, `Gold`, `Provisions`. Gains never exceed the initial value; nothing drops below 0.
- Text markup in page text: `**bold**`, `_italic_`, `[[color:text]]` (see `parseFormattedText.jsx`). Paragraphs are split on `\n`.
- Enemies are `"Name-skill-stamina"` strings, e.g. `"Orc-6-5"`.
- Battle pages can set `escape: <page id>` to offer an Escape button (confirmation modal, one wound on the player, optional Luck test). Escaping is only allowed when a page offers it.
- Reducer actions in `PageContainer`: `SET_PLAYER_STATE`, `ROLL_STAT`, `CHANGE_STAT`, `EAT` (one meal per page), `USE_ITEM` (potions), `ADD_ITEM`.
- Game rules follow the book; the rules pages in `infoPagesObj.js` are the source of truth for mechanics.

## Workflow

- Work happens on `dev`; the user pushes manually.
- The `DEV` menu action in `handleChoice` jumps to a test page with preset stats. Don't commit changes to its target page.
- Ask before implementing a feature or logic change; discuss the approach first.
