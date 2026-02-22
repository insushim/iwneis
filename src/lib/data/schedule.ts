import { MonthlySchedule } from "../types";

export const monthlySchedules: MonthlySchedule[] = [
  {
    month: 1,
    period: "year-end",
    title: "1월 - 학년말 준비",
    tasks: [
      {
        title: "졸업/수료 사전 준비",
        category: "yearend",
        priority: "high",
        description: "졸업대장/수료대장 점검, 졸업식 관련 NEIS 처리 사항 확인",
      },
      {
        title: "신학년도 업무분장 계획 수립",
        category: "permission",
        priority: "medium",
        description: "차년도 업무분장 초안 작성, 부서 및 담당자 구성 계획",
      },
      {
        title: "인증서 갱신 확인",
        category: "system",
        priority: "high",
        description: "GPKI/기관인증서 유효기간 확인, 갱신 필요 시 즉시 처리",
      },
      {
        title: "신입생 명부 확인",
        category: "enrollment",
        priority: "medium",
        description: "취학통지서 발송 현황 확인, 신입생 예비소집 준비",
      },
      {
        title: "학교생활기록부 최종 점검",
        category: "records",
        priority: "high",
        description: "전체 학생 학교생활기록부 기재 현황 최종 점검",
      },
    ],
  },
  {
    month: 2,
    period: "year-end",
    title: "2월 - 학년말 핵심 업무 (가장 바쁜 시기)",
    tasks: [
      {
        title: "학년말 자료검증 실시",
        category: "yearend",
        priority: "critical",
        description:
          "NEIS 자료검증 기능 실행, 누락/오류 항목 확인 및 수정. 인정오류 처리 포함",
        deadline: "2월 중순까지",
      },
      {
        title: "학교생활기록부 마감",
        category: "records",
        priority: "critical",
        description:
          "담임 마감 → 부장 확인 → 교감/교장 결재 순으로 진행. 전 학년 마감 완료 필수",
        deadline: "졸업식 전까지",
      },
      {
        title: "수료/졸업 처리",
        category: "yearend",
        priority: "critical",
        description:
          "1~5학년 수료 처리, 6학년 졸업 처리. 졸업대장/수료대장 출력 확인",
        deadline: "졸업식 당일",
      },
      {
        title: "학년도 이월 처리",
        category: "transfer",
        priority: "critical",
        description:
          "학생부 마감 + 수료/졸업 완료 확인 후 학년도이월 실행. 반드시 순서 준수!",
        deadline: "2월 말",
      },
      {
        title: "신학년도 반편성 (이월 후)",
        category: "enrollment",
        priority: "high",
        description: "학년도이월 완료 후 신학년 반편성, 담임 배정 시작",
      },
      {
        title: "전입 교사 인증서 관리",
        category: "system",
        priority: "medium",
        description: "전입 교사 기관인증서 발급/인계, 키갱신 실시",
      },
    ],
  },
  {
    month: 3,
    period: "year-start",
    title: "3월 - 학년초 세팅 (가장 중요한 시기)",
    tasks: [
      {
        title: "학교업무분장 설정",
        category: "permission",
        priority: "critical",
        description:
          "부서 생성, 부서장 지정, 부서원 편성. 이전 학년도 자료 가져오기 활용 권장",
        deadline: "3월 첫째 주",
      },
      {
        title: "메뉴권한 부여",
        category: "permission",
        priority: "critical",
        description:
          "담임교사에게 학적/출결/성적/창체/행동특성 메뉴의 조회+등록/수정 권한 부여",
        deadline: "3월 첫째 주",
      },
      {
        title: "자료권한 부여 (학년반/교과목)",
        category: "permission",
        priority: "critical",
        description: "각 담임의 학년/반 자료권한 부여. 변경사유 입력 필수",
        deadline: "3월 첫째 주",
      },
      {
        title: "교무자료권한 승인 요청",
        category: "permission",
        priority: "critical",
        description:
          "자료권한 등록 후 교감/교장 결재 요청. 승인까지 완료되어야 교사 업무 가능",
        deadline: "3월 첫째 주",
      },
      {
        title: "신입생 학적 등록",
        category: "enrollment",
        priority: "critical",
        description: "1학년 신입생 학적 등록, 기초정보 입력, 학급 배정",
        deadline: "개학 전",
      },
      {
        title: "재학생 반편성 완료",
        category: "enrollment",
        priority: "high",
        description: "2~6학년 학급 재편성, 번호 부여 완료 확인",
        deadline: "개학 전",
      },
      {
        title: "교육과정 편제 설정",
        category: "curriculum",
        priority: "high",
        description: "학교유형 설정 후 학년별 교과편제 및 시간배당 등록",
        deadline: "3월 둘째 주",
      },
      {
        title: "학생 기초정보 최신화",
        category: "enrollment",
        priority: "medium",
        description: "주소, 연락처, 보호자 정보 등 업데이트 확인",
      },
      {
        title: "출결 관리 체계 안내",
        category: "attendance",
        priority: "medium",
        description: "담임교사에게 일일출결관리 방법 안내, 출결 구분 기준 공유",
      },
      {
        title: "EVPN 사용 안내",
        category: "system",
        priority: "low",
        description: "원격근무 필요 교사에게 EVPN 신청/설치 방법 안내",
      },
    ],
  },
  {
    month: 4,
    period: "semester1",
    title: "4월 - 1학기 일상 업무",
    tasks: [
      {
        title: "전출입 학생 처리",
        category: "enrollment",
        priority: "high",
        description: "전입생 접수 및 학적정보 이관, 전출생 처리 및 자료 발송",
      },
      {
        title: "출결 입력 현황 모니터링",
        category: "attendance",
        priority: "medium",
        description: "각 담임의 일일출결 입력 현황 점검, 미입력 알림",
      },
      {
        title: "학생부 입력 현황 점검",
        category: "records",
        priority: "medium",
        description: "수상경력, 창의적체험활동 등 입력 현황 확인",
      },
      {
        title: "교육과정 편제 점검",
        category: "curriculum",
        priority: "low",
        description: "교과별 시수 배당이 정상적으로 반영되었는지 확인",
      },
    ],
  },
  {
    month: 5,
    period: "semester1",
    title: "5월 - 1학기 중간 점검",
    tasks: [
      {
        title: "전출입 학생 처리",
        category: "enrollment",
        priority: "high",
        description: "전입생/전출생 발생 시 즉시 처리",
      },
      {
        title: "출결 관리 모니터링",
        category: "attendance",
        priority: "medium",
        description: "장기결석 학생 모니터링, 체험학습 서류 확인",
      },
      {
        title: "교과학습발달상황 입력 안내",
        category: "grades",
        priority: "medium",
        description: "담임교사에게 1학기 서술형 평가 입력 일정 사전 안내",
      },
    ],
  },
  {
    month: 6,
    period: "semester1",
    title: "6월 - 1학기말 준비",
    tasks: [
      {
        title: "1학기 성적 입력 안내",
        category: "grades",
        priority: "high",
        description: "교과학습발달상황 서술형 평가 입력 일정 확정 및 안내",
      },
      {
        title: "출결 정리 안내",
        category: "attendance",
        priority: "medium",
        description: "1학기 출결 마감 일정 안내, 누락분 입력 독려",
      },
      {
        title: "창의적체험활동 입력 확인",
        category: "creative",
        priority: "medium",
        description: "자율/동아리/봉사/진로 활동 특기사항 입력 현황 점검",
      },
      {
        title: "전출입 학생 처리",
        category: "enrollment",
        priority: "high",
        description: "전입생/전출생 발생 시 즉시 처리",
      },
    ],
  },
  {
    month: 7,
    period: "semester1-end",
    title: "7월 - 1학기 마감 (시스템 혼잡 주의)",
    tasks: [
      {
        title: "1학기 성적(교과학습발달상황) 처리",
        category: "grades",
        priority: "critical",
        description: "전 학년 교과학습발달상황 서술형 입력 완료 확인",
        deadline: "종업식 전",
      },
      {
        title: "1학기 출결 마감",
        category: "attendance",
        priority: "critical",
        description: "1학기 출석일수, 결석일수 확정. 모든 학생 출결 정리 완료",
        deadline: "종업식 전",
      },
      {
        title: "학교생활기록부 1학기 마감",
        category: "records",
        priority: "critical",
        description: "담임 마감 → 부장 확인 → 교감/교장 결재",
        deadline: "종업식 전",
      },
      {
        title: "행동특성및종합의견 입력 확인",
        category: "records",
        priority: "high",
        description: "전체 학생 행동특성및종합의견 입력 완료 여부 점검",
      },
      {
        title: "자료검증 실시",
        category: "yearend",
        priority: "high",
        description: "1학기 자료검증으로 누락항목 확인",
      },
    ],
  },
  {
    month: 8,
    period: "semester2-start",
    title: "8월 - 2학기 준비",
    tasks: [
      {
        title: "2학기 교육과정 확인",
        category: "curriculum",
        priority: "high",
        description: "2학기 교과편제 및 시간배당 확인, 변경사항 반영",
      },
      {
        title: "전입생 처리",
        category: "enrollment",
        priority: "high",
        description: "여름방학 중 전입생 학적정보 이관 처리",
      },
      {
        title: "권한 변동사항 반영",
        category: "permission",
        priority: "medium",
        description: "2학기 담임 변경, 업무분장 변경 시 메뉴/자료권한 수정",
      },
    ],
  },
  {
    month: 9,
    period: "semester2-start",
    title: "9월 - 2학기 시작 점검",
    tasks: [
      {
        title: "2학기 출결 관리 시작",
        category: "attendance",
        priority: "medium",
        description: "2학기 일일출결관리 정상 운영 확인",
      },
      {
        title: "전출입 학생 처리",
        category: "enrollment",
        priority: "high",
        description: "전입생/전출생 발생 시 즉시 처리",
      },
      {
        title: "권한 변동사항 최종 확인",
        category: "permission",
        priority: "medium",
        description: "2학기 담임교사 메뉴/자료권한 정상 부여 확인",
      },
    ],
  },
  {
    month: 10,
    period: "semester2",
    title: "10월 - 2학기 중간 관리",
    tasks: [
      {
        title: "2학기 성적 입력 모니터링",
        category: "grades",
        priority: "medium",
        description: "교과학습발달상황 입력 현황 중간 점검",
      },
      {
        title: "출결 관리",
        category: "attendance",
        priority: "medium",
        description: "장기결석 학생 모니터링, 출결 입력 현황 점검",
      },
      {
        title: "학생부 입력 독려",
        category: "records",
        priority: "medium",
        description: "창의적체험활동, 행동특성 등 학기말까지 입력 완료 안내",
      },
    ],
  },
  {
    month: 11,
    period: "semester2",
    title: "11월 - 학년말 준비 시작",
    tasks: [
      {
        title: "2학기 성적 입력 독려",
        category: "grades",
        priority: "high",
        description: "교과학습발달상황 서술형 평가 입력 일정 안내",
      },
      {
        title: "학교생활기록부 최종 입력 안내",
        category: "records",
        priority: "high",
        description: "전 항목 입력 완료 일정 안내 (출결, 성적, 창체, 행동특성)",
      },
      {
        title: "학년말 자료검증 사전 점검",
        category: "yearend",
        priority: "medium",
        description: "주요 누락항목 사전 파악, 수정 안내",
      },
      {
        title: "졸업/수료 사전 준비",
        category: "yearend",
        priority: "medium",
        description: "6학년 졸업 대상자 확인, 졸업앨범 등 관련 업무 확인",
      },
    ],
  },
  {
    month: 12,
    period: "semester2-end",
    title: "12월 - 2학기 마감 (시스템 혼잡 주의)",
    tasks: [
      {
        title: "2학기 성적 마감",
        category: "grades",
        priority: "critical",
        description: "전 학년 교과학습발달상황 서술형 입력 완료",
        deadline: "12월 말",
      },
      {
        title: "학교생활기록부 최종 입력",
        category: "records",
        priority: "critical",
        description:
          "출결, 성적, 창체, 행동특성, 수상경력 등 전 항목 최종 입력",
        deadline: "12월 말",
      },
      {
        title: "학년말 자료검증 사전 점검",
        category: "yearend",
        priority: "high",
        description:
          "자료검증 실행하여 누락/오류 항목 확인, 담임에게 수정 안내",
      },
      {
        title: "출결 마감 준비",
        category: "attendance",
        priority: "high",
        description: "2학기 출결 정리, 연간 출결 현황 확인",
      },
    ],
  },
];
