-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'active',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建登录尝试表
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    attempts INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建角色表
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建权限表
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建角色权限关联表
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 创建业务卡片表
CREATE TABLE IF NOT EXISTS business_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    website VARCHAR(255),
    avatar_url TEXT,
    qr_code_url TEXT,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建脚本模板表
CREATE TABLE IF NOT EXISTS script_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[], -- PostgreSQL数组类型
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建消息任务表
CREATE TABLE IF NOT EXISTS message_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) CHECK (type IN ('email', 'sms', 'push')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')) DEFAULT 'draft',
    recipients_count INTEGER DEFAULT 0,
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    template_id UUID REFERENCES script_templates(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建消息接收者表
CREATE TABLE IF NOT EXISTS message_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES message_tasks(id) ON DELETE CASCADE,
    recipient_type VARCHAR(20) NOT NULL,
    recipient_value VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'sent', 'delivered', 'failed')) DEFAULT 'pending',
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建电话任务表
CREATE TABLE IF NOT EXISTS phone_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    script TEXT NOT NULL,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')) DEFAULT 'pending',
    contact_count INTEGER DEFAULT 0,
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    template_id UUID REFERENCES script_templates(id) ON DELETE SET NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建电话联系人表
CREATE TABLE IF NOT EXISTS phone_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES phone_tasks(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'called', 'no-answer', 'completed', 'failed')) DEFAULT 'pending',
    notes TEXT,
    called_at TIMESTAMP,
    duration INTEGER, -- 通话时长（秒）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建语音配置表
CREATE TABLE IF NOT EXISTS voice_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    voice_type VARCHAR(50) NOT NULL,
    language VARCHAR(20) DEFAULT 'zh-CN',
    pitch DECIMAL(3,2) DEFAULT 1.0,
    rate DECIMAL(3,2) DEFAULT 1.0,
    volume DECIMAL(3,2) DEFAULT 1.0,
    is_default BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建菜单项表
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    path VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    permission_code VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_business_cards_user_id ON business_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_message_tasks_status ON message_tasks(status);
CREATE INDEX IF NOT EXISTS idx_message_tasks_created_by ON message_tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_phone_tasks_assignee_id ON phone_tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_phone_tasks_status ON phone_tasks(status);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON menu_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items(sort_order);

-- 插入默认数据
INSERT INTO users (name, email, password_hash, role, status) VALUES
('系统管理员', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa', 'admin', 'active'),
('普通用户', 'user@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa', 'user', 'active')
ON CONFLICT (email) DO NOTHING;

-- 插入默认角色
INSERT INTO roles (name, description) VALUES
('admin', '系统管理员'),
('manager', '部门经理'),
('user', '普通用户'),
('guest', '访客')
ON CONFLICT (name) DO NOTHING;

-- 插入默认权限
INSERT INTO permissions (name, code, description) VALUES
('用户管理', 'user.manage', '管理系统用户'),
('角色管理', 'role.manage', '管理用户角色'),
('业务卡片管理', 'business_card.manage', '管理业务卡片'),
('消息任务管理', 'message_task.manage', '管理消息任务'),
('电话任务管理', 'phone_task.manage', '管理电话任务'),
('系统设置', 'system.config', '系统配置管理')
ON CONFLICT (code) DO NOTHING;

-- 插入默认菜单项
INSERT INTO menu_items (title, icon, path, sort_order, permission_code) VALUES
('仪表盘', 'LayoutDashboard', '/', 1, NULL),
('用户管理', 'Users', NULL, 2, 'user.manage'),
('业务管理', 'CreditCard', NULL, 3, NULL),
('消息管理', 'MessageSquare', NULL, 4, NULL),
('系统设置', 'Settings', NULL, 5, 'system.config')
ON CONFLICT DO NOTHING;
