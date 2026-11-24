# Apex — GitHub Pages release

**Mandatory development rule:** all changes must remain compatible with GitHub Pages as a static website. Use browser-compatible technologies and client-side storage; no backend, server-only APIs, secret-bearing server configuration or custom server routing may be required. Preserve existing data, features and experience unless changes are explicitly authorized. Keep this package self-contained, retain relative assets and hash routing, and verify packaged resources and affected browser behavior at root/repository URLs after significant changes. If a feature cannot meet these constraints, explain the limitation and propose a compatible alternative before implementing it. Local build/test tools are never production runtime dependencies. No commit, push or publication is authorized by compatibility checks alone.

A personal, responsive running companion for Benz: 31 weeks from November 2, 2026 through June 6, 2027, toward a sub-2 North Shore Classic half marathon, with supporting Shamrock Shuffle 8K (March 21) and Cinco de Miler five-mile (May 8) tune-ups.

## Features and dependencies

Overview with an interactive compact31-week mileage arc and current-week marked-distance context, a date-driven Today's Workout card and dynamic primary-race countdown, Monday-first icon-only monthly Overview calendar, phase/week Calendar, six consistent workout categories with subtype filters and combined-day icons, calculated HRR zones with clearly estimated effort pace examples, shared volume charts and four coach reports, centralized Settings for pace targets, athlete history, 14 strength guides with static two-frame movement illustrations and front/back muscle-region maps, and Race Performance & Prediction. Verified 5K/10K PBs, reported versus derived paces, Riegel equivalents and goal gaps remain distinct. Race performance includes local verified-result entry, event entry and primary selection. Optional manual completion marks and JSON export stay in the current browser. Overview retains Today, race countdown, weekly summary, monthly calendar and the training arc; its former plan-note and small performance-summary panels are removed. Full race performance remains on its dedicated page. The calendar is a proposal, not completed activity or confirmed race readiness.

Shared interface refinements include readable supporting text, consistent form/focus/error states, field-linked validation, 44px dialog controls, responsive keyboard-accessible tables and focus clearance for mobile navigation. Training data, calculations and local-storage formats are preserved. Local responsive checks cover ten routes at seven widths in both pace modes; physical-device, screen-reader and live Pages checks remain outstanding.

Plain HTML/CSS and classic JavaScript; no packages, build step, Node installation, backend, account, keys, CDN, or remote fonts are needed to publish or use this folder. A modern browser with JavaScript is required. Research/event links are external only when opened. All application assets are local.

Scheduled running excludes the additional warm-up/cool-down running shown separately. The half marathon retains its exact 21.0975 km distance. Today follows America/Chicago regardless of the device time zone. Training data, calculations, design and behavior are preserved from the source project.

## Complete repository structure

~~~text
.
├── .nojekyll
├── README.md
├── index.html
├── styles.css
├── app.js
├── training.js
├── exercises.js
└── assets/
    ├── apex.svg
    └── terrain.svg
~~~

These nine files are the entire release. Put their CONTENTS at the repository root; do not upload a parent release/ folder. Keep the empty .nojekyll file (Finder: Command-Shift-period reveals hidden files). No custom workflow is needed: GitHub manages branch-based Pages deployment. No CNAME, base tag, URL rewrite, custom 404, package manifest, or machine configuration is required. The full development README.html is intentionally excluded; the app does not reference it. The no-JavaScript message explains how to enable the app; no private archive is needed.

## Before publication

This app embeds the athlete's birth date, body metrics, HR values, race history and full plan. Visitors can read these from the site and its static files. They are deliberately preserved, not anonymized. A private repository does not by itself make a Pages website private. Confirm the intended repository, visibility and access policy before publishing. No push, repository creation, Pages setting change or publication was performed to prepare this folder.

No credentials are required or intentionally packaged. Common credential-pattern checks are useful but are not an exhaustive security audit. Keep exports, .env files, private keys, browser profiles, archives and QA material out of this repository.

## Publish to GitHub Pages — owner actions after approval

1. Create an EMPTY GitHub repository using your own account and intended visibility. Do not prepopulate a competing README. Pages availability depends on your plan and organization policy. Copy its actual HTTPS clone URL.
2. Open Terminal in this release folder, or a separate copy of these nine files. Verify index.html and .nojekyll are at the top level. For a fresh folder with no Git repository, use the following commands, replacing OWNER and REPOSITORY with the actual destination. Do not run git init over an existing checkout; use that repository's normal review process instead.

~~~sh
git init -b main
git add index.html styles.css app.js training.js exercises.js assets/apex.svg assets/terrain.svg README.md .nojekyll
git diff --cached --stat
git diff --cached
git commit -m "Prepare Apex static release"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git remote -v
git push -u origin main
~~~

Authenticate with your own GitHub account through the normal credential helper or SSH process; never put a token in these files or the remote URL. If Git requests a commit identity, configure your own name and verified or GitHub noreply email for this repository.

3. On GitHub open Settings → Pages → Build and deployment. Select Source: Deploy from a branch; Branch: main; Folder: /(root); Save. Do not select GitHub Actions as a custom publishing source for this package. GitHub still uses its own deployment run internally. No custom workflow or deployment token needs to be added.
4. Wait for GitHub's Pages deployment to finish; inspect Actions if it fails. Open the URL shown in Settings → Pages. A normal project URL has the form https://OWNER.github.io/REPOSITORY/ (placeholders only). Use the trailing slash. Confirm HTTPS and enable Enforce HTTPS when available. No domain or DNS change is needed for the standard URL.
5. Check Overview, Calendar, Workouts, HR Zones, Reports, Athlete Strength and Race performance at phone/tablet/desktop sizes. Open sessions, all four reports and exercise guides; check search/filtering, exact race totals, charts, Escape/focus, and JSON export. Temporarily mark a session, refresh, then undo it. Open and refresh /REPOSITORY/#calendar directly. Use hash routes; /REPOSITORY/calendar is not a route. Check for missing resources or browser security errors.

Official instructions: [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [creating a static Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). The .nojekyll marker disables Jekyll processing.

## Update and redeploy

Keep a private source-project backup with its tests, build helpers, canonical README and AGENTS instructions. This release is independently editable and deployable; those development files are not production dependencies.

Preferred: edit the original source project, preserve its training contracts, run node scripts/check.cjs, node scripts/build-release.cjs, and node --test tests/plan.test.cjs tests/performance.test.cjs tests/daily.test.cjs tests/presentation.test.cjs tests/audit.test.cjs tests/segments.test.cjs tests/guidance.test.cjs tests/release.test.cjs from that project's root. The builder refreshes the nine release files with content-derived asset versions and HTML security/referrer metadata. It refuses unexpected files or links and never deletes a repository. If this release folder has become a Git checkout, generate in a clean source copy and copy the nine reviewed files into the checkout instead. Never overwrite .git or existing repository settings.

Alternatively, edit the static files directly in a separate release checkout with no build required. If a referenced asset changes, update its ?v= query in index.html; if terrain.svg changes update its version in styles.css, then update the stylesheet version in index.html. Versions are cache keys; the source builder computes SHA-256 prefixes automatically. Preserve relative paths, deferred script order, the HTML Content Security Policy, no-referrer metadata, and .nojekyll. Inline styles are allowed for existing UI rendering; inline scripts and remote resources are blocked. Keep this README aligned with intentional deployment changes.

Preview through any local static HTTP server rooted at this folder, then repeat the checks above. No file outside this folder is needed. Direct file opening is supported by classic scripts, though browser storage policies may differ; HTTP preview is preferred for deployment checks.

In the release repository, start from an up-to-date clean main, create an update branch, copy/edit the intended files, inspect git diff, stage only the nine release paths, commit, push that branch and open a pull request. Merge after review. Every later push/merge to the configured main branch automatically redeploys; it is a publication action. No local test workflow is included in this minimal package. Verify the live deployment after each approved update. To roll back, revert the relevant commit through the same reviewed process; do not force-push.

## Today's Workout

The first Overview card resolves the actual America/Chicago date to the same calendar day object, independently of the week being browsed. It displays type, main km, effort/pace/HR reference, estimated all-in running duration, additional preparation and strength details, or a clear rest message. Tap for the full inspector. Dates outside the campaign show no prescription. A minute/focus/visibility check updates changed dates; an open dialog defers refresh until close. Duration estimates exclude walking, untimed mobility and strength; no activity is marked complete automatically.

## Categories, monthly calendar and effort guides

Easy Run (easy/recovery), Long Run (regular/progressive), Speed (steady/fartlek/tempo/intervals/race practice), Strength, Rest (full/active) and Race are presentation categories over the original prescriptions. Combined days show multiple category icons; mileage is counted once. Reports show planned days by category, with overlap identified. No progressive session is invented when none is prescribed.

Overview keeps Today first and replaces the week strip with a Monday-first month grid, defaulting to the Chicago month. Browse previous/next months or return with This month. Cells contain dates, category icons and a subtle manual-completion dot; tap for the original full details. Dates outside the campaign have no fabricated prescription. One existing date-based completion mark applies to the whole combined day. Browsing the month does not change Today or the full Calendar's selected week.

HRR remains unchanged. Effort Guide Pace examples reuse recovery/easy/steady/tempo/short-repetition targets, with RPE and purpose: Z1 7:15–8:00/km or slower; Z2 6:45–7:30 or slower; Z3 6:05–6:20; Z4 5:50–6:05; Z5 short-repetition example 5:25–5:40. These are provisional effort examples, not calibrated HR–pace boundaries. Do not accelerate to reach a zone. Scheduled controlled four-minute intervals retain their separate 5:35–5:50/km or slower prescription.

Strength artwork is original inline SVG: no added files, downloads, animations or dependency. Setup/end frames supplement written technique. Front/back maps distinguish primary/secondary muscle regions; deep structures are listed in text, not individually outlined. Follow written cues and individual comfortable range.

## Segment calculations and optional pace scenario

Running totals come from one segment engine in training.js. All underlying work/recovery segments remain individually calculated. Running details use the shared Rest/Strength protocol-card style for Preparation, Execution & Recovery. Execution groups work and all between-repetition jogs into repeat blocks; Recovery contains only cool-down and post-workout guidance. Counts, pace/HR/RPE and estimates remain intact, with exactly N−1 between-rep jogs and a final work repetition. Timed distance is seconds divided by midpoint seconds/km; explicit-distance segments remain fixed. Main km include work, jog recovery, lead-in and easy remainder. Additional warm-up/cool-down is added once to give total planned running. Walking/mobility and strength are not running distance. Totals use unrounded segment values and round once to four decimals. Row rounding can differ by0.0001km.

Daily cards, Today and inspectors show total planned running and identify the preserved main/preparation split. Weekly views retain both main and all-in columns. Bigger Picture reuses the same31-week all-in mileage series as Reports. It highlights the actual Chicago current week and distinguishes fully marked past weeks, other past weeks and upcoming weeks. A touch/keyboard week slider reveals phase/dates/mileage; Open week navigates to the Calendar. Current-week marked main distance remains a small context line, independent of inspected week. Done marks do not record actual km or confirm preparation completion; future marks are excluded until their date.

Baseline coaching targets remain the default. Open Settings → Pace Targets → Projected future scenario to explore conditional changes in future, unmarked training during this visit. Past/current dates, races, fixed goal-HM practice, recovery/preparation targets and strides never accelerate. Reload resets to baseline. Settings is the only pace control surface and includes current references, baseline/active preview and the model’s31 weekly examples; HR effort guides use the selected week's scenario context. HRR/LTHR and verified result predictions remain unchanged.

The scenario uses verified5K/10K Riegel evidence, remaining non-recovery build-week running minutes and a smooth cumulative curve. Its maximum pace reduction is the smaller of3% and the faster PB's positive HM gap to7200seconds (currently about2.24%). The3% guardrail and curve are transparent coaching assumptions, not a validated physiological forecast or safety threshold. Cutbacks/races/post-race weeks add no exposure credit; taper holds the last level. Faster examples require comfortable consistency, recovery and new real evidence, not elapsed time or completion marks. New verified PBs recalculate the scenario; no actual workout telemetry exists to establish adaptation.

All existing workouts have fixed main-distance budgets. Therefore faster timed-block estimates are balanced by a smaller easy remainder; daily/weekly total distance stays fixed, while segment estimates and durations recalculate. No running mileage was added by this release. Strides retain the original4×15sec:5:00/km is an illustrative estimate and90sec jog is an explicitly labelled recovery estimate within the main budget; full comfortable recovery governs execution.

## Release reliability and accessibility

Unknown hash routes safely open Overview. Cross-tab completion/race changes update the open page, defer visual replacement while a dialog is open, then refresh on close. Dialog focus returns to the matching control. Pace configuration lives only in Settings (desktop navigation or mobile More). Workout empty states include Reset filters. Phone form inputs/selects use 16px text, scrolling tables gain keyboard access, and desktop navigation scrolls on short screens. No runtime package or additional asset is required.

The app offers completion JSON export, not import or full race-data backup. Keep separate private copies of local race/result entries. A denied-storage visit keeps edits in memory with feedback. Local checks cover desktop Chrome and responsive viewport sizes; this does not establish physical iPhone/Safari/touch or assistive-speech behavior. The full development project's historical workflow is absent; this independent branch-root release does not require it.

## Training and race-data maintenance

Most build weeks use one full Monday rest day; four runs Tuesday/Thursday/Saturday/Sunday, Wednesday technique strength (reset after interval days) and optional light Friday core. Take full Friday rest if fatigued; initial recovery, cutbacks, post-race and taper weeks retain extra full rest. Never fill six days just to meet a rule. Race weeks override this. Cinco is 8.04672 km on Saturday May 8; it replaces W27 quality/long running, followed by optional 5 km recovery. W28 starts easy. W31 uses relaxed strides, not a second hard session. Weeks1–2 recover from the November1 15K; structured quality starts with gentle W3/W4 fartlek and builds through tempo and3×3/3×4 to selected Norwegian-style4×4 adaptations in W17/W25. Four-minute reps use5:35–5:50/km or slower, RPE6–7,3-minute easy recovery; no forced near-max HR. Races/cutbacks/recovery/taper govern exceptions. Early running preparation is1+0.5km additional, later1.5+1km; W11 starts main with0.5km easy as well, counted inside main. W5 shifts0.5km Tuesday→Thursday to accommodate preparation; scheduled weekly totals and peak remain unchanged. Easy/long 6:45–7:30/km or slower; tempo 5:50–6:05/km; other effort-led targets remain in training.js.

The new verified PBs are Will Run for Beet 5K (26:41, October 24, 2026) and Run Mag Mile 10K (57:34, September 12, 2026). The original 15.10 km / 1:29:57 result is retained. New 5K/10K distances are nominal, not inferred GPS distances. The 10K's reported 5:40/km differs from 5:45.4/km calculated from 57:34 / 10 km. Riegel HM equivalents are approximately 2:02:45 and 2:07:01; their spread is not a confidence interval or readiness guarantee.

Added race data/primary selection use apex-racing-v1 in this browser with visit-only fallback. New verified 5 or 10 km PB entries recalculate projections. Dated evidence equivalents are calculated now, not fabricated forecasts from the past. Built-in race priorities and dates are in training.js. Changing primary focus updates countdown and target-distance equivalents but does not automatically generate or retime a training plan. Additional events appear as notices on matching campaign dates; training changes need review. No new activity logs or physiology are inferred. Added entries are local and not included in the completion export; retain a private copy. They do not modify repository files and do not sync across devices. Existing date-based completion marks remain untouched when the schedule changes; review earlier marks against the revised schedule.

## Completion marks and limits

The existing apex-progress-v2 browser key is unchanged. Same-origin updates retain marks; a different browser/device or a move from file/localhost to Pages does not transfer them. Export privately first and keep the old browser available. Export is a reference backup: import and sync do not exist, so re-entry is manual. Repository paths on the same origin share storage scope.

This package has no service worker/offline cache and does not upload completion marks. Published use requires fetching static files; direct local use needs no network. Actual GitHub deployment, repository permissions, CDN/HTTPS, Safari/physical iPhone, touch and assistive technology behavior require checks in their real environments. Historical QA is retained privately in the source project, not shipped as release claims.
