-- ====== 专升本备考网站 数据库初始化 ======
-- 在 Supabase SQL Editor 中运行此脚本

-- 1. 打卡记录表
CREATE TABLE IF NOT EXISTS checkins (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default_user',
  checkin_date DATE NOT NULL,
  subjects JSONB NOT NULL DEFAULT '{}',
  notes TEXT DEFAULT '',
  hours NUMERIC(4,1) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, checkin_date)
);

-- 2. 知识点进度表
CREATE TABLE IF NOT EXISTS knowledge_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default_user',
  subject TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject, chapter_id)
);

-- 3. 学习日志表（可选，用于详细统计）
CREATE TABLE IF NOT EXISTS study_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default_user',
  log_date DATE NOT NULL,
  subject TEXT NOT NULL,
  duration_minutes INT DEFAULT 0,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 创建索引加速查询
CREATE INDEX IF NOT EXISTS idx_checkins_user_date ON checkins(user_id, checkin_date DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_user ON knowledge_progress(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_study_logs_user_date ON study_logs(user_id, log_date DESC);

-- 5. 关闭 RLS（个人使用，单用户场景）
-- 如需多用户支持，应启用 RLS 并配置策略
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_logs ENABLE ROW LEVEL SECURITY;

-- 允许匿名访问（使用 anon key 时需要）
CREATE POLICY "Allow all on checkins" ON checkins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on knowledge_progress" ON knowledge_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on study_logs" ON study_logs FOR ALL USING (true) WITH CHECK (true);

-- 完成！
SELECT 'Database setup complete!' as status;
