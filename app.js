// ====== 数据配置 ======
const EXAM_DATE = new Date('2027-03-27T09:00:00+08:00');
const START_DATE = new Date('2026-06-15');
const STORAGE_KEY = 'zhuansheng_data';

// Supabase 连接状态
let isOnline = false;

// 科目配置
const SUBJECTS = {
  math: { name: '高等数学', icon: '📐', color: '#6366f1', target: 85, total: 100, tagClass: 'tag-math' },
  english: { name: '英语', icon: '🔤', color: '#f59e0b', target: 85, total: 100, tagClass: 'tag-english' },
  politics: { name: '政治理论', icon: '📕', color: '#ef4444', target: 80, total: 100, tagClass: 'tag-politics' },
  ds: { name: '数据结构', icon: '💻', color: '#10b981', target: 170, total: 200, tagClass: 'tag-ds' }
};

// 阶段配置
const PHASES = [
  { id: 1, name: '基础阶段', start: '2026-06-15', end: '2026-09-15', desc: '夯实基础，建立知识体系' },
  { id: 2, name: '强化阶段', start: '2026-09-16', end: '2026-12-31', desc: '专题突破，大量刷题' },
  { id: 3, name: '冲刺阶段', start: '2027-01-01', end: '2027-03-27', desc: '真题模拟，查漏补缺' }
];

// 各阶段每日计划
const DAILY_PLANS = {
  1: [
    { subject: 'math', time: '08:00-10:30', duration: '2.5h', tasks: '教材精读+例题理解+课后习题' },
    { subject: 'english', time: '10:40-12:40', duration: '2h', tasks: '背单词(100个)+语法学习+课文精读' },
    { subject: 'ds', time: '14:00-17:00', duration: '3h', tasks: '教材学习+视频课程+手写代码笔记' },
    { subject: 'politics', time: '18:30-20:00', duration: '1.5h', tasks: '通读教材+整理知识框架+做笔记' },
    { subject: 'math', time: '20:15-21:15', duration: '1h', tasks: '复习当天数学内容+错题整理' },
    { subject: 'english', time: '21:15-21:45', duration: '0.5h', tasks: '复习今日单词+听力练习' }
  ],
  2: [
    { subject: 'math', time: '08:00-10:30', duration: '2.5h', tasks: '专题训练(极限/导数/积分等)+真题分类' },
    { subject: 'english', time: '10:40-12:40', duration: '2h', tasks: '阅读理解专项+完型填空+翻译练习' },
    { subject: 'ds', time: '14:00-17:00', duration: '3h', tasks: '算法题专项+代码手写+真题练习' },
    { subject: 'politics', time: '18:30-20:00', duration: '1.5h', tasks: '重点章节精读+选择题刷题+错题归纳' },
    { subject: 'math', time: '20:15-21:15', duration: '1h', tasks: '薄弱题型专练+公式默写' },
    { subject: 'english', time: '21:15-21:45', duration: '0.5h', tasks: '作文模板背诵+单词复习' }
  ],
  3: [
    { subject: 'math', time: '08:00-10:30', duration: '2.5h', tasks: '真题套卷/模拟卷限时训练+批改分析' },
    { subject: 'english', time: '10:40-12:40', duration: '2h', tasks: '真题精做+作文默写+高频词复习' },
    { subject: 'ds', time: '14:00-17:00', duration: '3h', tasks: '真题模拟+代码默写+易错点回顾' },
    { subject: 'politics', time: '18:30-20:00', duration: '1.5h', tasks: '时政热点+大题背诵+模拟卷' },
    { subject: 'math', time: '20:15-21:15', duration: '1h', tasks: '错题重做+公式定理默写' },
    { subject: 'english', time: '21:15-21:45', duration: '0.5h', tasks: '作文押题+听力真题' }
  ]
};

// 各科知识点
const KNOWLEDGE_POINTS = {
  math: {
    name: '高等数学',
    chapters: [
      { id: 'm1', name: '函数与极限', weight: 15 },
      { id: 'm2', name: '导数与微分', weight: 15 },
      { id: 'm3', name: '中值定理与导数应用', weight: 12 },
      { id: 'm4', name: '不定积分', weight: 15 },
      { id: 'm5', name: '定积分及应用', weight: 15 },
      { id: 'm6', name: '微分方程', weight: 10 },
      { id: 'm7', name: '多元函数微积分', weight: 12 },
      { id: 'm8', name: '无穷级数', weight: 6 }
    ]
  },
  english: {
    name: '英语',
    chapters: [
      { id: 'e1', name: '核心词汇3500', weight: 20 },
      { id: 'e2', name: '语法基础', weight: 15 },
      { id: 'e3', name: '阅读理解', weight: 25 },
      { id: 'e4', name: '完型填空', weight: 10 },
      { id: 'e5', name: '翻译', weight: 10 },
      { id: 'e6', name: '写作', weight: 20 }
    ]
  },
  politics: {
    name: '政治理论',
    chapters: [
      { id: 'p1', name: '毛泽东思想', weight: 20 },
      { id: 'p2', name: '邓小平理论', weight: 15 },
      { id: 'p3', name: '三个代表', weight: 10 },
      { id: 'p4', name: '科学发展观', weight: 10 },
      { id: 'p5', name: '习近平新时代', weight: 25 },
      { id: 'p6', name: '时政热点', weight: 20 }
    ]
  },
  ds: {
    name: '数据结构',
    chapters: [
      { id: 'd1', name: '绪论与算法分析', weight: 8 },
      { id: 'd2', name: '线性表', weight: 15 },
      { id: 'd3', name: '栈和队列', weight: 12 },
      { id: 'd4', name: '串、数组和广义表', weight: 8 },
      { id: 'd5', name: '树与二叉树', weight: 18 },
      { id: 'd6', name: '图', weight: 15 },
      { id: 'd7', name: '查找', weight: 12 },
      { id: 'd8', name: '排序', weight: 12 }
    ]
  }
};

// ====== Supabase 配置管理 ======
function getSupabaseConfig() {
  return {
    url: localStorage.getItem('sb_url') || DEFAULT_SUPABASE_URL || '',
    key: localStorage.getItem('sb_key') || DEFAULT_SUPABASE_KEY || ''
  };
}

function saveSupabaseConfig(url, key) {
  localStorage.setItem('sb_url', url);
  localStorage.setItem('sb_key', key);
}

// ====== Supabase REST API 工具函数 ======
let API = '';
let HEADERS = {};

function updateApiConfig() {
  const cfg = getSupabaseConfig();
  API = cfg.url + '/rest/v1';
  HEADERS = {
    'apikey': cfg.key,
    'Authorization': 'Bearer ' + cfg.key,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
}

async function apiGet(table, query) {
  const url = API + '/' + table + (query ? '?' + query : '');
  const resp = await fetch(url, { headers: HEADERS });
  if (!resp.ok) throw new Error(`GET ${table}: ${resp.status} ${resp.statusText}`);
  return resp.json();
}

async function apiUpsert(table, data) {
  const resp = await fetch(API + '/' + table, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(data)
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`UPSERT ${table}: ${resp.status} ${errText}`);
  }
  return true;
}

// ====== Supabase 初始化 ======
async function initSupabase() {
  const statusEl = document.getElementById('syncStatus');
  const dotEl = statusEl.querySelector('.sync-dot');
  const textEl = statusEl.querySelector('.sync-text');

  const cfg = getSupabaseConfig();
  if (!cfg.url || !cfg.key) {
    dotEl.className = 'sync-dot warn';
    textEl.textContent = '未配置云端';
    statusEl.classList.add('show');
    isOnline = false;
    console.log('ℹ️ Supabase 未配置，使用本地存储。点击 ⚙️ 配置云端同步。');
    return;
  }

  try {
    updateApiConfig();

    // 测试连接
    await apiGet('checkins', 'select=id&limit=1');

    isOnline = true;
    dotEl.className = 'sync-dot online';
    textEl.textContent = '☁️ 已连接';
    statusEl.classList.add('show');
    setTimeout(() => statusEl.classList.remove('show'), 3000);

    // 连接成功后，同步本地数据到云端
    await syncLocalToCloud();
    // 再从云端拉取最新
    await syncCloudToLocal();

    console.log('✅ Supabase 连接成功');
  } catch (e) {
    isOnline = false;
    dotEl.className = 'sync-dot offline';
    textEl.textContent = '连接失败';
    statusEl.classList.add('show');
    setTimeout(() => statusEl.classList.remove('show'), 3000);
    console.warn('⚠️ Supabase 连接失败:', e.message);
  }
}

// ====== 本地数据 → 云端同步 ======
async function syncLocalToCloud() {
  if (!isOnline) return;

  const localData = loadLocalData();
  if (!localData.checkins || Object.keys(localData.checkins).length === 0) return;

  try {
    // 同步打卡记录
    for (const [dateKey, checkin] of Object.entries(localData.checkins)) {
      try {
        await apiUpsert('checkins', {
          user_id: USER_ID,
          checkin_date: dateKey,
          subjects: checkin.subjects,
          notes: checkin.notes || '',
          hours: checkin.hours || 0
        });
      } catch (e) {
        console.warn('同步打卡记录失败:', dateKey, e.message);
      }
    }

    // 同步知识点进度
    if (localData.knowledge) {
      for (const [subject, chapters] of Object.entries(localData.knowledge)) {
        for (const [chapterId, completed] of Object.entries(chapters)) {
          try {
            await apiUpsert('knowledge_progress', {
              user_id: USER_ID,
              subject: subject,
              chapter_id: chapterId,
              completed: completed
            });
          } catch (e) {
            console.warn('同步知识点失败:', subject, chapterId, e.message);
          }
        }
      }
    }

    console.log('✅ 本地数据已同步到云端');
  } catch (e) {
    console.warn('同步失败:', e.message);
  }
}

// ====== 云端数据 → 本地同步 ======
async function syncCloudToLocal() {
  if (!isOnline) return;

  try {
    // 拉取打卡记录
    const checkins = await apiGet('checkins', 'user_id=eq.' + USER_ID + '&select=*');
    if (checkins && checkins.length > 0) {
      const localData = loadLocalData();
      if (!localData.checkins) localData.checkins = {};

      checkins.forEach(c => {
        const key = c.checkin_date;
        if (!localData.checkins[key] || new Date(c.created_at) > new Date(localData.checkins[key].timestamp || 0)) {
          localData.checkins[key] = {
            subjects: c.subjects,
            notes: c.notes,
            hours: parseFloat(c.hours),
            timestamp: new Date(c.created_at).getTime()
          };
        }
      });

      saveLocalData(localData);
    }

    // 拉取知识点进度
    const knowledge = await apiGet('knowledge_progress', 'user_id=eq.' + USER_ID + '&select=*');
    if (knowledge && knowledge.length > 0) {
      const localData = loadLocalData();
      if (!localData.knowledge) localData.knowledge = {};

      knowledge.forEach(k => {
        if (!localData.knowledge[k.subject]) localData.knowledge[k.subject] = {};
        localData.knowledge[k.subject][k.chapter_id] = k.completed;
      });

      saveLocalData(localData);
    }

    console.log('✅ 云端数据已同步到本地');
  } catch (e) {
    console.warn('拉取云端数据失败:', e.message);
  }
}

// ====== 数据管理（本地存储） ======
function loadLocalData() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (d) return JSON.parse(d);
  } catch(e) {}
  return { checkins: {}, knowledge: {} };
}

function saveLocalData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDateKey(date) {
  const d = date || new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// ====== 读取数据（优先云端） ======
async function loadAllData() {
  // 先从云端拉取最新
  if (isOnline) {
    await syncCloudToLocal();
  }
  return loadLocalData();
}

// ====== 保存打卡记录 ======
async function saveCheckin(dateKey, checkinData) {
  // 保存到本地
  const localData = loadLocalData();
  localData.checkins[dateKey] = checkinData;
  saveLocalData(localData);

  // 保存到云端
  if (isOnline) {
    try {
      await apiUpsert('checkins', {
        user_id: USER_ID,
        checkin_date: dateKey,
        subjects: checkinData.subjects,
        notes: checkinData.notes || '',
        hours: checkinData.hours || 0
      });
      showSyncStatus('online', '☁️ 已同步');
    } catch (e) {
      console.warn('云端保存打卡失败:', e.message);
      showSyncStatus('warn', '同步失败，已保存本地');
    }
  }
}

// ====== 保存知识点进度 ======
async function saveKnowledge(subject, chapterId, completed) {
  // 保存到本地
  const localData = loadLocalData();
  if (!localData.knowledge) localData.knowledge = {};
  if (!localData.knowledge[subject]) localData.knowledge[subject] = {};
  localData.knowledge[subject][chapterId] = completed;
  saveLocalData(localData);

  // 保存到云端
  if (isOnline) {
    try {
      await apiUpsert('knowledge_progress', {
        user_id: USER_ID,
        subject: subject,
        chapter_id: chapterId,
        completed: completed
      });
    } catch (e) {
      console.warn('云端保存知识点失败:', e.message);
    }
  }
}

// ====== 显示同步状态 ======
function showSyncStatus(type, text) {
  const statusEl = document.getElementById('syncStatus');
  const dotEl = statusEl.querySelector('.sync-dot');
  const textEl = statusEl.querySelector('.sync-text');
  dotEl.className = 'sync-dot ' + type;
  textEl.textContent = text;
  statusEl.classList.add('show');
  setTimeout(() => statusEl.classList.remove('show'), 2500);
}

// ====== 倒计时 ======
function updateCountdown() {
  const now = new Date();
  const diff = EXAM_DATE - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '0';
    document.getElementById('cd-hours').textContent = '0';
    document.getElementById('cd-mins').textContent = '0';
    document.getElementById('cd-secs').textContent = '0';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = d;
  document.getElementById('cd-hours').textContent = h;
  document.getElementById('cd-mins').textContent = m;
  document.getElementById('cd-secs').textContent = s;
}

// ====== 当前阶段判断 ======
function getCurrentPhase() {
  const now = new Date();
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (now >= new Date(PHASES[i].start)) return PHASES[i].id;
  }
  return 1;
}

// ====== 导航 ======
function initNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + page).classList.add('active');
      if (page === 'checkin') { renderCalendar(); renderCheckinForm(); }
      if (page === 'progress') renderProgress();
      if (page === 'stats') renderStats();
    });
  });
}

// ====== 主题切换 ======
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('zhuansheng_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      localStorage.setItem('zhuansheng_theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
      localStorage.setItem('zhuansheng_theme', 'dark');
    }
  });
}

// ====== 首页：今日任务 ======
function renderTodayTasks() {
  const phase = getCurrentPhase();
  const tasks = DAILY_PLANS[phase];
  const container = document.getElementById('todayTasks');
  const today = new Date();
  const weekDays = ['日','一','二','三','四','五','六'];
  document.getElementById('todayDate').textContent =
    `${today.getMonth()+1}月${today.getDate()}日 周${weekDays[today.getDay()]}`;

  container.innerHTML = tasks.map(t => {
    const s = SUBJECTS[t.subject];
    return `
      <div class="task-item">
        <div class="task-icon">${s.icon}</div>
        <div class="task-info">
          <h4>${s.name}</h4>
          <p>${t.tasks}</p>
        </div>
        <div class="task-time">${t.time}</div>
      </div>
    `;
  }).join('');

  // 今日打卡状态
  const data = loadLocalData();
  const key = getDateKey();
  const statusEl = document.getElementById('todayCheckinStatus');
  if (data.checkins[key]) {
    const c = data.checkins[key];
    const doneCount = Object.values(c.subjects).filter(Boolean).length;
    statusEl.innerHTML = `✅ 今日已打卡 · 完成${doneCount}/4科 · 学习${c.hours}小时`;
    statusEl.style.background = 'var(--success-bg)';
    statusEl.style.color = 'var(--success)';
  } else {
    statusEl.innerHTML = '💪 今日还未打卡，加油！';
    statusEl.style.background = 'var(--warning-bg)';
    statusEl.style.color = 'var(--warning)';
  }
}

// ====== 时间线高亮 ======
function updateTimeline() {
  const phase = getCurrentPhase();
  document.querySelectorAll('.timeline-item').forEach(item => {
    const p = parseInt(item.dataset.phase);
    item.classList.toggle('active-phase', p <= phase);
  });
}

// ====== 学习计划页 ======
function renderPlan(phaseId) {
  const tasks = DAILY_PLANS[phaseId];
  const phase = PHASES[phaseId - 1];
  const container = document.getElementById('planContent');

  const totalTime = tasks.reduce((sum, t) => {
    const h = parseFloat(t.duration);
    return sum + h;
  }, 0);

  container.innerHTML = `
    <div class="plan-day-card">
      <div class="plan-day-header">
        <h3>${phase.name} · 每日计划</h3>
        <span class="day-time-badge">总计 ${totalTime}小时/天</span>
      </div>
      <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:1rem;">${phase.desc} · ${phase.start} 至 ${phase.end}</p>
      <div class="plan-tasks">
        ${tasks.map(t => {
          const s = SUBJECTS[t.subject];
          return `
            <div class="plan-task">
              <span class="subject-tag ${s.tagClass}">${s.name}</span>
              <span class="task-detail">${t.tasks}</span>
              <span class="task-dur">${t.duration}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    <div class="plan-day-card">
      <div class="plan-day-header">
        <h3>📌 每周安排</h3>
      </div>
      <div class="plan-tasks">
        <div class="plan-task"><span class="task-detail">周一至周六：按以上计划执行</span></div>
        <div class="plan-task"><span class="task-detail">周日上午：复习本周错题+薄弱知识点</span></div>
        <div class="plan-task"><span class="task-detail">周日下午：整理笔记+制定下周小目标</span></div>
        <div class="plan-task"><span class="task-detail">每月最后一天：月度复盘+调整计划</span></div>
      </div>
    </div>
    ${phaseId === 1 ? `
    <div class="plan-day-card">
      <div class="plan-day-header"><h3>📚 推荐教材与资源</h3></div>
      <div class="plan-tasks">
        <div class="plan-task"><span class="subject-tag tag-math">高数</span><span class="task-detail">同济版《高等数学》上下册 + 课后习题全解</span></div>
        <div class="plan-task"><span class="subject-tag tag-english">英语</span><span class="task-detail">专升本英语词汇手册 + 历年真题</span></div>
        <div class="plan-task"><span class="subject-tag tag-politics">政治</span><span class="task-detail">《毛泽东思想和中国特色社会主义理论体系概论》</span></div>
        <div class="plan-task"><span class="subject-tag tag-ds">数据结构</span><span class="task-detail">严蔚敏版《数据结构》C语言版 + 配套习题</span></div>
      </div>
    </div>
    ` : ''}
  `;
}

// ====== 打卡页 ======
let checkinState = { math: false, english: false, politics: false, ds: false };

function renderCheckinForm() {
  const today = new Date();
  document.getElementById('checkinTodayDate').textContent =
    `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;

  const data = loadLocalData();
  const key = getDateKey();
  if (data.checkins[key]) {
    checkinState = { ...data.checkins[key].subjects };
    document.getElementById('checkinNotes').value = data.checkins[key].notes || '';
    document.getElementById('studyHours').value = data.checkins[key].hours || 8;
  } else {
    checkinState = { math: false, english: false, politics: false, ds: false };
    document.getElementById('checkinNotes').value = '';
    document.getElementById('studyHours').value = 8;
  }

  const container = document.getElementById('checkinSubjects');
  container.innerHTML = Object.entries(SUBJECTS).map(([key, s]) => `
    <div class="checkin-subject ${checkinState[key] ? 'checked' : ''}" data-subject="${key}">
      <div class="cs-icon">${s.icon}</div>
      <div class="cs-info">
        <h4>${s.name}</h4>
        <p>目标 ${s.target}/${s.total}分</p>
      </div>
      <div class="cs-check">${checkinState[key] ? '✓' : ''}</div>
    </div>
  `).join('');

  container.querySelectorAll('.checkin-subject').forEach(el => {
    el.addEventListener('click', () => {
      const subj = el.dataset.subject;
      checkinState[subj] = !checkinState[subj];
      el.classList.toggle('checked', checkinState[subj]);
      el.querySelector('.cs-check').textContent = checkinState[subj] ? '✓' : '';
    });
  });
}

async function doCheckin() {
  const key = getDateKey();
  const notes = document.getElementById('checkinNotes').value.trim();
  const hours = parseFloat(document.getElementById('studyHours').value) || 0;
  const doneCount = Object.values(checkinState).filter(Boolean).length;

  const checkinData = {
    subjects: { ...checkinState },
    notes,
    hours,
    timestamp: Date.now()
  };

  // 保存到本地 + 云端
  await saveCheckin(key, checkinData);

  const resultEl = document.getElementById('checkinResult');
  if (doneCount === 4) {
    resultEl.innerHTML = '🎉 太棒了！今日全部完成！继续加油！';
    resultEl.style.color = 'var(--success)';
  } else if (doneCount > 0) {
    resultEl.innerHTML = `✅ 已完成 ${doneCount}/4 科，还差 ${4-doneCount} 科，再加把劲！`;
    resultEl.style.color = 'var(--warning)';
  } else {
    resultEl.innerHTML = '📝 已记录，记得完成学习任务哦！';
    resultEl.style.color = 'var(--text-secondary)';
  }

  renderCalendar();
  renderRecords();
  renderTodayTasks();
}

// ====== 日历 ======
let calYear, calMonth;

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  document.getElementById('prevMonth').addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });
}

function renderCalendar() {
  const data = loadLocalData();
  const title = document.getElementById('calendarTitle');
  title.textContent = `${calYear}年${calMonth + 1}月`;

  const container = document.getElementById('calendarDays');
  const firstDay = new Date(calYear, calMonth, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  const todayKey = getDateKey();

  let html = '';
  for (let i = 0; i < startDay; i++) html += '<div class="cal-day empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const checkin = data.checkins[key];
    const isToday = key === todayKey;
    const date = new Date(calYear, calMonth, d);
    const isPast = date <= today && date >= START_DATE;

    let cls = 'cal-day';
    if (isToday) cls += ' today';
    if (checkin) {
      const doneCount = Object.values(checkin.subjects).filter(Boolean).length;
      cls += doneCount === 4 ? ' full' : doneCount > 0 ? ' partial' : (isPast ? ' none' : '');
    } else if (isPast) {
      cls += ' none';
    }
    html += `<div class="${cls}">${d}</div>`;
  }
  container.innerHTML = html;
}

// ====== 学习记录 ======
function renderRecords() {
  const data = loadLocalData();
  const container = document.getElementById('recordsList');
  const keys = Object.keys(data.checkins).sort().reverse().slice(0, 20);

  if (keys.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:2rem;">暂无打卡记录，快去打卡吧！</p>';
    return;
  }

  container.innerHTML = keys.map(key => {
    const c = data.checkins[key];
    const subjectTags = Object.entries(c.subjects)
      .filter(([,v]) => v)
      .map(([k]) => `<span style="background:${SUBJECTS[k].color}">${SUBJECTS[k].name}</span>`)
      .join('');
    return `
      <div class="record-item">
        <span class="record-date">${key.slice(5)}</span>
        <div class="record-subjects">${subjectTags || '<span style="background:#999">未完成</span>'}</div>
        <span class="record-hours">${c.hours || 0}h</span>
      </div>
    `;
  }).join('');
}

// ====== 进度页 ======
function renderProgress() {
  const data = loadLocalData();
  const container = document.getElementById('progressSubjects');

  container.innerHTML = Object.entries(KNOWLEDGE_POINTS).map(([subjKey, subj]) => {
    const s = SUBJECTS[subjKey];
    const kData = data.knowledge[subjKey] || {};
    const doneCount = Object.values(kData).filter(Boolean).length;
    const total = subj.chapters.length;
    const pct = total > 0 ? Math.round(doneCount / total * 100) : 0;

    return `
      <div class="progress-card">
        <div class="progress-card-header">
          <div class="pc-icon">${s.icon}</div>
          <div class="pc-info">
            <h3>${s.name}</h3>
            <p>目标 ${s.target}/${s.total}分 · 掌握 ${doneCount}/${total} 章</p>
          </div>
          <div class="pc-score">${pct}%</div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${pct}%;background:${s.color}"></div>
        </div>
        <div class="knowledge-grid">
          ${subj.chapters.map(ch => `
            <div class="knowledge-item ${kData[ch.id] ? 'done' : ''}" data-subject="${subjKey}" data-id="${ch.id}">
              <div class="ki-check">${kData[ch.id] ? '✓' : ''}</div>
              <span>${ch.name} (${ch.weight}分)</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.knowledge-item').forEach(el => {
    el.addEventListener('click', async () => {
      const subj = el.dataset.subject;
      const id = el.dataset.id;
      const data = loadLocalData();
      if (!data.knowledge[subj]) data.knowledge[subj] = {};
      const newVal = !data.knowledge[subj][id];
      await saveKnowledge(subj, id, newVal);
      renderProgress();
    });
  });
}

// ====== 统计页 ======
function renderStats() {
  const data = loadLocalData();
  const keys = Object.keys(data.checkins);

  // 累计打卡天数
  document.getElementById('statTotalDays').textContent = keys.length;

  // 累计学习小时
  const totalHours = keys.reduce((sum, k) => sum + (data.checkins[k].hours || 0), 0);
  document.getElementById('statTotalHours').textContent = totalHours.toFixed(1);

  // 连续打卡
  const today = new Date();
  let streak = 0;
  let maxStreak = 0;
  let currentStreak = 0;
  const sortedKeys = keys.sort();

  let checkDate = new Date(today);
  while (true) {
    const key = getDateKey(checkDate);
    if (data.checkins[key]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  if (sortedKeys.length > 0) {
    currentStreak = 1;
    for (let i = 1; i < sortedKeys.length; i++) {
      const prev = new Date(sortedKeys[i-1]);
      const curr = new Date(sortedKeys[i]);
      const diff = (curr - prev) / 86400000;
      if (diff === 1) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    maxStreak = Math.max(maxStreak, currentStreak);
  }

  document.getElementById('statStreak').textContent = streak;
  document.getElementById('statMaxStreak').textContent = maxStreak;

  // 柱状图 - 各科时长
  const subjectHours = { math: 0, english: 0, politics: 0, ds: 0 };
  keys.forEach(k => {
    const c = data.checkins[k];
    const doneSubjects = Object.entries(c.subjects).filter(([,v]) => v).map(([s]) => s);
    const perSubject = doneSubjects.length > 0 ? (c.hours || 0) / doneSubjects.length : 0;
    doneSubjects.forEach(s => { subjectHours[s] += perSubject; });
  });

  const maxH = Math.max(...Object.values(subjectHours), 1);
  const barChart = document.getElementById('barChart');
  barChart.innerHTML = Object.entries(SUBJECTS).map(([k, s]) => {
    const h = subjectHours[k];
    const barH = Math.max(20, (h / maxH) * 160);
    return `
      <div class="bar-group">
        <div class="bar" style="height:${barH}px;background:${s.color}">
          <span class="bar-value">${h.toFixed(1)}h</span>
        </div>
        <span class="bar-label">${s.name}</span>
      </div>
    `;
  }).join('');

  // 周趋势
  const weeklyChart = document.getElementById('weeklyChart');
  const weeks = {};
  keys.forEach(k => {
    const d = new Date(k);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay() + 1);
    const wKey = getDateKey(weekStart);
    if (!weeks[wKey]) weeks[wKey] = 0;
    weeks[wKey] += data.checkins[k].hours || 0;
  });

  const weekKeys = Object.keys(weeks).sort().slice(-8);
  const maxWeek = Math.max(...weekKeys.map(k => weeks[k]), 1);
  weeklyChart.innerHTML = weekKeys.map(wk => {
    const h = weeks[wk];
    const pct = (h / maxWeek) * 100;
    return `
      <div class="week-row">
        <span class="week-label">${wk.slice(5)}</span>
        <div class="week-bar-bg">
          <div class="week-bar" style="width:${pct}%">${h.toFixed(1)}h</div>
        </div>
      </div>
    `;
  }).join('') || '<p style="color:var(--text-secondary);text-align:center;">暂无数据</p>';

  // 完成率
  const completionChart = document.getElementById('completionChart');
  const completionData = Object.entries(KNOWLEDGE_POINTS).map(([subjKey, subj]) => {
    const s = SUBJECTS[subjKey];
    const kData = data.knowledge[subjKey] || {};
    const done = Object.values(kData).filter(Boolean).length;
    const total = subj.chapters.length;
    const pct = total > 0 ? Math.round(done / total * 100) : 0;
    return { key: subjKey, name: s.name, icon: s.icon, color: s.color, pct, done, total };
  });

  completionChart.innerHTML = completionData.map(c => `
    <div class="completion-item">
      <div class="completion-circle" style="background:${c.color}">${c.pct}%</div>
      <div class="completion-info">
        <h4>${c.icon} ${c.name}</h4>
        <p>已掌握 ${c.done}/${c.total} 章 · 目标 ${SUBJECTS[c.key].target}分</p>
      </div>
    </div>
  `).join('');

  // 学习建议
  const adviceCard = document.getElementById('adviceCard');
  const advices = generateAdvices(data, subjectHours, streak, keys.length);
  adviceCard.innerHTML = advices.map(a => `<p>${a}</p>`).join('<br>');
}

function generateAdvices(data, subjectHours, streak, totalDays) {
  const advices = [];
  const phase = getCurrentPhase();
  const daysLeft = Math.ceil((EXAM_DATE - new Date()) / 86400000);

  if (streak >= 7) {
    advices.push(`🔥 <strong>连续打卡${streak}天</strong>，非常好！坚持就是胜利！`);
  } else if (streak >= 3) {
    advices.push(`💪 连续打卡${streak}天，继续保持！目标连续7天！`);
  } else if (totalDays > 0) {
    advices.push(`⚠️ 连续打卡中断，建议每天固定时间学习，养成习惯！`);
  }

  const subjEntries = Object.entries(subjectHours);
  const minSubj = subjEntries.reduce((a, b) => a[1] < b[1] ? a : b);
  if (minSubj[1] > 0) {
    advices.push(`📉 <strong>${SUBJECTS[minSubj[0]].name}</strong>学习时间最少（${minSubj[1].toFixed(1)}h），建议适当增加时间。`);
  }

  if (phase === 1) {
    advices.push(`🌱 当前是<strong>基础阶段</strong>，重点是理解概念，不急于刷题。打好基础最重要！`);
    advices.push(`📝 建议每天学习后花15分钟整理笔记，周末复习本周内容。`);
  } else if (phase === 2) {
    advices.push(`💪 当前是<strong>强化阶段</strong>，大量刷题+总结错题是关键！`);
    advices.push(`📊 建议建立错题本，每周回顾一次错题。`);
  } else {
    advices.push(`🚀 当前是<strong>冲刺阶段</strong>，真题模拟+查漏补缺！`);
    advices.push(`🎯 距离考试仅剩<strong>${daysLeft}天</strong>，每一分每一秒都很宝贵！`);
  }

  if (totalDays < 7) {
    advices.push(`📌 刚开始学习，最重要的是<strong>养成每天学习的习惯</strong>，哪怕只学2小时也要打卡！`);
  }

  return advices;
}

// ====== 初始化 ======
async function init() {
  initNav();
  initTheme();
  initCalendar();

  // 倒计时
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 初始化 Supabase（异步，不阻塞页面渲染）
  await initSupabase();

  // 首页
  renderTodayTasks();
  updateTimeline();

  // 学习计划
  renderPlan(1);
  document.querySelectorAll('.phase-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderPlan(parseInt(tab.dataset.phase));
    });
  });

  // 打卡
  renderCheckinForm();
  renderCalendar();
  renderRecords();
  document.getElementById('checkinBtn').addEventListener('click', doCheckin);

  // FAB
  document.getElementById('fabCheckin').addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="checkin"]').classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-checkin').classList.add('active');
    renderCalendar();
    renderCheckinForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 弹窗
  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('show');
  });
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').classList.remove('show');
    }
  });

  // 设置弹窗
  document.getElementById('settingsBtn').addEventListener('click', () => {
    const cfg = getSupabaseConfig();
    document.getElementById('settingUrl').value = cfg.url;
    document.getElementById('settingKey').value = cfg.key;
    document.getElementById('settingsModal').classList.add('show');
    document.getElementById('settingsResult').textContent = '';
  });
  document.getElementById('saveSettings').addEventListener('click', async () => {
    const url = document.getElementById('settingUrl').value.trim().replace(/\/+$/, '');
    const key = document.getElementById('settingKey').value.trim();
    const resultEl = document.getElementById('settingsResult');

    if (!url || !key) {
      resultEl.textContent = '❌ 请填写完整信息';
      resultEl.style.color = 'var(--danger)';
      return;
    }

    saveSupabaseConfig(url, key);
    resultEl.textContent = '⏳ 正在连接...';
    resultEl.style.color = 'var(--text-secondary)';

    await initSupabase();

    if (isOnline) {
      resultEl.textContent = '✅ 连接成功！数据已同步';
      resultEl.style.color = 'var(--success)';
      renderTodayTasks();
      renderCalendar();
      renderRecords();
      setTimeout(() => document.getElementById('settingsModal').classList.remove('show'), 1500);
    } else {
      resultEl.textContent = '❌ 连接失败，请检查 URL 和 Key';
      resultEl.style.color = 'var(--danger)';
    }
  });
  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target.id === 'settingsModal') {
      document.getElementById('settingsModal').classList.remove('show');
    }
  });

  // 网络状态监听
  window.addEventListener('online', async () => {
    showSyncStatus('online', '网络恢复，同步中...');
    await initSupabase();
    renderTodayTasks();
  });
  window.addEventListener('offline', () => {
    showSyncStatus('offline', '📡 已离线');
  });
}

document.addEventListener('DOMContentLoaded', init);
