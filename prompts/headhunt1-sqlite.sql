PRAGMA foreign_keys = ON;





-- =========================================================
-- AUTH DOMAIN
-- =========================================================

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,
    description TEXT,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    role_id INTEGER NOT NULL,

    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,

    name TEXT NOT NULL,
    email TEXT,

    is_active INTEGER NOT NULL DEFAULT 1,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (role_id)
        REFERENCES role(id)
);





-- =========================================================
-- RECRUITMENT DOMAIN
-- =========================================================

CREATE TABLE period (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    description TEXT,

    start_date TEXT,
    end_date TEXT,

    is_active INTEGER NOT NULL DEFAULT 1,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE position (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT UNIQUE,
    name TEXT NOT NULL,
    description TEXT,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE batch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    period_id INTEGER NOT NULL,
    position_id INTEGER NOT NULL,

    name TEXT NOT NULL,
    description TEXT,

    opened_at TEXT,
    closed_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (period_id)
        REFERENCES period(id),

    FOREIGN KEY (position_id)
        REFERENCES position(id)
);



CREATE TABLE candidate_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE candidate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    batch_id INTEGER NOT NULL,
    candidate_status_id INTEGER,
    recruiter_user_id INTEGER,

    code TEXT UNIQUE,

    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,

    birth_date TEXT,
    address TEXT,

    education TEXT,
    experience_year REAL,

    source TEXT,
    portfolio_url TEXT,

    current_workflow_id INTEGER,

    final_score REAL,
    final_result TEXT,
    final_note TEXT,

    applied_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (batch_id)
        REFERENCES batch(id),

    FOREIGN KEY (candidate_status_id)
        REFERENCES candidate_status(id),

    FOREIGN KEY (recruiter_user_id)
        REFERENCES user(id)
);





-- =========================================================
-- WORKFLOW DOMAIN
-- =========================================================

CREATE TABLE recruitment_stage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,

    description TEXT,

    color TEXT,
    icon TEXT,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE workflow (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    candidate_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    status TEXT,

    current_workflow_stage_id INTEGER,

    started_at TEXT,
    finished_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (candidate_id)
        REFERENCES candidate(id)
);



CREATE TABLE workflow_stage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    workflow_id INTEGER NOT NULL,
    recruitment_stage_id INTEGER,

    name TEXT NOT NULL,
    description TEXT,

    order_no INTEGER NOT NULL,

    status TEXT,

    is_required INTEGER NOT NULL DEFAULT 1,

    started_at TEXT,
    finished_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (workflow_id)
        REFERENCES workflow(id),

    FOREIGN KEY (recruitment_stage_id)
        REFERENCES recruitment_stage(id)
);



CREATE TABLE workflow_assignment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    workflow_stage_id INTEGER NOT NULL,

    assigned_by_user_id INTEGER,
    assigned_to_user_id INTEGER,

    role_type TEXT,
    status TEXT,

    assigned_at TEXT,
    accepted_at TEXT,
    completed_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (workflow_stage_id)
        REFERENCES workflow_stage(id),

    FOREIGN KEY (assigned_by_user_id)
        REFERENCES user(id),

    FOREIGN KEY (assigned_to_user_id)
        REFERENCES user(id)
);



CREATE TABLE workflow_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    workflow_id INTEGER NOT NULL,
    workflow_stage_id INTEGER,

    actor_user_id INTEGER,

    action_type TEXT NOT NULL,

    note TEXT,

    created_at TEXT,

    FOREIGN KEY (workflow_id)
        REFERENCES workflow(id),

    FOREIGN KEY (workflow_stage_id)
        REFERENCES workflow_stage(id),

    FOREIGN KEY (actor_user_id)
        REFERENCES user(id)
);





-- =========================================================
-- ASSESSMENT DOMAIN
-- =========================================================

CREATE TABLE assessment_template (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT UNIQUE,
    name TEXT NOT NULL,

    description TEXT,

    formula_type TEXT NOT NULL,

    minimum_score REAL,

    is_active INTEGER NOT NULL DEFAULT 1,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE assessment_section (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    assessment_template_id INTEGER NOT NULL,

    name TEXT NOT NULL,
    description TEXT,

    order_no INTEGER NOT NULL,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (assessment_template_id)
        REFERENCES assessment_template(id)
);



CREATE TABLE assessment_criteria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    assessment_section_id INTEGER NOT NULL,

    code TEXT,
    name TEXT NOT NULL,

    description TEXT,

    score_min REAL NOT NULL DEFAULT 0,
    score_max REAL NOT NULL DEFAULT 100,

    minimum_score REAL,

    weight REAL NOT NULL DEFAULT 1,

    order_no INTEGER NOT NULL,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (assessment_section_id)
        REFERENCES assessment_section(id)
);



CREATE TABLE assessment_submission (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    workflow_stage_id INTEGER NOT NULL,
    assessment_template_id INTEGER NOT NULL,

    reviewer_user_id INTEGER,

    attempt_no INTEGER NOT NULL DEFAULT 1,

    total_score REAL,

    recommendation TEXT,
    summary TEXT,

    submitted_at TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (workflow_stage_id)
        REFERENCES workflow_stage(id),

    FOREIGN KEY (assessment_template_id)
        REFERENCES assessment_template(id),

    FOREIGN KEY (reviewer_user_id)
        REFERENCES user(id)
);



CREATE TABLE assessment_score (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    assessment_submission_id INTEGER NOT NULL,
    assessment_criteria_id INTEGER NOT NULL,

    score REAL,

    note TEXT,

    created_at TEXT,
    updated_at TEXT,

    FOREIGN KEY (assessment_submission_id)
        REFERENCES assessment_submission(id),

    FOREIGN KEY (assessment_criteria_id)
        REFERENCES assessment_criteria(id)
);





-- =========================================================
-- FILE DOMAIN
-- =========================================================

CREATE TABLE file (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    refer_id INTEGER NOT NULL,
    refer_table TEXT NOT NULL,
    refer_field TEXT NOT NULL,

    title TEXT,

    name TEXT NOT NULL,
    path TEXT NOT NULL,

    mime TEXT,
    ext TEXT,

    size INTEGER,

    hash TEXT, -- checksum

    created_at TEXT,
    updated_at TEXT,
    uploaded_at TEXT,

    created_by INTEGER,
    updated_by INTEGER,
    uploaded_by INTEGER
);





-- =========================================================
-- OPTIONAL DOMAIN
-- =========================================================

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT UNIQUE,
    name TEXT NOT NULL,

    description TEXT,

    created_at TEXT,
    updated_at TEXT
);



CREATE TABLE position_department (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    position_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,

    FOREIGN KEY (position_id)
        REFERENCES position(id),

    FOREIGN KEY (department_id)
        REFERENCES department(id)
);





-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_user_role_id
ON user(role_id);



CREATE INDEX idx_batch_period_id
ON batch(period_id);

CREATE INDEX idx_batch_position_id
ON batch(position_id);



CREATE INDEX idx_candidate_batch_id
ON candidate(batch_id);

CREATE INDEX idx_candidate_status_id
ON candidate(candidate_status_id);

CREATE INDEX idx_candidate_recruiter_user_id
ON candidate(recruiter_user_id);



CREATE INDEX idx_workflow_candidate_id
ON workflow(candidate_id);



CREATE INDEX idx_workflow_stage_workflow_id
ON workflow_stage(workflow_id);

CREATE INDEX idx_workflow_stage_order_no
ON workflow_stage(order_no);



CREATE INDEX idx_workflow_assignment_stage_id
ON workflow_assignment(workflow_stage_id);

CREATE INDEX idx_workflow_assignment_assigned_to
ON workflow_assignment(assigned_to_user_id);



CREATE INDEX idx_workflow_activity_workflow_id
ON workflow_activity(workflow_id);



CREATE INDEX idx_assessment_section_template_id
ON assessment_section(assessment_template_id);



CREATE INDEX idx_assessment_criteria_section_id
ON assessment_criteria(assessment_section_id);



CREATE INDEX idx_assessment_submission_stage_id
ON assessment_submission(workflow_stage_id);

CREATE INDEX idx_assessment_submission_template_id
ON assessment_submission(assessment_template_id);

CREATE INDEX idx_assessment_submission_reviewer_id
ON assessment_submission(reviewer_user_id);



CREATE INDEX idx_assessment_score_submission_id
ON assessment_score(assessment_submission_id);



CREATE INDEX idx_file_reference
ON file(refer_table, refer_id, refer_field);



CREATE INDEX idx_position_department_position_id
ON position_department(position_id);

CREATE INDEX idx_position_department_department_id
ON position_department(department_id);