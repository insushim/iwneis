"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  CheckSquare,
  Square,
  CheckCircle2,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  BarChart3,
  ListChecks,
} from "lucide-react";
import { checklists } from "@/lib/data/checklists";
import {
  type Period,
  type TaskCategory,
  type ChecklistItem,
  type ChecklistSubItem,
  PERIOD_LABELS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/types";

// --- Constants ---

const STORAGE_KEY = "neis-checklist-state";

const PERIODS: Period[] = [
  "year-start",
  "semester1",
  "semester1-end",
  "semester2-start",
  "semester2",
  "semester2-end",
  "year-end",
];

const PERIOD_TAB_COLORS: Record<Period, string> = {
  "year-start": "bg-emerald-500",
  semester1: "bg-blue-500",
  "semester1-end": "bg-amber-500",
  "semester2-start": "bg-cyan-500",
  semester2: "bg-violet-500",
  "semester2-end": "bg-rose-500",
  "year-end": "bg-orange-500",
  always: "bg-gray-500",
};

const PERIOD_TAB_RING: Record<Period, string> = {
  "year-start": "ring-emerald-400",
  semester1: "ring-blue-400",
  "semester1-end": "ring-amber-400",
  "semester2-start": "ring-cyan-400",
  semester2: "ring-violet-400",
  "semester2-end": "ring-rose-400",
  "year-end": "ring-orange-400",
  always: "ring-gray-400",
};

const PERIOD_SHORT_LABELS: Record<Period, string> = {
  "year-start": "학년초",
  semester1: "1학기",
  "semester1-end": "1학기말",
  "semester2-start": "2학기초",
  semester2: "2학기",
  "semester2-end": "2학기말",
  "year-end": "학년말",
  always: "수시",
};

// --- Helpers ---

function getCurrentPeriod(month: number): Period {
  if (month >= 1 && month <= 2) return "year-end";
  if (month === 3) return "year-start";
  if (month >= 4 && month <= 6) return "semester1";
  if (month === 7) return "semester1-end";
  if (month >= 8 && month <= 9) return "semester2-start";
  if (month >= 10 && month <= 11) return "semester2";
  return "semester2-end"; // month === 12
}

interface CheckedState {
  [itemId: string]: boolean;
}

function loadCheckedState(): CheckedState {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return {};
}

function saveCheckedState(state: CheckedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

function getItemsForPeriod(period: Period): ChecklistItem[] {
  return checklists
    .filter((item) => item.period === period)
    .sort((a, b) => a.order - b.order);
}

function getCategoriesForItems(
  items: ChecklistItem[],
): { category: TaskCategory; items: ChecklistItem[] }[] {
  const categoryMap = new Map<TaskCategory, ChecklistItem[]>();
  for (const item of items) {
    const existing = categoryMap.get(item.category) ?? [];
    existing.push(item);
    categoryMap.set(item.category, existing);
  }
  return Array.from(categoryMap.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}

function countChecked(
  items: ChecklistItem[],
  checkedState: CheckedState,
): { checked: number; total: number } {
  let checked = 0;
  let total = 0;
  for (const item of items) {
    if (item.subItems && item.subItems.length > 0) {
      for (const sub of item.subItems) {
        total++;
        if (checkedState[sub.id]) checked++;
      }
    }
    total++;
    if (checkedState[item.id]) checked++;
  }
  return { checked, total };
}

// --- Components ---

function ProgressBar({
  checked,
  total,
  size = "md",
}: {
  checked: number;
  total: number;
  size?: "sm" | "md";
}) {
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
  const barHeight = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-1 ${barHeight} bg-gray-100 rounded-full overflow-hidden`}
      >
        <div
          className={`${barHeight} rounded-full transition-all duration-500 ease-out ${
            percent === 100
              ? "bg-green-500"
              : percent > 60
                ? "bg-primary-500"
                : percent > 30
                  ? "bg-amber-500"
                  : "bg-gray-300"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        className={`shrink-0 font-semibold tabular-nums ${
          size === "sm" ? "text-xs text-gray-500" : "text-sm text-gray-700"
        }`}
      >
        {checked}/{total} ({percent}%)
      </span>
    </div>
  );
}

function SubItemRow({
  subItem,
  checked,
  onToggle,
}: {
  subItem: ChecklistSubItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2.5 w-full text-left pl-10 pr-3 py-1.5 rounded-lg transition-colors hover:bg-gray-50 group ${
        checked ? "opacity-60" : ""
      }`}
    >
      {checked ? (
        <CheckSquare className="w-4 h-4 text-green-500 shrink-0" />
      ) : (
        <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400 shrink-0" />
      )}
      <span
        className={`text-sm ${
          checked ? "line-through text-gray-400" : "text-gray-600"
        }`}
      >
        {subItem.text}
      </span>
    </button>
  );
}

function ChecklistItemRow({
  item,
  checkedState,
  onToggle,
  onToggleSub,
}: {
  item: ChecklistItem;
  checkedState: CheckedState;
  onToggle: (id: string) => void;
  onToggleSub: (id: string) => void;
}) {
  const isChecked = !!checkedState[item.id];
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="py-1">
      <div className="flex items-center gap-1">
        {/* Expand/collapse button for sub-items */}
        {hasSubItems ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-gray-100 transition-colors shrink-0"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}

        {/* Main checkbox + text */}
        <button
          onClick={() => onToggle(item.id)}
          className={`flex items-center gap-2.5 flex-1 text-left px-2 py-1.5 rounded-lg transition-colors hover:bg-gray-50 group ${
            isChecked ? "opacity-60" : ""
          }`}
        >
          {isChecked ? (
            <CheckSquare className="w-[18px] h-[18px] text-green-500 shrink-0" />
          ) : (
            <Square className="w-[18px] h-[18px] text-gray-300 group-hover:text-gray-400 shrink-0" />
          )}
          <span
            className={`text-sm font-medium ${
              isChecked ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {item.text}
          </span>
        </button>
      </div>

      {/* Sub-items */}
      {hasSubItems && expanded && (
        <div className="ml-2 mt-0.5">
          {item.subItems!.map((sub) => (
            <SubItemRow
              key={sub.id}
              subItem={sub}
              checked={!!checkedState[sub.id]}
              onToggle={() => onToggleSub(sub.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryGroup({
  category,
  items,
  checkedState,
  onToggle,
  onToggleSub,
}: {
  category: TaskCategory;
  items: ChecklistItem[];
  checkedState: CheckedState;
  onToggle: (id: string) => void;
  onToggleSub: (id: string) => void;
}) {
  const { checked, total } = countChecked(items, checkedState);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Category header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[category]}`}
          >
            {CATEGORY_LABELS[category]}
          </span>
          <span className="text-xs text-gray-400">
            {checked}/{total}
          </span>
        </div>
        {checked === total && total > 0 && (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Items */}
      <div className="px-2 py-1 divide-y divide-gray-50">
        {items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            checkedState={checkedState}
            onToggle={onToggle}
            onToggleSub={onToggleSub}
          />
        ))}
      </div>
    </div>
  );
}

function OverallProgress({ checkedState }: { checkedState: CheckedState }) {
  const periodStats = PERIODS.map((period) => {
    const items = getItemsForPeriod(period);
    const { checked, total } = countChecked(items, checkedState);
    return { period, checked, total };
  });

  const totalChecked = periodStats.reduce((sum, s) => sum + s.checked, 0);
  const totalAll = periodStats.reduce((sum, s) => sum + s.total, 0);
  const overallPercent =
    totalAll === 0 ? 0 : Math.round((totalChecked / totalAll) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          <h3 className="text-sm font-bold text-gray-900">전체 진행률</h3>
        </div>
        <span className="text-lg font-bold text-primary-600">
          {overallPercent}%
        </span>
      </div>

      <ProgressBar checked={totalChecked} total={totalAll} />

      <div className="space-y-2">
        {periodStats.map(({ period, checked, total }) => {
          const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
          return (
            <div key={period} className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${PERIOD_TAB_COLORS[period]}`}
              />
              <span className="text-xs text-gray-600 w-16 shrink-0">
                {PERIOD_SHORT_LABELS[period]}
              </span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    percent === 100
                      ? "bg-green-500"
                      : percent > 0
                        ? "bg-primary-400"
                        : "bg-gray-200"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400 tabular-nums w-14 text-right shrink-0">
                {checked}/{total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main Page ---

export default function ChecklistPage() {
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [activePeriod, setActivePeriod] = useState<Period>("year-start");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Set default period based on current month & load from localStorage
  useEffect(() => {
    const month = new Date().getMonth() + 1;
    setActivePeriod(getCurrentPeriod(month));
    setCheckedState(loadCheckedState());
    setIsLoaded(true);
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (isLoaded) {
      saveCheckedState(checkedState);
    }
  }, [checkedState, isLoaded]);

  const toggleItem = useCallback((id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const resetPeriod = useCallback(() => {
    const periodItems = getItemsForPeriod(activePeriod);
    setCheckedState((prev) => {
      const next = { ...prev };
      for (const item of periodItems) {
        delete next[item.id];
        if (item.subItems) {
          for (const sub of item.subItems) {
            delete next[sub.id];
          }
        }
      }
      return next;
    });
    setShowResetConfirm(false);
  }, [activePeriod]);

  const periodItems = useMemo(
    () => getItemsForPeriod(activePeriod),
    [activePeriod],
  );
  const categoryGroups = useMemo(
    () => getCategoriesForItems(periodItems),
    [periodItems],
  );
  const { checked: periodChecked, total: periodTotal } = useMemo(
    () => countChecked(periodItems, checkedState),
    [periodItems, checkedState],
  );

  // Don't render checklist content until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        {/* Page header skeleton */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100">
              <ListChecks className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">체크리스트</h1>
              <p className="text-sm text-gray-500">
                시기별 NEIS 업무 체크리스트
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100">
            <ListChecks className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">체크리스트</h1>
            <p className="text-sm text-gray-500">시기별 NEIS 업무 체크리스트</p>
          </div>
        </div>
      </div>

      {/* Layout: main + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content - 3 cols */}
        <div className="lg:col-span-3 space-y-5">
          {/* Period tabs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {PERIODS.map((period) => {
                const isActive = period === activePeriod;
                const items = getItemsForPeriod(period);
                const { checked, total } = countChecked(items, checkedState);
                const percent =
                  total === 0 ? 0 : Math.round((checked / total) * 100);

                return (
                  <button
                    key={period}
                    onClick={() => setActivePeriod(period)}
                    className={`relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap min-w-[80px] ${
                      isActive
                        ? `bg-gray-900 text-white shadow-sm ring-1 ${PERIOD_TAB_RING[period]}`
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    <span className={isActive ? "font-bold" : ""}>
                      {PERIOD_SHORT_LABELS[period]}
                    </span>
                    {/* Mini progress indicator */}
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-1 bg-gray-600/20 rounded-full overflow-hidden">
                        <div
                          className={`h-1 rounded-full transition-all ${
                            isActive
                              ? percent === 100
                                ? "bg-green-400"
                                : "bg-white/80"
                              : percent === 100
                                ? "bg-green-500"
                                : "bg-gray-300"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      {percent === 100 && total > 0 && (
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Period progress + reset */}
          <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">
                  {PERIOD_LABELS[activePeriod]}
                </h2>
                <div className="relative">
                  {showResetConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        초기화할까요?
                      </span>
                      <button
                        onClick={resetPeriod}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        확인
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
                      title="이 시기의 체크 항목을 모두 초기화합니다"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      초기화
                    </button>
                  )}
                </div>
              </div>
              <ProgressBar checked={periodChecked} total={periodTotal} />
            </div>
          </div>

          {/* Category groups */}
          {categoryGroups.length > 0 ? (
            <div className="space-y-4">
              {categoryGroups.map(({ category, items }) => (
                <CategoryGroup
                  key={category}
                  category={category}
                  items={items}
                  checkedState={checkedState}
                  onToggle={toggleItem}
                  onToggleSub={toggleItem}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-sm text-gray-400">
                이 시기에 등록된 체크리스트가 없습니다.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - overall progress */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <OverallProgress checkedState={checkedState} />
          </div>
        </div>
      </div>
    </div>
  );
}
