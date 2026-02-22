export interface Resource {
  name: string;
  description: string;
  category: "official" | "education" | "community" | "support";
}

export const resources: Resource[] = [
  {
    name: "NEIS 도움센터 (help.neis.go.kr)",
    description: "4세대 나이스 공식 사용자 설명서, FAQ, 업무안내서 제공",
    category: "official",
  },
  {
    name: "학교생활기록부 종합지원포털 (star.moe.go.kr)",
    description: "학생부 기재요령, Q&A, 동영상 연수 자료, 권한 부여 영상",
    category: "official",
  },
  {
    name: "나이스 중앙상담센터 (1600-8400)",
    description: "나이스 시스템 관련 전화 상담 서비스",
    category: "support",
  },
  {
    name: "나이스사용자지원서비스 (help.neis.go.kr)",
    description: "프로그램 오류 및 기능개선 문의 접수",
    category: "support",
  },
  {
    name: "경기도교육정보기록원 (goeia.go.kr)",
    description: "학년말/학년초 나이스 교무업무 연수 자료, FAQ",
    category: "education",
  },
  {
    name: "경남교육청 나이스 자료 (gne.go.kr)",
    description: "나이스 교무업무 사용자 설명서 (초,중,고,특수)",
    category: "education",
  },
  {
    name: "전북교육청 NEIS 자료 (it.jbe.go.kr)",
    description: "학교업무분장관리 상세 안내서",
    category: "education",
  },
  {
    name: "울산 NEIS 자문단 카페",
    description: "4세대 나이스 Q&A, 실무 팁 공유, 현장 교사 질문/답변",
    category: "community",
  },
  {
    name: "새물내 솔솔 블로그 (gyo6.pe.kr)",
    description: "나이스 교육과정 편성, 권한 생성 등 실무 가이드",
    category: "community",
  },
  {
    name: "학교업무정보나눔터 (use.go.kr)",
    description: "초등학교 교무업무 매뉴얼 및 나눔 자료",
    category: "education",
  },
];

export const RESOURCE_CATEGORY_LABELS: Record<string, string> = {
  official: "공식 자료",
  education: "교육청 자료",
  community: "커뮤니티",
  support: "지원/상담",
};
