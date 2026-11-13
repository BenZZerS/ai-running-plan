# Apex Endurance Coach — Athlete Training Documentation

## 1. Athlete Baseline & Biometric Profile (Benz)

* **Age / Weight / Height:** Born Aug 4, 1989 | 56.5 kg | 170 cm
* **Max Heart Rate (Max HR):** 201 bpm
* **Resting Heart Rate (RHR):** 64 bpm
* **Lactate Threshold HR (LTHR):** 190 bpm
* **Heart Rate Reserve (HRR):** 137 bpm ($201 - 64$)

## 2. Historical Race Benchmarks (Retained)

* **The Big 10K (July 11, 2026):** 10.07 km in **59:04** (Average Pace: **5:52 /km**)
* **Hot Chocolate 15K (Nov 1, 2026):** 15.10 km in **1:29:57** (Average Pace: **5:57 /km**, Best Pace: 4:47 /km | Avg HR: 174 bpm, Max HR: 187 bpm | Avg Cadence: 170 spm | Avg Power: 223 W | Ground Contact Time: 264 ms)

## 3. Heart Rate Reserve (%HRR) & Baseline vs. Projected Pace Targets

Calculated using formula: $\text{Target HR} = 64 + (\%\text{HRR} \times 137)$

* **Zone 1 (50–60% HRR | 133 – 146 bpm):** Active Recovery & Warm-up (`7:30 – 8:00 /km`)
* **Zone 2 (60–70% HRR | 146 – 160 bpm — Aerobic Base):**
  * **Current Baseline:** `6:45 – 7:15 /km` (anchored around `~7:00 /km`)
  * **Projected June 2027 Race-Day Fitness:** `6:25 – 6:50 /km`
* **Zone 3 (70–80% HRR | 160 – 174 bpm — Steady / Moderate):**
  * **Current Baseline:** `5:40 – 6:00 /km` (anchored around `~5:45 /km`)
  * **Projected June 2027 Race-Day Fitness:** `5:25 – 5:45 /km`
* **Zone 4 (80–90% HRR | 174 – 187 bpm — Lactate Threshold):**
  * **Current Baseline:** `5:20 – 5:35 /km`
  * **Projected Goal Half Marathon Pace:** `5:15 – 5:30 /km`
* **Zone 5 (90–100% HRR | 187 – 201 bpm — VO2 Max & Speed):**
  * **Current HIIT Intervals:** `4:35 – 5:00 /km`
  * **Projected HIIT / 8K Tune-Up Pace:** `4:25 – 5:10 /km`

## 4. 2027 Dual-Race Macrocycle (Monday–Sunday Cycle | Nov 2, 2026 – June 6, 2027)

* **Weekly Cycle Format:** Standardized **Monday–Sunday** (7-day) training weeks.
* **Calendar Start Date (Week 1):** **Monday, November 2, 2026** (Nov 2 – Nov 8, 2026), following the Nov 1 Hot Chocolate 15K completion.
* **Tune-Up Race (Week 20 — Sunday, March 21, 2027):** Bank of America Shamrock Shuffle 8K (Target: `~40:45 – 41:30` @ `5:05 – 5:15 /km`)
* **Primary Goal Race (Week 31 — Sunday, June 6, 2027):** North Shore Classic Half Marathon (Target: **Sub-1:56:00** @ `5:15 – 5:30 /km`)

### Periodization Phases & Optimization Principles

1. **Phase 1: Post-15K Recovery & Transition (Weeks 1–2 | Nov 2–Nov 15, 2026):** Begins Monday, Nov 2 with complete rest, mobility, and low-intensity Z1/Z2 recovery runs following the Nov 1 15K race.
2. **Phase 2: Winter Aerobic Base Build (Weeks 3–8 | Nov 16–Dec 27, 2026):** Establishes an 80/20 polarized structure (4 runs/week) building gradually ($\le 10\%$ weekly increases) to 32.0 km/week at `6:45 – 7:15 /km` Z2 pace, supported by twice-weekly strength/core work and a scheduled deload in Week 6.
3. **Phase 3: HM Threshold & Steady Endurance (Weeks 9–16 | Dec 28, 2026–Feb 21, 2027):** Introduces Z3 steady runs (`5:40 – 6:00 /km`) and Z4 threshold tempos (`5:20 – 5:35 /km`), progressing long runs from 14.5 km to 18.5 km with scheduled step-back weeks in Weeks 9, 13, and 16.
4. **Phase 4: VO2 Max & Shamrock Shuffle 8K Tune-Up (Weeks 17–21 | Feb 22–Mar 28, 2027):** Incorporates Norwegian 4x4 HIIT intervals and 8K pace repeats, features a mini-taper in Week 20 culminating in the **Sunday, March 21 Shamrock Shuffle 8K**, and concludes with a recovery week (Week 21).
5. **Phase 5: HM Overdistance & Specific Peak (Weeks 22–28 | Mar 29–May 16, 2027):** Reaches peak weekly volume (46.0–48.0 km/week) with race-simulation fast-finish long runs up to 21.5 km and mid-run gel fueling practice, balanced by scheduled deload weeks in Weeks 24 and 27.
6. **Phase 6: HM Taper & Race Week (Weeks 29–31 | May 17–June 6, 2027):** 3-week progressive taper reducing volume by ~40% while retaining sharp HM-pace touchpoints, 72-hour carbohydrate loading (385g/day), and race execution on **Sunday, June 6, 2027**.

## 5. Application Implementation Changes

* **`index.html`:** Updated the left sidebar Training Targets to display baseline vs. projected June 2027 pace ranges for Zone 2 (`6:45–7:15 /km` baseline $\rightarrow$ `6:25–6:50 /km` projected) and Zone 3 (`5:40–6:00 /km` baseline $\rightarrow$ `5:25–5:45 /km` projected); converted the entire calendar to a Monday–Sunday weekly cycle starting **Monday, November 2, 2026 (Week 1)** through **Sunday, June 6, 2027 (Week 31)**; aligned the Shamrock Shuffle 8K on Sunday, March 21, 2027 (Week 20) and North Shore Classic HM on Sunday, June 6, 2027 (Week 31).
* **`README.md`:** Synchronized all documentation sections with the revised training target ranges and Monday–Sunday 31-week schedule.
