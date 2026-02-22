"use client";

import { useState } from "react";
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
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Monitor,
} from "lucide-react";
import { guides } from "@/lib/data/guides";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import type { GuideSection, Step } from "@/lib/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  CheckSquare,
  Sparkles,
  Settings,
  Monitor,
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

function SectionAccordion({
  section,
  index,
  isOpen,
  onToggle,
}: {
  section: GuideSection;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {section.title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {section.menuPath && (
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Monitor className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <code className="text-sm text-gray-700 font-mono leading-relaxed break-all">
                {section.menuPath}
              </code>
            </div>
          )}

          {section.content && (
            <div className="text-sm text-gray-700 leading-relaxed">
              {section.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < section.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          )}

          {section.steps && section.steps.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">진행 단계</h4>
              <ol className="space-y-3">
                {section.steps.map((step: Step) => (
                  <li
                    key={step.order}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold shrink-0 mt-0.5">
                      {step.order}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {step.description}
                      </p>
                      {step.substeps && step.substeps.length > 0 && (
                        <ul className="mt-2 space-y-1 pl-1">
                          {step.substeps.map((sub, si) => (
                            <li
                              key={si}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                      {step.warning && (
                        <div className="mt-2 flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-xs text-amber-800">
                            {step.warning}
                          </p>
                        </div>
                      )}
                      {step.tip && (
                        <div className="mt-2 flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                          <Lightbulb className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                          <p className="text-xs text-blue-800">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {section.warnings && section.warnings.length > 0 && (
            <div className="space-y-2">
              {section.warnings.map((warning, wi) => (
                <div
                  key={wi}
                  className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800">{warning}</p>
                </div>
              ))}
            </div>
          )}

          {section.tips && section.tips.length > 0 && (
            <div className="space-y-2">
              {section.tips.map((tip, ti) => (
                <div
                  key={ti}
                  className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-800">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GuideDetail({ id }: { id: string }) {
  const guide = guides.find((g) => g.id === id);

  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!guide) {
    return (
      <div className="space-y-4">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          가이드 목록으로
        </Link>
        <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">가이드를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[guide.icon] ?? BookOpen;

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link
          href="/guides"
          className="hover:text-primary-600 transition-colors"
        >
          업무 가이드
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">
          {guide.title}
        </span>
      </nav>

      <Link
        href="/guides"
        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        가이드 목록으로
      </Link>

      <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 shrink-0">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900">{guide.title}</h1>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {guide.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
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
            <span className="text-xs text-gray-400">
              {guide.sections.length}개 섹션
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {guide.sections.map((section, index) => (
          <SectionAccordion
            key={index}
            section={section}
            index={index}
            isOpen={!!openSections[index]}
            onToggle={() => toggleSection(index)}
          />
        ))}
      </div>
    </div>
  );
}
