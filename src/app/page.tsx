import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  CheckSquare,
  Sparkles,
  Settings,
  Flame,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { monthlySchedules } from "@/lib/data/schedule";
import {
  type Period,
  type TaskCategory,
  type ScheduleTask,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  PERIOD_LABELS,
} from "@/lib/types";

// --- Helper functions ---

function getCurrentPeriod(month: number): Period {
  if (month >= 1 && month <= 2) return "year-end";
  if (month === 3) return "year-start";
  if (month >= 4 && month <= 6) return "semester1";
  if (month === 7) return "semester1-end";
  if (month >= 8 && month <= 9) return "semester2-start";
  if (month >= 10 && month <= 11) return "semester2";
  return "semester2-end"; // month === 12
}

const PERIOD_BANNER_STYLES: Record<Period, string> = {
  "year-start": "from-emerald-500 to-teal-600",
  semester1: "from-blue-500 to-indigo-600",
  "semester1-end": "from-amber-500 to-orange-600",
  "semester2-start": "from-cyan-500 to-blue-600",
  semester2: "from-violet-500 to-purple-600",
  "semester2-end": "from-rose-500 to-red-600",
  "year-end": "from-orange-500 to-red-600",
  always: "from-gray-500 to-gray-600",
};

const PERIOD_DESCRIPTIONS: Record<Period, string> = {
  "year-start":
    "학년초 세팅의 가장 중요한 시기입니다. 권한 부여, 학적 등록, 교육과정 편제를 최우선으로 처리하세요.",
  semester1:
    "1학기 일상 업무를 안정적으로 운영하세요. 전출입 처리와 출결 모니터링이 핵심입니다.",
  "semester1-end":
    "1학기 마감 시기입니다. 성적, 출결, 학생부 마감을 순서대로 진행하세요. 시스템 혼잡에 주의!",
  "semester2-start":
    "2학기 준비 기간입니다. 교육과정 확인과 권한 변동사항을 점검하세요.",
  semester2:
    "2학기 중간 관리 시기입니다. 성적과 학생부 입력을 모니터링하고 학년말을 미리 준비하세요.",
  "semester2-end":
    "2학기 마감 시기입니다. 성적, 학생부 최종 입력과 학년말 자료검증을 준비하세요. 시스템 혼잡에 주의!",
  "year-end":
    "학년말 핵심 업무 시기입니다. 자료검증 → 학생부 마감 → 수료/졸업 → 학년도 이월 순서를 반드시 지키세요!",
  always: "",
};

const PRIORITY_STYLES: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  low: "bg-gray-100 text-gray-600 border-gray-200",
};

const PRIORITY_LABELS: Record<string, string> = {
  critical: "긴급",
  high: "높음",
  medium: "보통",
  low: "낮음",
};

const PERIOD_NOTICES: Record<Period, string[]> = {
  "year-end": [
    "학년말 업무 처리 순서를 반드시 지켜주세요: 학생부 입력 완료 → 자료검증 → 학생부 마감 → 수료/졸업 → 학년도 이월",
    "학년도 이월은 모든 마감과 수료/졸업 처리가 완료된 후에만 실행하세요. 순서 미준수 시 데이터 오류가 발생합니다!",
    "졸업대장/수료대장을 반드시 출력하여 보관하세요.",
    "이월 전 미처리 학생이 없는지 최종 확인하세요. 미처리 학생은 이월 대상에서 제외될 수 있습니다.",
  ],
  "year-start": [
    "업무분장 설정 → 메뉴권한 → 자료권한 → 교무자료권한 승인 순서로 진행하세요.",
    "부서장도 반드시 부서원으로 편성해야 합니다. 누락 시 메뉴가 표시되지 않습니다.",
    "자료권한 등록 후 교무자료권한 승인(결재)까지 완료해야 교사가 업무를 시작할 수 있습니다.",
    "이전 학년도 업무분장 가져오기를 활용하면 설정이 훨씬 빠릅니다.",
    "[2025 신규] 2022 개정 교육과정 적용 학년(3-4학년)의 학교자율시간 편제 설정을 확인하세요.",
    "[2025 신규] 창의적체험활동 영역 변경: 봉사활동이 독립 영역에서 삭제, 타 영역과 연계/통합 운영됩니다.",
    "[2025 신규] 나이스 학부모서비스 온라인 출결 시스템(parents.neis.go.kr)이 본격 시행됩니다.",
  ],
  semester1: [
    "전출입 학생 발생 시 학적정보 이관과 출결 연계를 반드시 확인하세요.",
    "담임교사의 일일출결 입력 현황을 정기적으로 모니터링하세요.",
  ],
  "semester1-end": [
    "학기말은 시스템 혼잡 시기입니다. 마감 업무를 일찍 시작하세요.",
    "성적 마감 순서: 담임 마감 → 부장 확인 → 교감/교장 결재",
    "자료검증을 실시하여 누락 항목을 사전에 확인하세요.",
  ],
  "semester2-start": [
    "2학기 담임 변경이 있다면 메뉴권한과 자료권한을 반드시 수정하세요.",
    "여름방학 중 전입생 학적정보 이관을 확인하세요.",
  ],
  semester2: [
    "학년말 준비를 미리 시작하세요. 11월부터 학생부 최종 입력 안내가 필요합니다.",
    "졸업 대상 6학년 학생 명단을 사전에 확인하세요.",
  ],
  "semester2-end": [
    "2학기 마감과 학년말 준비를 병행해야 합니다.",
    "학교생활기록부 전 항목 (출결, 성적, 창체, 행동특성, 수상) 최종 입력을 독려하세요.",
    "자료검증을 실행하여 누락/오류 항목을 미리 파악하세요.",
  ],
  always: [],
};

// Guide recommendations per period
const PERIOD_GUIDE_LINKS: Record<
  Period,
  { id: string; title: string; icon: string }[]
> = {
  "year-end": [
    { id: "yearend", title: "학년말 업무 가이드", icon: "CheckSquare" },
    { id: "enrollment", title: "학적 관리 가이드", icon: "Users" },
    { id: "system", title: "시스템 관리 가이드", icon: "Settings" },
  ],
  "year-start": [
    { id: "permission", title: "권한 부여 완벽 가이드", icon: "Shield" },
    { id: "enrollment", title: "학적 관리 가이드", icon: "Users" },
    { id: "curriculum", title: "교육과정 편제 가이드", icon: "BookOpen" },
  ],
  semester1: [
    { id: "enrollment", title: "학적 관리 가이드", icon: "Users" },
    { id: "attendance", title: "출결 관리 가이드", icon: "CalendarCheck" },
    { id: "creative", title: "창의적체험활동 가이드", icon: "Sparkles" },
  ],
  "semester1-end": [
    { id: "grades", title: "성적 처리 가이드", icon: "FileText" },
    { id: "attendance", title: "출결 관리 가이드", icon: "CalendarCheck" },
    { id: "yearend", title: "학년말 업무 가이드", icon: "CheckSquare" },
  ],
  "semester2-start": [
    { id: "permission", title: "권한 부여 완벽 가이드", icon: "Shield" },
    { id: "curriculum", title: "교육과정 편제 가이드", icon: "BookOpen" },
    { id: "enrollment", title: "학적 관리 가이드", icon: "Users" },
  ],
  semester2: [
    { id: "grades", title: "성적 처리 가이드", icon: "FileText" },
    { id: "creative", title: "창의적체험활동 가이드", icon: "Sparkles" },
    { id: "yearend", title: "학년말 업무 가이드", icon: "CheckSquare" },
  ],
  "semester2-end": [
    { id: "grades", title: "성적 처리 가이드", icon: "FileText" },
    { id: "yearend", title: "학년말 업무 가이드", icon: "CheckSquare" },
    { id: "attendance", title: "출결 관리 가이드", icon: "CalendarCheck" },
  ],
  always: [],
};

const GUIDE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Shield,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  CheckSquare,
  Sparkles,
  Settings,
};

// --- Components ---

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_STYLES[priority]}`}
    >
      {priority === "critical" && <Flame className="w-3 h-3 mr-1" />}
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

function CategoryBadge({ category }: { category: TaskCategory }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function TaskCard({ task }: { task: ScheduleTask }) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug">
          {task.title}
        </h4>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {task.description}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <CategoryBadge category={task.category} />
        {task.deadline && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {task.deadline}
          </span>
        )}
      </div>
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentPeriod = getCurrentPeriod(currentMonth);

  const monthSchedule = monthlySchedules.find((s) => s.month === currentMonth);
  const tasks = monthSchedule?.tasks ?? [];

  const totalTasks = tasks.length;
  const criticalTasks = tasks.filter((t) => t.priority === "critical").length;
  const tasksWithDeadline = tasks.filter((t) => t.deadline).length;

  const notices = PERIOD_NOTICES[currentPeriod] ?? [];
  const guideLinks = PERIOD_GUIDE_LINKS[currentPeriod] ?? [];

  return (
    <div className="space-y-6">
      {/* Current Status Banner */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${PERIOD_BANNER_STYLES[currentPeriod]} p-6 text-white shadow-lg`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-white/80" />
            <span className="text-sm font-medium text-white/80">
              {now.getFullYear()}년 {currentMonth}월
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {PERIOD_LABELS[currentPeriod]}
          </h2>
          <p className="text-sm text-white/90 max-w-2xl leading-relaxed">
            {PERIOD_DESCRIPTIONS[currentPeriod]}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-indigo-50">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">이번 달 할 일</p>
            <p className="text-2xl font-bold text-gray-900">{totalTasks}건</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-red-50">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">긴급 업무</p>
            <p className="text-2xl font-bold text-gray-900">
              {criticalTasks}건
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-amber-50">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">마감 있는 업무</p>
            <p className="text-2xl font-bold text-gray-900">
              {tasksWithDeadline}건
            </p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* This Month's Tasks - spans 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">이번 달 할 일</h3>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              연간일정 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.map((task, index) => (
                <TaskCard key={index} task={task} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500 text-sm">
                이번 달 등록된 할 일이 없습니다.
              </p>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              추천 가이드
            </h3>
            <div className="space-y-2">
              {guideLinks.map((guide) => {
                const Icon = GUIDE_ICONS[guide.icon] ?? BookOpen;
                return (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {guide.title}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Important Notices */}
          {notices.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">주의사항</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-sm font-semibold text-amber-800">
                    {PERIOD_LABELS[currentPeriod]} 유의사항
                  </span>
                </div>
                <ul className="space-y-2">
                  {notices.map((notice, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-amber-900 leading-relaxed"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {notice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
