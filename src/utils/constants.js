import {
    PiWavesDuotone,
    PiChartLineDuotone
} from "react-icons/pi";
import {
    IoIosSettings,
    IoIosWater
} from "react-icons/io";
import {
    IoCalendar
} from "react-icons/io5";

export const MAIN_MESSAGE = {
    icon: IoIosWater,
    title: " 물막이판 관리 센터",
    subtitle: "실시간 수위 모니터링 및 물막이판 원격 제어 시스템입니다.\n'실시간 수위 감지, 원격 제어 — 한 곳에서 관리하세요.'"
};

export const MENU = [{
        name: "홈",
        to: "/",
    },
    {
        name: "물막이판 현황",
        to: "/dashboard",
    },
    {
        name: '물막이판 제어',
        to: "/control",
    }
];

export const FEATURE = [{
        icon: PiWavesDuotone,
        title: " 실시간 감지",
        subtitle: "실시간으로 물막이판 수위를 감지합니다.",
        explain: "수위계의 현재 수위를 실시간을 확인하고, 날짜별 물막이판 작동 여부를 확인할 수 있습니다.",
        image: ["src/assets/dashboard_chart.png", "src/assets/dashboard_day.png"],
        subType: "dashboard_chart_day",
        svg: "waves",
        type: "image",
    },
    {
        icon: IoIosSettings,
        title: " 원격 제어",
        subtitle: "원격으로 물막이판을 제어합니다.",
        explain: "3D 모델을 통해 물막이판의 상태를 실시간으로 확인하고, 버튼을 눌러 원격으로 제어할 수 있습니다.",
        image: ["src/assets/control_barrier.png", "src/assets/control_water.png"],
        subType: "control",
        svg: "setting",
        type: "image",
    }
]


export const DETAILE_FEATURES = {
    chart: {
        icon: PiChartLineDuotone,
        title: " 현 수위 차트",
        subtitle: "현재 센서에서 측정된 수위 데이터를 실시간으로 시각화한 그래프입니다",
        type: "chart",
        subType: "dashboard_chart",
    },
    water: {
        icon: IoCalendar,
        title: " 물막이판 주간 동작 현황",
        subtitle: "주간 물막이판의 시간대별 작동 상태를 확인하세요.",
        type: "water",
        subType: "dashboard_day",
    }

}

export const YEAR = [2025, 2024, 2023];

export const WATER_STATUS = [{
        year: 2025,
        month: 11,
        day: 8,
        start: 24,
        end: 3,
        isON: false,
    }, {
        year: 2025,
        month: 11,
        day: 9,
        start: 24,
        end: 3,
        isON: true,
    },

]

export const TIME_BLOCKS = [
    "00-03",
    "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-24"
];

export const TOPICS = ["topic1", "topic2", "topic3"];

export const THRESHOLD = {
    min: 30,
    max: 40,
};