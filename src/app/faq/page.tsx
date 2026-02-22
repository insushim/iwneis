"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Filter,
  Tag,
  MessageCircle,
} from "lucide-react";
import { faqs } from "@/lib/data/faq";
import { resources, RESOURCE_CATEGORY_LABELS } from "@/lib/data/resources";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type TaskCategory,
} from "@/lib/types";

// --- Constants ---

const ALL_CATEGORIES: ("all" | TaskCategory)[] = [
  "all",
  "permission",
  "enrollment",
  "curriculum",
  "attendance",
  "grades",
  "records",
  "yearend",
  "transfer",
  "system",
  "creative",
];

const CATEGORY_FILTER_LABELS: Record<"all" | TaskCategory, string> = {
  all: "전체",
  ...CATEGORY_LABELS,
};

// IDs of popular/frequently asked questions
const POPULAR_FAQ_IDS = [
  "faq-1",
  "faq-19",
  "faq-8",
  "faq-31",
  "faq-33",
  "faq-40",
];

// --- Helpers ---

function formatAnswer(answer: string): React.ReactNode {
  const lines = answer.split("\n");
  return lines.map((line, i) => {
    if (line === "") {
      return <br key={i} />;
    }
    return (
      <span key={i}>
        {line}
        {i < lines.length - 1 && lines[i + 1] !== "" && <br />}
      </span>
    );
  });
}

function matchesSearch(
  query: string,
  question: string,
  answer: string,
  tags: string[],
): boolean {
  const lowerQuery = query.toLowerCase();
  return (
    question.toLowerCase().includes(lowerQuery) ||
    answer.toLowerCase().includes(lowerQuery) ||
    tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

// --- Components ---

function FAQItem({
  question,
  answer,
  category,
  tags,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  category: TaskCategory;
  tags: string[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex items-start gap-3 w-full text-left px-5 py-4 transition-colors hover:bg-gray-50/50"
      >
        <HelpCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 leading-relaxed">
            {question}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${CATEGORY_COLORS[category]}`}
            >
              {CATEGORY_LABELS[category]}
            </span>
          </div>
        </div>
        <div className="shrink-0 mt-0.5">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-4 border-t border-gray-50">
          <div className="pt-3 pl-8 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {formatAnswer(answer)}
          </div>
          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3 pl-8">
              <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-[11px] text-gray-500 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PopularSection({
  onSelectFaq,
  openIds,
}: {
  onSelectFaq: (id: string) => void;
  openIds: Set<string>;
}) {
  const popularFaqs = faqs.filter((faq) => POPULAR_FAQ_IDS.includes(faq.id));

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100 p-5">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-5 h-5 text-primary-600" />
        <h2 className="text-sm font-bold text-gray-900">
          자주 묻는 질문 TOP {popularFaqs.length}
        </h2>
      </div>
      <div className="space-y-2">
        {popularFaqs.map((faq) => (
          <button
            key={faq.id}
            onClick={() => onSelectFaq(faq.id)}
            className={`flex items-start gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-colors ${
              openIds.has(faq.id)
                ? "bg-white/80 shadow-sm"
                : "bg-white/50 hover:bg-white/80"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 leading-snug">
              {faq.question}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Main Page ---

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | TaskCategory>(
    "all",
  );
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePopularSelect = (id: string) => {
    // Open the selected FAQ and scroll to it
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // Reset filters so the FAQ is visible
    setSearchQuery("");
    setActiveCategory("all");
    // Scroll to the element after a brief delay for re-render
    setTimeout(() => {
      const el = document.getElementById(`faq-item-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const categoryMatch =
        activeCategory === "all" || faq.category === activeCategory;
      const searchMatch =
        searchQuery.trim() === "" ||
        matchesSearch(searchQuery, faq.question, faq.answer, faq.tags);
      return categoryMatch && searchMatch;
    });
  }, [searchQuery, activeCategory]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || activeCategory !== "all";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100">
            <HelpCircle className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">자주 묻는 질문</h1>
            <p className="text-sm text-gray-500">
              NEIS 업무 관련 자주 묻는 질문과 답변을 검색하세요
            </p>
          </div>
        </div>
      </div>

      {/* Layout: main + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content - 3 cols */}
        <div className="lg:col-span-3 space-y-5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문, 답변, 태그로 검색하세요..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                지우기
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1.5">
            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-gray-400 ml-2 mr-1 shrink-0" />
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {ALL_CATEGORIES.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-gray-900 text-white shadow-sm"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      {CATEGORY_FILTER_LABELS[cat]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-gray-500">
              {hasActiveFilters ? (
                <>
                  검색 결과{" "}
                  <span className="font-semibold text-gray-700">
                    {filteredFaqs.length}
                  </span>
                  건
                </>
              ) : (
                <>
                  전체{" "}
                  <span className="font-semibold text-gray-700">
                    {filteredFaqs.length}
                  </span>
                  건의 FAQ
                </>
              )}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                필터 초기화
              </button>
            )}
          </div>

          {/* FAQ list */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} id={`faq-item-${faq.id}`}>
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    category={faq.category}
                    tags={faq.tags}
                    isOpen={openIds.has(faq.id)}
                    onToggle={() => toggleFaq(faq.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-100">
              <HelpCircle className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-sm text-gray-400 mb-1">검색 결과가 없습니다</p>
              <p className="text-xs text-gray-400">
                다른 키워드로 검색하거나 카테고리를 변경해보세요
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <PopularSection
              onSelectFaq={handlePopularSelect}
              openIds={openIds}
            />

            {/* Resources Section */}
            <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                참고 자료 및 지원
              </h3>
              <div className="space-y-3">
                {(
                  ["support", "official", "education", "community"] as const
                ).map((cat) => (
                  <div key={cat}>
                    <p className="text-xs font-medium text-gray-500 mb-1.5">
                      {RESOURCE_CATEGORY_LABELS[cat]}
                    </p>
                    {resources
                      .filter((r) => r.category === cat)
                      .map((r) => (
                        <div
                          key={r.name}
                          className="mb-2 pl-2 border-l-2 border-gray-100"
                        >
                          <p className="text-xs font-medium text-gray-800">
                            {r.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.description}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
