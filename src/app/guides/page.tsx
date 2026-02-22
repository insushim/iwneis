import Link from "next/link";
import {
  Shield,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  CheckSquare,
  Sparkles,
  Settings,
} from "lucide-react";
import { guides } from "@/lib/data/guides";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  CheckSquare,
  Sparkles,
  Settings,
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  advanced: "bg-red-100 text-red-700 border-red-200",
};

export default function GuidesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">업무 가이드</h1>
        <p className="mt-1 text-sm text-gray-500">
          NEIS 업무별 상세 가이드를 확인하세요. 단계별 설명과 주의사항을
          안내합니다.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => {
          const Icon = ICON_MAP[guide.icon] ?? BookOpen;
          return (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="group flex flex-col gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${DIFFICULTY_STYLES[guide.difficulty]}`}
                >
                  {DIFFICULTY_LABELS[guide.difficulty]}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[guide.category]}`}
                >
                  {CATEGORY_LABELS[guide.category]}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
