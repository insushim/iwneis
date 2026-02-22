"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  AlertTriangle,
  ArrowUp,
  Minus,
  ArrowDown,
  CalendarDays,
} from "lucide-react";
import { monthlySchedules } from "@/lib/data/schedule";
import {
  type Period,
  type TaskCategory,
  type ScheduleTask,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  PERIOD_LABELS,
} from "@/lib/types";

// --- Constants ---

const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const PRIORITY_CONFIG: Record<
  string,
  { label: string; color: string; borderColor: string; dotColor: string }
> = {
  critical: {
    label: "긴급",
    color: "bg-red-100 text-red-700 border-red-200",
    borderColor: "border-red-400",
    dotColor: "bg-red-500",
  },
  high: {
    label: "높음",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    borderColor: "border-orange-400",
    dotColor: "bg-orange-500",
  },
  medium: {
    label: "보통",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    borderColor: "border-blue-400",
    dotColor: "bg-blue-500",
  },
  low: {
    label: "낮음",
    color: "bg-gray-100 text-gray-600 border-gray-200",
    borderColor: "border-gray-400",
    dotColor: "bg-gray-400",
  },
};

const PERIOD_BORDER_COLORS: Record<Period, string> = {
  "year-start": "border-l-emerald-500",
  semester1: "border-l-blue-500",
  "semester1-end": "border-l-amber-500",
  "semester2-start": "border-l-cyan-500",
  semester2: "border-l-violet-500",
  "semester2-end": "border-l-rose-500",
  "year-end": "border-l-orange-500",
  always: "border-l-gray-400",
};

const PERIOD_BG_COLORS: Record<Period, string> = {
  "year-start": "bg-emerald-50",
  semester1: "bg-blue-50",
  "semester1-end": "bg-amber-50",
  "semester2-start": "bg-cyan-50",
  semester2: "bg-violet-50",
  "semester2-end": "bg-rose-50",
  "year-end": "bg-orange-50",
  always: "bg-gray-50",
};

const PERIOD_TEXT_COLORS: Record<Period, string> = {
  "year-start": "text-emerald-700",
  semester1: "text-blue-700",
  "semester1-end": "text-amber-700",
  "semester2-start": "text-cyan-700",
  semester2: "text-violet-700",
  "semester2-end": "text-rose-700",
  "year-end": "text-orange-700",
  always: "text-gray-600",
};

const PERIOD_BADGE_COLORS: Record<Period, string> = {
  "year-start": "bg-emerald-100 text-emerald-700",
  semester1: "bg-blue-100 text-blue-700",
  "semester1-end": "bg-amber-100 text-amber-700",
  "semester2-start": "bg-cyan-100 text-cyan-700",
  semester2: "bg-violet-100 text-violet-700",
  "semester2-end": "bg-rose-100 text-rose-700",
  "year-end": "bg-orange-100 text-orange-700",
  always: "bg-gray-100 text-gray-600",
};

// --- Helper ---

function getPriorityIcon(priority: string) {
  switch (priority) {
    case "critical":
      return <Flame className="w-3.5 h-3.5 text-red-500" />;
    case "high":
      return <ArrowUp className="w-3.5 h-3.5 text-orange-500" />;
    case "medium":
      return <Minus className="w-3.5 h-3.5 text-blue-500" />;
    case "low":
      return <ArrowDown className="w-3.5 h-3.5 text-gray-400" />;
    default:
      return null;
  }
}

function countByPriority(tasks: ScheduleTask[]) {
  return {
    critical: tasks.filter((t) => t.priority === "critical").length,
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };
}

// --- Components ---

function PriorityLegend() {
  const items = [
    { key: "critical", icon: <Flame className="w-4 h-4" /> },
    { key: "high", icon: <ArrowUp className="w-4 h-4" /> },
    { key: "medium", icon: <Minus className="w-4 h-4" /> },
    { key: "low", icon: <ArrowDown className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {items.map(({ key, icon }) => {
        const config = PRIORITY_CONFIG[key];
        return (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${config.color} border`}
            >
              {icon}
            </span>
            <span className="text-sm text-gray-600">{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TaskItem({ task }: { task: ScheduleTask }) {
  return (
    <div className="flex items-start gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <span className="mt-0.5 shrink-0">{getPriorityIcon(task.priority)}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-900 leading-snug">
            {task.title}
          </span>
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${CATEGORY_COLORS[task.category]}`}
          >
            {CATEGORY_LABELS[task.category]}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
          {task.description}
        </p>
        {task.deadline && (
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <Clock className="w-3 h-3" />
            {task.deadline}
          </span>
        )}
      </div>
    </div>
  );
}

function PrioritySummary({ tasks }: { tasks: ScheduleTask[] }) {
  const counts = countByPriority(tasks);
  const items = [
    { key: "critical" as const, count: counts.critical },
    { key: "high" as const, count: counts.high },
    { key: "medium" as const, count: counts.medium },
    { key: "low" as const, count: counts.low },
  ].filter((item) => item.count > 0);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {items.map(({ key, count }) => (
        <span
          key={key}
          className="inline-flex items-center gap-0.5"
          title={`${PRIORITY_CONFIG[key].label} ${count}건`}
        >
          <span
            className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[key].dotColor}`}
          />
          <span className="text-xs text-gray-500">{count}</span>
        </span>
      ))}
    </div>
  );
}

function MonthCard({
  month,
  period,
  tasks,
  isCurrentMonth,
  isExpanded,
  onToggle,
}: {
  month: number;
  period: Period;
  tasks: ScheduleTask[];
  isCurrentMonth: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative rounded-xl border-l-4 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        PERIOD_BORDER_COLORS[period]
      } ${
        isCurrentMonth
          ? "ring-2 ring-primary-400 ring-offset-2 shadow-md"
          : "border border-gray-100"
      }`}
    >
      {/* Current month indicator */}
      {isCurrentMonth && (
        <div className="absolute -top-2.5 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500 text-white text-[10px] font-bold shadow-sm">
            <CalendarDays className="w-3 h-3" />
            이번 달
          </span>
        </div>
      )}

      {/* Card header - clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 pb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-t-xl"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3
                className={`text-lg font-bold ${
                  isCurrentMonth ? "text-primary-700" : "text-gray-900"
                }`}
              >
                {MONTH_NAMES[month - 1]}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${PERIOD_BADGE_COLORS[period]}`}
              >
                {PERIOD_LABELS[period]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {tasks.length}건의 업무
              </span>
              <PrioritySummary tasks={tasks} />
            </div>
          </div>
          <div className="mt-1 shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {/* Collapsed: priority dots preview */}
      {!isExpanded && tasks.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-1">
            {tasks.slice(0, 5).map((task, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                  PRIORITY_CONFIG[task.priority].color
                } border`}
                title={task.title}
              >
                {task.title.length > 10
                  ? task.title.slice(0, 10) + "..."
                  : task.title}
              </span>
            ))}
            {tasks.length > 5 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] text-gray-500 bg-gray-50 border border-gray-200">
                +{tasks.length - 5}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expanded: full task list */}
      {isExpanded && tasks.length > 0 && (
        <div className="px-3 pb-3 border-t border-gray-50">
          <div className="divide-y divide-gray-50">
            {tasks.map((task, i) => (
              <TaskItem key={i} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* No tasks */}
      {tasks.length === 0 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400">등록된 업무가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

// --- Main Page ---

export default function CalendarPage() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  // Current month is expanded by default
  const [expandedMonths, setExpandedMonths] = useState<Set<number>>(
    new Set([currentMonth]),
  );

  const toggleMonth = (month: number) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  };

  // Overall stats
  const totalTasks = monthlySchedules.reduce(
    (sum, s) => sum + s.tasks.length,
    0,
  );
  const totalCritical = monthlySchedules.reduce(
    (sum, s) => sum + s.tasks.filter((t) => t.priority === "critical").length,
    0,
  );
  const totalHigh = monthlySchedules.reduce(
    (sum, s) => sum + s.tasks.filter((t) => t.priority === "high").length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100">
            <Calendar className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">연간일정</h1>
            <p className="text-sm text-gray-500">
              NEIS 업무담당자 연간 업무 캘린더
            </p>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50">
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">
              연간 총 업무
            </p>
            <p className="text-xl font-bold text-gray-900">{totalTasks}건</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-50">
            <Flame className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">긴급 업무</p>
            <p className="text-xl font-bold text-gray-900">{totalCritical}건</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-50">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">높음 업무</p>
            <p className="text-xl font-bold text-gray-900">{totalHigh}건</p>
          </div>
        </div>
      </div>

      {/* Priority legend */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <span className="text-sm font-semibold text-gray-700">
          우선순위 범례
        </span>
        <PriorityLegend />
      </div>

      {/* 12-month grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {monthlySchedules.map((schedule) => (
          <MonthCard
            key={schedule.month}
            month={schedule.month}
            period={schedule.period}
            tasks={schedule.tasks}
            isCurrentMonth={schedule.month === currentMonth}
            isExpanded={expandedMonths.has(schedule.month)}
            onToggle={() => toggleMonth(schedule.month)}
          />
        ))}
      </div>

      {/* Period color guide at the bottom */}
      <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          시기별 색상 안내
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {(Object.keys(PERIOD_LABELS) as Period[])
            .filter((p) => p !== "always")
            .map((period) => (
              <div
                key={period}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${PERIOD_BG_COLORS[period]}`}
              >
                <span
                  className={`w-3 h-3 rounded-sm border-l-4 ${PERIOD_BORDER_COLORS[period]}`}
                />
                <span
                  className={`text-xs font-medium ${PERIOD_TEXT_COLORS[period]}`}
                >
                  {PERIOD_LABELS[period]}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
