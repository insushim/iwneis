// NEIS Helper 타입 정의

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  month: number; // 1-12
  priority: "critical" | "high" | "medium" | "low";
  estimatedTime?: string;
  menuPath?: string;
  steps?: Step[];
  warnings?: string[];
  tips?: string[];
  relatedFaq?: string[];
}

export interface Step {
  order: number;
  title: string;
  description: string;
  menuPath?: string;
  substeps?: string[];
  warning?: string;
  tip?: string;
  screenshot?: string;
}

export type TaskCategory =
  | "permission" // 권한 부여
  | "enrollment" // 학적 관리
  | "curriculum" // 교육과정
  | "attendance" // 출결 관리
  | "grades" // 성적 처리
  | "records" // 학교생활기록부
  | "yearend" // 학년말 업무
  | "transfer" // 학년도 이월
  | "system" // 시스템 관리
  | "creative"; // 창의적체험활동

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: TaskCategory;
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: TaskCategory;
  period: Period;
  order: number;
  subItems?: ChecklistSubItem[];
}

export interface ChecklistSubItem {
  id: string;
  text: string;
  completed: boolean;
}

export type Period =
  | "year-start" // 학년초 (3월)
  | "semester1" // 1학기 (4-6월)
  | "semester1-end" // 1학기말 (7월)
  | "semester2-start" // 2학기초 (8-9월)
  | "semester2" // 2학기 (10-11월)
  | "semester2-end" // 2학기말 (12월)
  | "year-end" // 학년말 (1-2월)
  | "always"; // 수시

export interface MonthlySchedule {
  month: number;
  period: Period;
  title: string;
  tasks: ScheduleTask[];
}

export interface ScheduleTask {
  title: string;
  category: TaskCategory;
  priority: "critical" | "high" | "medium" | "low";
  description: string;
  deadline?: string;
}

export interface Guide {
  id: string;
  title: string;
  category: TaskCategory;
  icon: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sections: GuideSection[];
}

export interface GuideSection {
  title: string;
  content: string;
  steps?: Step[];
  warnings?: string[];
  tips?: string[];
  menuPath?: string;
}

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  permission: "권한 부여",
  enrollment: "학적 관리",
  curriculum: "교육과정",
  attendance: "출결 관리",
  grades: "성적 처리",
  records: "학교생활기록부",
  yearend: "학년말 업무",
  transfer: "학년도 이월",
  system: "시스템 관리",
  creative: "창의적체험활동",
};

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  permission: "bg-blue-100 text-blue-800 border-blue-200",
  enrollment: "bg-green-100 text-green-800 border-green-200",
  curriculum: "bg-purple-100 text-purple-800 border-purple-200",
  attendance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  grades: "bg-red-100 text-red-800 border-red-200",
  records: "bg-indigo-100 text-indigo-800 border-indigo-200",
  yearend: "bg-orange-100 text-orange-800 border-orange-200",
  transfer: "bg-pink-100 text-pink-800 border-pink-200",
  system: "bg-gray-100 text-gray-800 border-gray-200",
  creative: "bg-teal-100 text-teal-800 border-teal-200",
};

export const PERIOD_LABELS: Record<Period, string> = {
  "year-start": "학년초 (3월)",
  semester1: "1학기 (4~6월)",
  "semester1-end": "1학기말 (7월)",
  "semester2-start": "2학기초 (8~9월)",
  semester2: "2학기 (10~11월)",
  "semester2-end": "2학기말 (12월)",
  "year-end": "학년말 (1~2월)",
  always: "수시",
};
