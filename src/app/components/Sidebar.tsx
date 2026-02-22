"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  CheckSquare,
  HelpCircle,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/calendar", label: "연간일정", icon: CalendarDays },
  { href: "/guides", label: "업무가이드", icon: BookOpen },
  { href: "/checklist", label: "체크리스트", icon: CheckSquare },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo / Title */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white leading-tight truncate">
            NEIS 업무 도우미
          </h1>
          <p className="text-xs text-sidebar-text mt-0.5 truncate">
            초등학교 업무담당자용
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-sidebar-active text-sidebar-text-active shadow-sm"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-sidebar-text/60">NEIS Helper v0.1</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-bg text-white shadow-lg lg:hidden"
        aria-label="메뉴 열기"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 overlay-fade lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg flex flex-col sidebar-transition lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg text-sidebar-text hover:text-white hover:bg-sidebar-hover transition-colors"
          aria-label="메뉴 닫기"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-sidebar-bg">
        {sidebarContent}
      </aside>
    </>
  );
}
