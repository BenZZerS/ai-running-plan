/* Training prescriptions are a conservative coaching proposal, not completed activity. */
(function (root) {
  'use strict';
  const DAY = 86400000;
  const START = Date.UTC(2026, 10, 2);
  const athlete = {
    name: 'Benz', born: '1989-08-04', weight: 56.5, height: 170,
    maxHR: 201, restingHR: 64, lthr: 190,
    current: { easy: '≈6:45 /km', steady: '≈5:30 /km', source: 'Latest self-reported references; not a threshold test' },
    history: [
      { id: 'mag-mile-2026', name: 'Run Mag Mile 10K', date: '2026-09-12', km: 10, seconds: 3454, pace: '5:40', label: '10K', distanceBasis: 'nominal', verified: true, bestPace: '3:57', avgHR: 183, maxHR: 196, cadence: 169, power: 242, contact: 262 },
      { id: 'beet-2026', name: 'Will Run for Beet 5K', date: '2026-10-24', km: 5, seconds: 1601, pace: '5:20', label: '5K', distanceBasis: 'nominal', verified: true, bestPace: '3:46', avgHR: 185, maxHR: 199, cadence: 177, power: 261, contact: 259 },
      { id: 'hot-chocolate-2026', verified: true, distanceBasis: 'measured', name: 'Hot Chocolate 15K', date: '2026-11-01', km: 15.10, seconds: 5397, pace: '5:57', label: '15K', bestPace: '4:47', avgHR: 174, maxHR: 187, cadence: 170, power: 223, contact: 264 }
    ]
  };
  const races = {
    primary: { id: 'north-shore', role: 'primary', name: 'North Shore Classic', discipline: 'Half marathon', date: '2027-06-06', km: 21.0975, cutoffSeconds: 7200, targetPace: [338, 340], url: 'https://northshoreclassic.com/half-marathon/' },
    tuneup: { id: 'shamrock', role: 'secondary', pace: [335, 350], name: 'Shamrock Shuffle', discipline: '8K tune-up', date: '2027-03-21', km: 8, url: 'https://www.shamrockshuffle.com/event-info/participant-information/event-faqs/' },
    cinco: { id: 'cinco', role: 'secondary', name: 'Cinco de Miler', discipline: '5 mile tune-up', date: '2027-05-08', km: 8.04672, pace: [340, 355], url: 'https://cincodemiler.com/race-details/' }
  };
  const raceCalendar=Object.values(races);
  const sources = [
    { id: 'four-minute', title: 'Four-minute intervals: repeatable effort', author: 'NTNU CERG · guidance reviewed November 14, 2026', url: 'https://www.ntnu.edu/cerg/advice', finding: 'Four 4-minute efforts with active recovery are an established interval format. This plan uses a slower, effort-capped adaptation after 3×3 and 3×4 progressions, not a replication of the high-HR research protocol or proof of HM readiness.' },
    { id: 'cinco', title: 'Cinco de Miler official race details', author: 'Organizer · checked November 14, 2026', url: races.cinco.url, finding: 'May 8, 2027; five miles (8.04672 km). Organizer notes that details may change.' },
    { id: 'distribution', title: 'Intensity distribution in recreational runners', author: 'Muñoz et al. · 2014', url: 'https://pubmed.ncbi.nlm.nih.gov/23752040/', finding: 'Supports substantial easy running. Small trials do not establish a universal optimal 80/20 split; study zones differ from five HRR bands.' },
    { id: 'progression', title: 'Single-session distance spikes & injury', author: 'Frandsen et al. · 2025', url: 'https://doi.org/10.1136/bjsports-2024-109380', finding: 'Observational association with distance spikes beyond the recent longest run. A weekly 10% guideline is not a safety guarantee.' },
    { id: 'taper', title: 'Tapering in endurance athletes', author: 'Wang et al. · 2023 · meta-analysis', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0282838', finding: 'Supports reducing volume over a taper of up to 21 days while retaining brief intensity and frequency. Exact individual response varies.' },
    { id: 'strength', title: 'Strength training & running economy', author: 'Llanos-Lagos et al. · 2024 · meta-analysis', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11052887/', finding: 'Resistance training can support running economy; certainty and individual effects vary. Start with technique and progress resistance gradually.' },
    { id: 'readiness', title: 'Race-time models in recreational runners', author: 'Vickers & Vertosick · 2016', url: 'https://doi.org/10.1186/s13102-016-0052-y', finding: 'Riegel-style estimates provide context up to the half marathon, not proof of individual race readiness.' },
    { id: 'hrr', title: 'Find your target heart rate', author: 'HPRC · training guidance', url: 'https://www.hprc-online.org/physical-fitness/training-performance/find-your-target-heart-rate', finding: 'Heart-rate reserve uses resting and maximum HR. Five equal HRR bands are this app’s convention, not measured metabolic thresholds.' },
    { id: 'recovery', title: 'Load in sport & injury risk', author: 'IOC consensus · 2016', url: 'https://doi.org/10.1136/bjsports-2016-096581', finding: 'Interpret training load with recovery and well-being. A resting-HR change alone cannot diagnose overtraining.' },
    { id: 'nutrition', title: 'Fueling for performance', author: 'USADA · 2026 nutrition guide', url: 'https://www.usada.org/wp-content/uploads/2026-TS-Nutrition-Guide.pdf', finding: 'Match daily carbohydrate to actual training demand; practice 30–60 g/hour during prolonged running.' },
    { id: 'loading', title: 'Carbohydrate loading', author: 'HPRC · 2026 guidance', url: 'https://www.hprc-online.org/nutrition/performance-nutrition/carb-loading-right-way', finding: 'For events over 90 minutes, 10–12 g/kg/day over the final 36–48 hours is a loading guideline to rehearse for tolerance.' }
  ];
  const phases = [
    { id: 'recovery', name: 'Recover & reset', short: 'Recovery', from: 1, to: 2, note: 'Absorb the November 1 race. Resume only when soreness and daily energy have settled.' },
    { id: 'base', name: 'Build your foundation', short: 'Aerobic base', from: 3, to: 8, note: 'Four comfortable runs, small long-run steps, and technique-first strength. No need to chase pace.' },
    { id: 'endurance', name: 'Develop endurance', short: 'Endurance', from: 9, to: 16, note: 'Introduce controlled work in short blocks. Keep the long run easy and protect recovery weeks.' },
    { id: 'tuneup', name: 'Sharpen & assess', short: '8K preparation', from: 17, to: 21, note: 'A little faster running, a lighter race week, then recovery. The 8K informs the goal; it does not decide it alone.' },
    { id: 'specific', name: 'Make it race specific', short: 'HM specific', from: 22, to: 28, note: 'Conditional goal-pace practice, fueling rehearsal, and easy long runs up to 19 km. Repeat a week if recovery slips.' },
    { id: 'taper', name: 'Freshen up & race', short: 'Taper', from: 29, to: 31, note: 'A lighter third week leads into two clear taper weeks. Keep brief pace reminders and arrive rested.' }
  ];
  const targets = {
    easy: { name: 'Easy aerobic', pace: [405, 450], zone: 2, rpe: '2–3 / 10', cue: 'Full sentences. Slow down for hills, heat, or rising effort; pace is a guide.' },
    recovery: { name: 'Recovery', pace: [435, 480], zone: 1, rpe: '1–2 / 10', cue: 'Gentle and restorative. Walk or rest if the jog does not feel easier as you go.' },
    steady: { name: 'Controlled steady', pace: [365, 380], zone: 3, rpe: '4–5 / 10', cue: 'Comfortably controlled, never a time trial. These provisional paces are a coaching starting point.' },
    tempo: { name: 'Controlled tempo', pace: [350, 365], zone: 4, rpe: '6 / 10', cue: '5K speed is ahead of endurance evidence. Short phrases, even effort, one repetition left. Slow down if this feels like racing.' },
    interval: { name: 'Short intervals', pace: [325, 340], zone: null, rpe: '7 / 10', cue: 'Controlled current 5K/10K effort. HR lags: do not accelerate to reach Zone 5.' },
    aerobicInterval: { name: 'Controlled four-minute intervals', pace: [335,350], zone: null, rpe: '6–7 / 10', cue: 'Repeatable current-fitness effort, not a time trial. Keep one repetition in reserve. HR lags: never accelerate to chase a percentage. Start slower, reduce a repetition, or run easy if recovery or form deteriorates.' },
    goal: { name: 'Goal-HM practice', pace: [338, 340], zone: null, rpe: '5–6 / 10', cue: 'Conditional target, not confirmed fitness. Use controlled steady effort instead if recovery or recent results do not support it.' },
    longRun: { name: 'Easy long run', pace: [405, 450], zone: 2, rpe: '3 / 10', cue: 'Mostly conversational. Shorten to about 120–130 minutes if fatigue or pace makes the full distance excessive.' }
  };
  // Columns: Thu easy, Tue main, Sat easy, Sun long scheduled km; session; recovery week.
  // Warm-up/cool-down running is extra and has its own numeric fields.
  const rows = [
    [0,3.5,4,4.5,'recovery',true], [4,4.5,3.5,6,'strides',false],
    [4.5,5,4,6.5,'fartlek4',false], [5,5,5,7,'fartlek6',false],
    [5.5,6,5,7.5,'steady9',false], [4.5,5,4,6.5,'easy',true],
    [5.5,6.5,5.5,8,'steady12',false], [6,7,6,8.5,'fartlek9',false],
    [5,6,5,7,'easy',true], [6.5,7.5,6,9,'tempo12',false],
    [7,8,6.5,9.5,'interval3x3',false], [7.5,8.5,7,10,'tempo18',false],
    [6,7,6,8,'easy',true], [8,8.5,7,11,'goal3',false],
    [8,9,7.5,12,'interval3x4',false], [6.5,7,6.5,10,'easy',true],
    [8,8.5,7.5,13,'norwegian4x4',false], [8,9,7.5,14,'tempo20',false],
    [6,7,5,15,'strides',true], [5,5.5,3.5,8,'easy',true],
    [4.5,6,4.5,10,'easy',true], [7,7,6,14,'fartlek12',false],
    [7.5,7.5,6,15,'goal4',false], [6,7,5,12,'easy',true],
    [8,8,6,16,'norwegian4x4',false], [8,8,6.5,17.5,'easy',false],
    [5,5,8.04672,5,'easy',true], [8,8,6,19,'strides',false],
    [6.5,7,5.5,13,'tempo12',true], [5,6,5,8,'goal9min',true],
    [3.5,3.5,2,21.0975,'strides',true]
  ];
  const quality = {
    fartlek4: { kind:'steady', type:'fartlek', title:'Fartlek · 4 × 1 min relaxed steady', reps:4, minutes:1, recovery:2 },
    fartlek6: { kind:'steady', type:'fartlek', title:'Fartlek · 6 × 1 min relaxed steady', reps:6, minutes:1, recovery:2 },
    fartlek9: { kind:'tempo', type:'fartlek', title:'Fartlek · 6 × 90 sec controlled', reps:6, minutes:1.5, recovery:2 },
    fartlek12: { kind:'tempo', type:'fartlek', title:'Fartlek · 6 × 2 min controlled', reps:6, minutes:2, recovery:2 },
    steady9: { kind:'steady', title:'3 × 3 min relaxed steady', reps:3, minutes:3, recovery:2 },
    interval3x3: { kind:'aerobicInterval', type:'interval', title:'3 × 3 min controlled intervals', reps:3, minutes:3, recovery:3 },
    interval3x4: { kind:'aerobicInterval', type:'interval', title:'3 × 4 min controlled intervals', reps:3, minutes:4, recovery:3 },
    norwegian4x4: { kind:'aerobicInterval', type:'interval', format:'norwegian-style', title:'Norwegian-style 4 × 4 min · controlled', reps:4, minutes:4, recovery:3 },
    steady12: { kind: 'steady', title: '3 × 4 min steady', reps: 3, minutes: 4, recovery: 2 },
    tempo12: { kind: 'tempo', title: '2 × 6 min controlled tempo', reps: 2, minutes: 6, recovery: 2 },
    tempo18: { kind: 'tempo', title: '3 × 6 min controlled tempo', reps: 3, minutes: 6, recovery: 2 },
    tempo20: { kind: 'tempo', title: '2 × 10 min controlled tempo', reps: 2, minutes: 10, recovery: 3 },
    goal3: { kind: 'goal', title: '3 × 1 km at goal HM pace', reps: 3, workKm: 1, recovery: 2 },
    goal4: { kind: 'goal', title: '2 × 2 km at goal HM pace', reps: 2, workKm: 2, recovery: 3 },
    goal9min: { kind: 'goal', title: '3 × 3 min at goal HM pace', reps: 3, minutes: 3, recovery: 2 }
  };
  const strength = {
    A: { name: 'Strength A · durable legs', focus: 'Squat, hinge, calf strength & trunk control', minutes: 30,
      exercises: [ ['dumbbell goblet squats','2–3 × 6–8'], ['dumbbell romanian deadlifts','2–3 × 8'], ['calf raises','2–3 × 10–12'], ['dead-bugs','2 × 8 / side'] ] },
    B: { name: 'Strength B · stability & core', focus: 'Light Friday hip/core/calf technique; keep loading comfortable', minutes: 15,
      exercises: [ ['clamshells','2 × 12 / side'], ['bird-dogs','2 × 8 / side'], ['side-planks','2 × 20–30 sec / side'], ['calf raises','2 × 10'] ] },
    reset: { name: 'Mobility & gentle core', focus: 'Comfortable movement; bodyweight only during recovery', minutes: 12,
      exercises: [ ['bird-dogs','1–2 × 6 / side'], ['dead-bugs','1–2 × 6 / side'], ['clamshells','1–2 × 10 / side'] ] }
  };
  const dateAt = offset => new Date(START + offset * DAY).toISOString().slice(0,10);
  const round = x => Math.round(x * 10000) / 10000;
  const avg = range => (range[0] + range[1]) / 2;
  const zones = () => Array.from({length:5}, (_,i) => ({
    number:i+1, lowPct:50+i*10, highPct:60+i*10,
    low: Math.round(athlete.restingHR + (athlete.maxHR-athlete.restingHR)*(.5+i*.1)),
    high: Math.round(athlete.restingHR + (athlete.maxHR-athlete.restingHR)*(.6+i*.1))
  }));
  function running(day, km, kind='easy', extra={}) {
    return { day, km, type:kind, title:targets[kind].name, target:kind, qualityKm:0,
      warmupKm:0, cooldownKm:0, note:targets[kind].cue, ...extra };
  }
  function mainSession(km, code, week) {
    if(code==='recovery') return running('Tue',km,'recovery');
    const q=quality[code];
    if(!q) return running('Tue',km,'easy',code==='strides'?{
      title:'Easy run + relaxed strides', qualityKm:round(4*15/300),
      strides:true, note:'Within the scheduled run, include 4 × 15 seconds relaxed strides on flat ground, with full easy recovery. Smooth, not sprinting; skip if sore.'
    }:{});
    const t=targets[q.kind];
    return running('Tue',km,q.kind,{
      type:q.type||q.kind, title:q.title, work:{...q}, leadInKm:q.kind==='aerobicInterval'&&week<=14?.5:0, qualityKm:round(q.reps*(q.workKm || q.minutes*60/avg(t.pace))),
      warmupKm:week===31?.75:week<=14?1:1.5, cooldownKm:week===31||week<=14?.5:1,
      note:`${q.title}. ${q.kind==='aerobicInterval'&&week<=14?'Start the scheduled main run with 0.5 km easy before the first repetition, after the additional warm-up. ':''}${q.recovery} min easy jog between repetitions. Complete the remaining scheduled distance easy; recoveries are included. ${t.cue}${q.format==='norwegian-style'?' Controlled adaptation of the 4×4 format, not the original high-HR research protocol; reduce to 3 repetitions if needed.':''}`
    });
  }
  const plan=rows.map((r,i)=>{
    const week=i+1, phase=phases.find(p=>week>=p.from&&week<=p.to);
    const rest=(day,title='Rest & recharge',note='Rest or comfortable walking. No catch-up mileage. Prioritize sleep and regular meals.')=>({day,type:'rest',title,km:0,note});
    const main=mainSession(r[1],r[4],week);
    const lightWeek=r[5]||week<=2||week===28;
    const midweekStrength=lightWeek||main.type==='interval'?'reset':'A';
    const days=[rest('Mon'),main,{day:'Wed',type:'strength',title:strength[midweekStrength].name,strength:midweekStrength,km:0,note:'Technique only; reduce to gentle mobility or full rest if the quality session leaves fatigue.'},running('Thu',r[0]),lightWeek?rest('Fri'):{day:'Fri',type:'strength',title:strength.B.name,strength:'B',km:0,note:'Optional gentle technique, not heavy lifting. Rest instead if fatigue, pain or soreness persists; no need to fill six days.'},running('Sat',r[2]),running('Sun',r[3],'longRun')];
    if(week===1){
      days[0]=rest('Mon','Post-15K complete rest','Recovery after the November 1 Hot Chocolate 15K; prescribed, not logged activity.');
      days[1]=rest('Tue','Mobility & easy walking');
      days[2]={day:'Wed',type:'strength',title:strength.reset.name,strength:'reset',km:0};
      days[3]=running('Thu',r[1],'recovery');
      days[5]=running('Sat',r[2],'recovery');
      days[6]=running('Sun',r[3],'recovery');
    }
    if(week===20){
      // The race is the only purposeful session.
      days[1]=running('Tue',r[1],'easy');
      days[2]=rest('Wed','Rest & gentle mobility');
      days[6]={day:'Sun',type:'race',raceId:'shamrock',target:'goal',title:'Shamrock Shuffle 8K',km:8,qualityKm:8,warmupKm:1.5,cooldownKm:.5,pace:races.tuneup.pace,note:'Open controlled for 2 km; only build if comfortable. Illustrative current-fitness guide 5:35–5:50/km, not a required finish time. Use effort over pace in difficult conditions; record the result before recalibrating.'};
    }
    if(week===21){
      days[0]=rest('Mon','Post-8K complete rest');
      days[1]=running('Tue',r[1],'recovery');
      days[2]={day:'Wed',type:'strength',title:strength.reset.name,strength:'reset',km:0};
      days[5]=running('Sat',r[2],'easy');
    }
    if(week===26){days[6]={...days[6],title:'Long run · optional HM rehearsal',target:'goal',qualityKm:4,work:{kind:'goal',reps:2,workKm:2,recovery:4},note:'Only after comfortable prior weeks: 2 × 2 km at conditional goal HM pace with 4 min easy between; remaining distance easy. Otherwise all 17.5 km easy. No other quality this week. Shorten around 120–130 minutes if needed.'};}
    if(week===27){
      days[2]=rest('Wed','Rest & mobility before tune-up');
      days[5]={day:'Sat',type:'race',raceId:'cinco',target:'tempo',title:'Cinco de Miler · 5 mile tune-up',km:races.cinco.km,qualityKm:races.cinco.km,warmupKm:1.5,cooldownKm:1,pace:races.cinco.pace,note:'The only hard session this week. Five miles = 8.04672 km. Estimated controlled guide 5:40–5:55/km (about 45:36–47:36); start at the slower end, RPE 6–7, no sprint requirement. Primary HM preparation takes priority. Walk instead of jogging the cool-down if sore.'};
      days[6]=running('Sun',5,'recovery',{note:'Optional 5 km very gentle recovery after Cinco; shorten, walk or rest if soreness or fatigue persists. No long run or fast finish today; do not make up missed distance.'});
    }
    if(week===28){days[1]=running('Tue',r[1],'easy',{note:'Easy only after Cinco. Shorten if recovery is incomplete; no catch-up quality.'});days[2].strength='reset';days[2].title=strength.reset.name;days[6].note+=' Resume the 19 km only with normal recovery and recent 16–17.5 km tolerance; shorten otherwise.';}
    if(week===29)days[2].note='One light technique set, bodyweight; avoid soreness.';
    if(week>=30)days[2]=rest('Wed','Rest & mobility','No new strength stimulus in the final taper.');
    if(week===31){
      days[1]=mainSession(r[1],'strides',week);
      days[1].note+=' Race-week primer only; skip strides if tired. No hard workout before the primary race.';
      days[3].note+=' Prepare familiar foods for final 36–48 hour loading.';
      days[4].title='Rest, fuel & prepare';days[4].note='Begin practiced carbohydrate loading: 565–678 g/day at 56.5 kg, starting near 565 g only if rehearsed and tolerated. Drink to thirst.';
      days[5].note+=' Continue practiced carbohydrate loading, familiar gear and meals; avoid new foods.';
      days[6]={day:'Sun',type:'race',raceId:'north-shore',target:'goal',title:'North Shore Classic Half Marathon',km:races.primary.km,qualityKm:races.primary.km,warmupKm:0,cooldownKm:0,note:'Conditional sub-2: first 2 km about 5:45/km, then near 5:38–5:40/km only with supporting training and race evidence. Reassess after 16 km. Adjust to conditions; do not bank time. Practice 30–60 g carbohydrate/hour.'};
    }
    const raceWeek=days.some(d=>d.type==='race');
    const qualityReason=week<=2?'Post-15K recovery: no structured speed in Weeks 1–2; Week 2 strides are optional only after soreness settles.':raceWeek?'Race replaces the weekly quality session; all other running stays easy.':week===28?'After Cinco: no extra speed this week; resume easy volume only if recovery is normal.':week===26?'Optional Sunday HM blocks are this week’s sole quality session; keep Tuesday easy.':week>=29?'Taper: retain only the brief prescribed reminder; shorten or skip it if recovery is incomplete.':r[5]?'Cutback: no structured speed; easy running and recovery take priority.':'One Tuesday quality session only. Repeat a stage or run easy if prior weeks, sleep or soreness do not support progression.';
    days.forEach((d,j)=>{d.date=dateAt(i*7+j);d.id=d.date;});
    return {week,phase:phase.id,phaseName:phase.short,from:dateAt(i*7),to:dateAt(i*7+6),recovery:r[5],qualityReason,focus:phase.note+' '+qualityReason,days};
  });
  // Scenario arithmetic is a coaching illustration, not a fitted physiological response model.
  function paceScenario(weekNumber,{history=athlete.history,asOf=chicagoDate()}={}){
    const perf=performance(history.filter(r=>validResult(r)&&r.date<=asOf));
    const anchor=validDate(asOf)?currentWeek(asOf):null;
    const goal=races.primary.cutoffSeconds;
    // Midpoint of the PB equivalents is context, never a new race result.
    // Cap by the faster-PB goal gap and a 3% coaching guardrail, not a safety threshold.
    const midpoint=perf.low==null?goal:(perf.low+perf.high)/2;
    const gap=Math.max(0,1-goal/midpoint);
    const fastGap=perf.low?Math.max(0,1-goal/perf.low):0;
    const ceiling=Math.min(.03,gap,fastGap);
    const eligible=w=>anchor!=null&&w.week>=anchor&&w.week<=28&&w.week>2&&!w.recovery&&w.week!==28&&!w.days.some(d=>d.type==='race');
    const dose=w=>w.days.reduce((n,d)=>n+(d.km+(d.warmupKm||0)+(d.cooldownKm||0))*avg(targets.easy.pace)/60,0);
    const pool=plan.filter(eligible),total=pool.reduce((n,w)=>n+dose(w),0);
    const prior=pool.filter(w=>w.week<weekNumber).reduce((n,w)=>n+dose(w),0);
    const fraction=total?Math.min(1,prior/total):0;
    const smooth=fraction*fraction*(3-2*fraction);
    return {week:weekNumber,anchor,progress:fraction,improvement:ceiling*smooth,ceiling,factor:1-ceiling*smooth,baselineHM:midpoint,goalSeconds:goal,label:'Projected training scenario'};
  }
  function targetFor(d,options={}){
    const key=d.target||'easy',base=targets[key]||targets.easy;
    const enabled=options.mode==='projected'&&validDate(d.date)&&d.date>(options.today||options.asOf||chicagoDate())&&options.marks?.[d.id]!==true&&d.type!=='race';
    const scenario=enabled?paceScenario(currentWeek(d.date),options):null;
    // Recovery, preparation, strides and conditional goal practice never accelerate with this scenario.
    const adjustable=['easy','longRun','steady','tempo','interval','aerobicInterval'].includes(key);
    const projected=!!(scenario&&scenario.improvement>0&&adjustable);
    return {...base,pace:[...(d.pace||base.pace)].map(p=>projected?Math.round(p*scenario.factor):p),projected,scenario};
  }
  function sessionSegments(d,options={}){
    if(!(d.km>0))return [];
    const segments=[],primary=targetFor(d,options),easy=targetFor({...d,type:'easy',target:'easy',pace:undefined},options);
    const preparation={...targets.easy,pace:[...targets.easy.pace],projected:false};
    const add=(kind,label,{km,minutes,target=easy,extra=false,purposeful=false,estimatedPrescription=false}={})=>{
      const timed=minutes!=null,seconds=timed?minutes*60:km*avg(target.pace);
      const distance=timed?seconds/avg(target.pace):km;
      if(!Number.isFinite(distance)||distance<0)throw Error('Invalid segment: '+d.id+' '+label);
      const segment={kind,label,basis:timed?'time':'distance',km:distance,seconds,pace:[...target.pace],zone:target.zone,rpe:target.rpe,extra,purposeful,projected:target.projected===true,estimatedPrescription,
        distanceRange:timed?[seconds/target.pace[1],seconds/target.pace[0]]:[distance,distance]};
      segments.push(segment);return segment;
    };
    const nonRunning=(kind,label)=>segments.push({kind,label,basis:'non-running',km:0,seconds:0,pace:null,zone:null,rpe:'1–2 / 10',extra:true,purposeful:false,projected:false,distanceRange:[0,0]});
    if(d.warmupKm)add('warmup','Warm-up · easy running',{km:d.warmupKm,target:preparation,extra:true});
    else nonRunning('warmup','Warm-up · walking / mobility, no running prescribed');
    const lead=d.leadInKm||0;if(lead)add('easy','Easy lead-in · inside main distance',{km:lead});
    const mainStart=segments.length;
    if(d.work){
      const q=d.work;
      if(!Number.isInteger(q.reps)||q.reps<1||!(q.workKm>0||q.minutes>0)||!(q.recovery>=0))throw Error('Invalid repetitions: '+d.id);
      for(let rep=1;rep<=q.reps;rep++){
        add(q.kind,`${primary.name} · ${rep}/${q.reps}`,{...(q.workKm?{km:q.workKm}:{minutes:q.minutes}),target:primary,purposeful:true});
        if(rep<q.reps&&q.recovery)add('jog',`Easy jog recovery · ${rep}/${q.reps-1}`,{minutes:q.recovery,target:preparation});
      }
    }else if(d.strides){
      for(let rep=1;rep<=4;rep++){
        add('stride',`Relaxed stride · ${rep}/4`,{minutes:.25,target:{...targets.interval,pace:[300,300],zone:null,projected:false},purposeful:true,estimatedPrescription:true});
        if(rep<4)add('jog',`Full easy recovery · ${rep}/3`,{minutes:1.5,target:preparation,estimatedPrescription:true});
      }
    }else add(d.type,d.type==='race'?'Race · fixed official distance':primary.name,{km:d.km-lead,target:primary,purposeful:d.type==='race'});
    const allocated=segments.slice(mainStart).reduce((n,s)=>n+s.km,lead);
    const remainder=d.km-allocated;
    if(remainder<-.0000001)throw Error('Work and recovery exceed main distance: '+d.id);
    if(remainder>1e-9)add('easy','Easy remainder · fills prescribed main distance',{km:remainder});
    if(d.cooldownKm)add('cooldown','Cool-down · easy running',{km:d.cooldownKm,target:preparation,extra:true});
    else nonRunning('cooldown','Cool-down · optional walking, no running prescribed');
    return segments;
  }
  function sessionStats(d,options={}){
    if(!d.km)return {mainMinutes:0,allInMinutes:0,seconds:0,extraSeconds:0,mainKm:0,extraKm:0,allInKm:0,qualityKm:0,segments:[]};
    const segments=sessionSegments(d,options),main=segments.filter(s=>!s.extra),extra=segments.filter(s=>s.extra);
    const sum=(items,key)=>items.reduce((n,s)=>n+s[key],0);
    const seconds=sum(main,'seconds'),extraSeconds=sum(extra,'seconds');
    return {mainMinutes:Math.round(seconds/60),allInMinutes:Math.round((seconds+extraSeconds)/60),seconds,extraSeconds,mainKm:sum(main,'km'),extraKm:sum(extra,'km'),allInKm:sum(segments,'km'),qualityKm:sum(main.filter(s=>s.purposeful),'km'),segments};
  }
  function stats(w,options={}){
    const runningDays=w.days.filter(d=>d.km>0),sessions=runningDays.map(d=>sessionStats(d,options));
    const sum=key=>sessions.reduce((n,s)=>n+s[key],0);
    const scheduled=round(sum('mainKm')),extra=round(sum('extraKm')),faster=round(sum('qualityKm'));
    const raceKm=round(runningDays.filter(d=>d.type==='race').reduce((n,d)=>n+d.km,0));
    return {scheduled,extra,allIn:round(scheduled+extra),faster,raceKm,trainingOnly:round(scheduled-raceKm),runs:runningDays.length,strength:w.days.filter(d=>d.strength).length,longest:Math.max(...runningDays.map(d=>d.km)),minutes:Math.round(sessions.reduce((n,s)=>n+s.seconds+s.extraSeconds,0)/60),easyPct:scheduled?Math.round((scheduled-faster)/scheduled*100):0};
  }
  function weekProgress(date=chicagoDate(),marks={},options={}){
    const number=validDate(date)?currentWeek(date):null;if(!number)return null;
    const w=plan[number-1],total=stats(w,options);
    // A done mark is not measured mileage or proof that optional preparation was performed.
    const marked=w.days.filter(d=>d.km>0&&marks[d.id]===true&&d.date<=date);
    const markedMain=round(marked.reduce((n,d)=>n+d.km,0));
    return {week:number,from:w.from,to:w.to,plannedMain:total.scheduled,plannedAllIn:total.allIn,extra:total.extra,markedMain,markedRuns:marked.length,runs:total.runs,percent:total.scheduled?Math.min(100,Math.round(100*markedMain/total.scheduled)):0};
  }
  function chicagoDate(now=new Date()) {
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
    return `${p.year}-${p.month}-${p.day}`;
  }
  function currentWeek(date=chicagoDate()){
    if(date<plan[0].from||date>races.primary.date)return null;
    return Math.floor((Date.parse(date+'T00:00:00Z')-START)/DAY/7)+1;
  }
  function workoutOn(date=chicagoDate()){const number=validDate(date)?currentWeek(date):null;return number?plan[number-1].days.find(d=>d.date===date)||null:null;}
  const predict=(seconds,fromKm,toKm=races.primary.km)=>seconds*Math.pow(toKm/fromKm,1.06);
  function parseDuration(text){if(typeof text!=='string'||!/^([0-9]{1,3}:)?[0-9]{1,2}:[0-5][0-9]$/.test(text))return null;const parts=text.split(':').map(Number);if(parts.length===3&&parts[1]>=60)return null;return parts.length===3?parts[0]*3600+parts[1]*60+parts[2]:parts[0]*60+parts[1];}
  function validDate(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T00:00Z'))&&new Date(value+'T00:00Z').toISOString().slice(0,10)===value;}
  function validResult(r){
    if(!r||typeof r!=='object'||typeof r.id!=='string'||!/^[a-zA-Z0-9-]{1,60}$/.test(r.id)||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||!validDate(r.date)||!Number.isFinite(r.km)||r.km<1||r.km>100||!Number.isFinite(r.seconds)||r.seconds/r.km<120||r.seconds/r.km>1200||r.verified!==true||!['nominal','measured'].includes(r.distanceBasis))return false;
    if(r.pace!=null&&r.pace!==''&&!/^\d{1,2}:[0-5]\d$/.test(r.pace))return false;
    if(r.bestPace!=null&&r.bestPace!==''&&!/^\d{1,2}:[0-5]\d$/.test(r.bestPace))return false;
    for(const [key,min,max]of [['avgHR',30,240],['maxHR',30,240],['cadence',60,260],['power',1,1000],['contact',100,600]])if(r[key]!=null&&(!Number.isFinite(r[key])||r[key]<min||r[key]>max))return false;
    return !(r.avgHR&&r.maxHR&&r.avgHR>r.maxHR);
  }
  function validRace(r){return !!(r&&typeof r.id==='string'&&/^[a-zA-Z0-9-]{1,60}$/.test(r.id)&&typeof r.name==='string'&&r.name.trim()&&r.name.length<=100&&validDate(r.date)&&Number.isFinite(r.km)&&r.km>=1&&r.km<=100&&['primary','secondary'].includes(r.role)&&(r.cutoffSeconds==null||(Number.isFinite(r.cutoffSeconds)&&r.cutoffSeconds>=r.km*120&&r.cutoffSeconds<=r.km*1200)));}
  const personalBest=(history,km)=>history.filter(r=>validResult(r)&&Math.abs(r.km-km)<.00001).reduce((best,r)=>!best||r.seconds<best.seconds?r:best,null);
  function performance(history=athlete.history){
    const pbs=[5,10].map(km=>personalBest(history,km)).filter(Boolean);
    const estimates=pbs.map(r=>({race:r,seconds:predict(r.seconds,r.km),pace:predict(r.seconds,r.km)/races.primary.km,gap:predict(r.seconds,r.km)-7200,paceGap:(predict(r.seconds,r.km)-7200)/races.primary.km}));
    return {pbs,estimates,low:estimates.length?Math.min(...estimates.map(e=>e.seconds)):null,high:estimates.length?Math.max(...estimates.map(e=>e.seconds)):null};
  }
  const countdown=(race,date=chicagoDate())=>Math.round((Date.parse(race.date+'T00:00Z')-Date.parse(date+'T00:00Z'))/DAY);
  // Presentation projections only. Existing day objects and training calculations stay untouched.
  const categories=[
    {id:'easy',name:'Easy Run',icon:'easyRun',subtypes:['Easy Run','Recovery Run']},
    {id:'longRun',name:'Long Run',icon:'longRun',subtypes:['Long Run','Progressive Long Run']},
    {id:'speed',name:'Speed',icon:'workouts',subtypes:['Steady','Fartlek','Tempo','Intervals','Race Practice']},
    {id:'strength',name:'Strength',icon:'strength',subtypes:Object.values(strength).map(s=>s.name)},
    {id:'rest',name:'Rest',icon:'moon',subtypes:['Full Rest','Active Recovery']},
    {id:'race',name:'Race',icon:'flag',subtypes:['Half marathon','8K tune-up','5 mile tune-up','Race']}
  ];
  function workoutKinds(d){
    const mapping={easy:['easy','Easy Run'],recovery:['easy','Recovery Run'],longRun:['longRun','Long Run'],progressiveLongRun:['longRun','Progressive Long Run'],steady:['speed','Steady'],fartlek:['speed','Fartlek'],tempo:['speed','Tempo'],interval:['speed','Intervals'],goal:['speed','Race Practice'],strength:['strength',strength[d.strength]?.name||'Strength'],rest:['rest',d.activeRecovery||d.title==='Mobility & easy walking'?'Active Recovery':'Full Rest'],activeRecovery:['rest','Active Recovery'],race:['race',raceCalendar.find(r=>r.id===d.raceId)?.discipline||'Race']};
    const pair=mapping[d.type];if(!pair)throw Error('Unrecognized workout type: '+d.type);
    const result=[{category:pair[0],subtype:d.progressive&&pair[0]==='longRun'?'Progressive Long Run':pair[1]}];
    if(pair[0]==='longRun'&&d.work)result.push({category:'speed',subtype:d.work.kind==='goal'?'Race Practice':({tempo:'Tempo',interval:'Intervals',steady:'Steady'})[d.work.kind]||'Intervals'});
    if(d.strength&&pair[0]!=='strength')result.push({category:'strength',subtype:strength[d.strength]?.name||'Strength'});
    return result;
  }
  const categoryDays=w=>Object.fromEntries(categories.map(c=>[c.id,w.days.filter(d=>workoutKinds(d).some(k=>k.category===c.id)).length]));
  const validMonth=month=>typeof month==='string'&&/^(?!0000)\d{4}-(?:0[1-9]|1[0-2])$/.test(month);
  function shiftMonth(month,delta){
    if(!validMonth(month)||!Number.isInteger(delta))return null;
    const first=new Date(month+'-01T12:00Z');first.setUTCMonth(first.getUTCMonth()+delta);
    if(!Number.isFinite(first.getTime()))return null;const result=first.toISOString().slice(0,7);return validMonth(result)?result:null;
  }
  function monthGrid(month){
    if(!validMonth(month))return [];
    const first=new Date(month+'-01T12:00Z'),end=new Date(first);end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(0);
    const offset=(first.getUTCDay()+6)%7,cells=Array(offset).fill(null);
    for(let number=1;number<=end.getUTCDate();number++){
      const iso=month+'-'+String(number).padStart(2,'0'),day=workoutOn(iso);
      cells.push({date:iso,number,day,categories:day?[...new Set(workoutKinds(day).map(k=>k.category))]:[]});
    }
    while(cells.length%7)cells.push(null);
    return cells;
  }
  function zoneEffortGuides(options={}){
    const guideDate=options.date||dateAt(((options.week||currentWeek(options.asOf||chicagoDate())||1)-1)*7+6);
    return [
      {name:'Recovery',target:'recovery',effort:'RPE 1–2 · very gentle',purpose:'Recovery jogs; walking or rest if jogging is not restorative.',suffix:'or slower'},
      {name:'Aerobic base',target:'easy',effort:'RPE 2–3 · full sentences',purpose:'Easy runs and most long running; build repeatable aerobic volume.',suffix:'or slower'},
      {name:'Controlled steady',target:'steady',effort:'RPE 4–5 · controlled conversation',purpose:'Modest steady blocks; purposeful without racing.',suffix:''},
      {name:'Controlled tempo',target:'tempo',effort:'RPE 6 · short phrases',purpose:'Controlled tempo blocks with easy recovery between.',suffix:''},
      {name:'Brief faster work',target:'interval',effort:'RPE 7 · repeatable short reps',purpose:'Short-rep pace example only. HR lags; do not accelerate to enter Z5.',suffix:''}
    ].map((guide,i)=>({...guide,zone:i+1,pace:targetFor({date:guideDate,id:guideDate,type:guide.target,target:guide.target},options).pace}));
  }

  const workoutLabels=d=>[...new Set(workoutKinds(d).map(k=>k.category))].map(key=>({key,text:categories.find(c=>c.id===key).name}));
  const api={paceScenario,targetFor,sessionSegments,weekProgress,categories,workoutKinds,categoryDays,validMonth,shiftMonth,monthGrid,zoneEffortGuides,workoutOn,parseDuration,validDate,validRace,validResult,personalBest,performance,countdown,workoutLabels,raceCalendar,athlete,races,sources,phases,targets,plan,strength,zones,stats,sessionStats,dateAt,chicagoDate,currentWeek,predict,round};
  root.APEX=api;
  if(typeof module!=='undefined') module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
