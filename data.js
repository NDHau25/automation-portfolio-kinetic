/* Edit the defaults below to personalize the deployed website.
   Editor changes are stored in the browser's localStorage; use the editor's
   "Backup" tab to publish them to data.json in this repo via the GitHub API. */

/* Admin key: visit the site once with ?admin=<this value> to unlock the editor on
   that browser (the public page hides every edit button). Change it to your own
   secret value. It ships with the static source, so the GitHub token remains the
   real protection for publishing changes. */
window.PORTFOLIO_ADMIN_KEY = 'hau-2026-8fK29xQf';

window.PORTFOLIO_DEFAULTS = {
  profile: {
    name: 'Tên của bạn',
    roleVi: 'Sinh viên Kỹ thuật Tự động hóa',
    roleEn: 'Automation Engineering Student',
    school: 'Trường / Khoa của bạn',
    email: '',
    phone: '',
    location: 'Việt Nam',
    github: '',
    linkedin: '',
    website: '', facebook: '', youtube: '', zalo: '', tiktok: '', instagram: '',
    available: true,
    bioVi: 'Tôi là sinh viên ngành Kỹ thuật Tự động hóa, quan tâm đến hệ thống nhúng, robot, lý thuyết điều khiển và truyền thông công nghiệp. Tôi thích kết nối cảm biến, vi điều khiển và phần mềm để tạo nên các nguyên mẫu có thể đo lường và kiểm chứng.',
    bioEn: 'I am an Automation Engineering student interested in embedded systems, robotics, control theory, and industrial communication. I enjoy bringing sensors, controllers and software together to build measurable, testable prototypes.'
  },
  skillGroups: [
    { id: 'embedded', nameVi: 'Vi điều khiển & IoT', nameEn: 'Embedded & IoT', icon: 'chip', skills: ['STM32 / HAL', 'Arduino / C++', 'ESP32', 'GPIO / ADC / PWM', 'I²C / SPI / UART', 'Cảm biến & cơ cấu chấp hành'] },
    { id: 'robotics', nameVi: 'Robot & Điều khiển', nameEn: 'Robotics & Control', icon: 'robot', skills: ['ROS 2 Humble', 'TF2 / URDF', 'LiDAR / SLAM', 'Odometry', 'PID', 'MATLAB / Simulink'] },
    { id: 'industrial', nameVi: 'Kết nối công nghiệp', nameEn: 'Industrial Networks', icon: 'network', skills: ['Modbus RTU / TCP', 'RS485', 'MQTT', 'Wireshark', 'HMI / Monitoring', 'Networking Basics'] },
    { id: 'software', nameVi: 'Phần mềm & Mô phỏng', nameEn: 'Software & Simulation', icon: 'terminal', skills: ['Python', 'C / C#', 'Visual Studio', 'Unity', 'Proteus / Wokwi', 'Plant Simulation'] }
  ],
  projects: [
    {
      id: 'ros2-mobile-robot', category: 'robotics', visual: 'robot', featured: true, period: '2026', status: 'Đang phát triển',
      titleVi: 'Robot tự hành 4 bánh với ROS 2', titleEn: 'ROS 2 Four-Wheel Mobile Robot',
      summaryVi: 'Xây dựng robot bốn bánh thường, tích hợp Jetson Nano, STM32 và LiDAR để phát triển URDF, TF2, odometry và SLAM trên ROS 2 Humble.',
      summaryEn: 'Building a four-wheel mobile robot with Jetson Nano, STM32 and LiDAR, focusing on URDF, TF2, odometry and SLAM in ROS 2 Humble.',
      tags: ['ROS 2 Humble', 'Jetson Nano', 'STM32', 'LiDAR', 'URDF', 'TF2'],
      hardware: ['Khung robot 720 × 720 mm', '4 bánh thường', 'Slamtec RPLIDAR A3M1', 'Jetson Nano', 'STM32'],
      tasksVi: ['Thiết kế mô hình robot và xác định hệ trục tọa độ.', 'Xây dựng mô hình URDF, cây TF2 và liên kết cảm biến.', 'Phát triển hướng xử lý odometry cho cấu hình bốn bánh thường.', 'Chuẩn bị tích hợp dữ liệu LaserScan để thử nghiệm SLAM.'],
      tasksEn: ['Defined the robot coordinate frames and chassis geometry.', 'Developed the URDF model, TF2 tree and sensor transforms.', 'Worked on odometry for a standard four-wheel configuration.', 'Prepared LaserScan integration for SLAM experiments.'],
      architecture: 'RPLIDAR → Jetson Nano / ROS 2 ↔ STM32 → Wheel drive', github: '', demo: ''
    },
    {
      id: 'magnetic-levitation-pid', category: 'control', visual: 'wave', featured: true, period: '2025–2026', status: 'Thử nghiệm',
      titleVi: 'Điều khiển nâng từ bằng PID', titleEn: 'Magnetic Levitation with PID Control',
      summaryVi: 'Nghiên cứu cân bằng nam châm bằng điện từ, đo tín hiệu Hall và dòng điện, thử nghiệm điều khiển PWM và PID với Arduino và MATLAB.',
      summaryEn: 'Experimenting with electromagnet-based levitation, Hall sensing, current monitoring and PWM/PID control using Arduino and MATLAB.',
      tags: ['PID', 'MATLAB', 'Arduino UNO', 'Hall 49E', 'INA219', 'PWM'],
      hardware: ['Nam châm điện ELE-P25/11', 'Nam châm vĩnh cửu', 'Hall 49E', 'INA219', 'TIP120', 'Arduino UNO'],
      tasksVi: ['Đo và hiệu chuẩn tín hiệu cảm biến Hall theo khoảng cách.', 'Kiểm tra đáp ứng cuộn dây, dòng điện và tín hiệu PWM.', 'Xây dựng mô hình điều khiển phản hồi, thử nghiệm PID.', 'Ghi dữ liệu để đánh giá nhiễu, ổn định và đáp ứng hệ thống.'],
      tasksEn: ['Calibrated Hall sensor readings against magnet distance.', 'Tested electromagnet current and PWM responses.', 'Developed feedback-control experiments with PID.', 'Logged signals to study noise and control stability.'],
      architecture: 'Hall 49E → Arduino / MATLAB → PID → TIP120 / PWM → Electromagnet', github: '', demo: ''
    },
    {
      id: 'esp32-smart-home', category: 'embedded', visual: 'chip', featured: true, period: '2025', status: 'Đồ án học tập',
      titleVi: 'Giám sát nhà thông minh với ESP32', titleEn: 'ESP32 Smart Home Monitoring',
      summaryVi: 'Hệ thống đo nhiệt độ, độ ẩm và ánh sáng; điều khiển đèn, quạt theo AUTO/MANUAL qua MQTT, tích hợp màn hình và giám sát từ xa.',
      summaryEn: 'ESP32 system for temperature, humidity and light monitoring, with AUTO/MANUAL fan and lighting control via MQTT.',
      tags: ['ESP32', 'DHT22', 'MQTT', 'OLED', 'C++', 'IoT'],
      hardware: ['ESP32', 'DHT22', 'LM393 light module', 'SSD1306 OLED', 'microSD', 'Relay / outputs'],
      tasksVi: ['Thiết kế các topic MQTT để giám sát và điều khiển.', 'Xử lý chế độ AUTO/MANUAL và ngưỡng nhiệt độ, ánh sáng.', 'Đọc cảm biến và hiển thị thông số thiết bị.', 'Thử nghiệm truyền nhận dữ liệu với shiftr.io / MQTT client.'],
      tasksEn: ['Designed MQTT topics for monitoring and commands.', 'Implemented AUTO/MANUAL modes and configurable thresholds.', 'Read environmental sensors and displayed system parameters.', 'Tested data exchange through shiftr.io and MQTT clients.'],
      architecture: 'Sensors → ESP32 ↔ MQTT Broker ↔ Dashboard / Commands', github: '', demo: ''
    },
    {
      id: 'modbus-labs', category: 'industrial', visual: 'network', featured: true, period: '2025', status: 'Bài thực hành',
      titleVi: 'Thực nghiệm truyền thông Modbus', titleEn: 'Modbus RTU / TCP Communication Labs',
      summaryVi: 'Thiết lập Master–Slave, phân tích bản tin Modbus, exception, độ trễ, retransmission và giao tiếp qua RTU/TCP.',
      summaryEn: 'Built Modbus Master–Slave labs and analyzed frames, exceptions, latency, TCP retransmissions and RTU/TCP communication.',
      tags: ['Modbus RTU', 'Modbus TCP', 'RS485', 'Wireshark', 'TCP/IP'],
      hardware: ['Modbus Poll', 'Modbus Slave', 'Virtual COM', 'Wireshark', 'USB-RS485 (tùy cấu hình)'],
      tasksVi: ['Thiết lập Modbus RTU qua cặp COM ảo với thông số truyền xác định.', 'Đọc ghi coil, holding register và kiểm tra mã lỗi exception.', 'Bắt gói TCP với Wireshark, quan sát RTT và retransmission.', 'So sánh ảnh hưởng của độ trễ và số lượng client.'],
      tasksEn: ['Configured virtual-COM Modbus RTU Master–Slave sessions.', 'Exercised coil/register access and exception responses.', 'Captured TCP traffic with Wireshark to examine RTT and retransmissions.', 'Studied the impact of latency and concurrent clients.'],
      architecture: 'Master (Modbus Poll) ↔ RTU / TCP ↔ Slave / Server', github: '', demo: ''
    },
    {
      id: 'stm32-temperature', category: 'embedded', visual: 'chip', featured: false, period: '2025', status: 'Đồ án học tập',
      titleVi: 'Bộ điều khiển nhiệt độ STM32', titleEn: 'STM32 Temperature Controller',
      summaryVi: 'Đọc DS18B20, hiển thị LCD I²C, cài đặt ngưỡng nhiệt độ bằng nút nhấn và đóng ngắt relay theo nguyên lý hysteresis.',
      summaryEn: 'STM32 thermostat using DS18B20, I²C LCD, button-set temperature thresholds and hysteresis-based relay control.',
      tags: ['STM32 HAL', 'DS18B20', 'I²C', 'Relay', 'C'],
      hardware: ['STM32', 'DS18B20', 'LCD 16×2 I²C', 'Relay', '3 nút nhấn'],
      tasksVi: ['Giao tiếp 1-Wire với cảm biến DS18B20.', 'Thiết kế menu cài đặt Max/Min trên LCD với nút nhấn.', 'Điều khiển relay theo hai ngưỡng nhiệt độ để tránh đóng cắt liên tục.'],
      tasksEn: ['Implemented 1-Wire communication with DS18B20.', 'Built LCD menus for upper/lower setpoint adjustment.', 'Applied relay hysteresis to reduce rapid output switching.'],
      architecture: 'DS18B20 → STM32 → LCD I²C + Relay (hysteresis)', github: '', demo: ''
    },
    {
      id: 'unity-duck-hunt', category: 'simulation', visual: 'target', featured: false, period: '2025', status: 'Nguyên mẫu',
      titleVi: 'Duck Hunt: Arduino × Python × Unity', titleEn: 'Duck Hunt: Arduino × Python × Unity',
      summaryVi: 'Trò chơi tương tác kết hợp cảm biến quang, servo, Arduino, Python Serial/UDP và Unity để đồng bộ hành động vật lý với mô phỏng.',
      summaryEn: 'Interactive Duck Hunt prototype combining optical sensing, servo, Arduino, Python serial/UDP bridging and Unity.',
      tags: ['Unity', 'Arduino', 'Python', 'UDP', 'Servo'],
      hardware: ['Arduino UNO', 'Cảm biến LM393', 'Servo SG90', 'Trigger', 'Unity game'],
      tasksVi: ['Đọc cảm biến và nút cò trên Arduino.', 'Chuyển sự kiện từ Serial sang UDP bằng Python.', 'Xử lý sự kiện trong Unity và điều khiển servo theo vị trí mục tiêu.', 'Thử nghiệm tương tác thời gian thực giữa phần cứng và game.'],
      tasksEn: ['Read optical sensor and trigger events on Arduino.', 'Bridged Serial messages to Unity through Python/UDP.', 'Handled gameplay events and servo target tracking.', 'Tested near-real-time interaction between hardware and game.'],
      architecture: 'Sensor / Trigger → Arduino ↔ Python UDP ↔ Unity', github: '', demo: ''
    },
    {
      id: 'plant-simulation', category: 'simulation', visual: 'factory', featured: false, period: '2026', status: 'Mô phỏng học tập',
      titleVi: 'Mô phỏng dây chuyền sản xuất', titleEn: 'Production Line Simulation',
      summaryVi: 'Mô phỏng luồng vật liệu, trạm xử lý, thời gian gia công và các chỉ tiêu hiệu suất bằng Tecnomatix Plant Simulation.',
      summaryEn: 'Production flow, processing stations, cycle times and performance metrics modeled with Tecnomatix Plant Simulation.',
      tags: ['Plant Simulation', 'Discrete-event', 'KPI', 'Manufacturing'],
      hardware: ['Siemens Tecnomatix Plant Simulation 2201'],
      tasksVi: ['Thiết kế sơ đồ mô phỏng các trạm trong dây chuyền.', 'Thiết lập processing time, setup time và logic luân chuyển.', 'Quan sát biểu đồ hiệu suất và thời gian chờ để phân tích nút thắt.'],
      tasksEn: ['Modeled manufacturing stations and material flow.', 'Configured processing/setup times and routing logic.', 'Reviewed throughput and waiting time to identify bottlenecks.'],
      architecture: 'Source → Processing Stations → Buffer → Drain → KPI Reports', github: '', demo: ''
    }
  ]
};

// Content aligned with the course E-Portfolio and CV writing guides.
window.PORTFOLIO_DEFAULTS.extras = {
  "mottoVi": "Thiết kế có cơ sở. Thử nghiệm có số liệu. Cải tiến có mục tiêu.",
  "mottoEn": "Design with evidence. Test with data. Improve with purpose.",
  "lifeGoalVi": "Học tập bền bỉ, làm việc có trách nhiệm và tạo ra các giải pháp kỹ thuật có ích, có thể kiểm chứng.",
  "lifeGoalEn": "Keep learning, work responsibly and build practical, testable engineering solutions.",
  "careerShortVi": "Tìm cơ hội thực tập hoặc vị trí kỹ thuật phù hợp để tham gia phát triển phần mềm nhúng, điều khiển và robot; rèn luyện quy trình thiết kế, thử nghiệm, báo cáo.",
  "careerShortEn": "Seek an internship or entry-level engineering role in embedded systems, controls or robotics while improving testing and documentation skills.",
  "careerLongVi": "Trong 3–5 năm tới, hướng tới vị trí kỹ sư có thể triển khai và tích hợp hệ thống tự động hóa từ thiết bị, giao tiếp đến giám sát và vận hành an toàn.",
  "careerLongEn": "Within 3–5 years, work toward becoming an engineer capable of integrating safe automation systems from devices and communication to monitoring and operations.",
  "cvPosition": "Thực tập sinh / Kỹ sư Tự động hóa",
  "portfolioUrl": "",
  "portraitUrl": "",
  "dob": "",
  "education": [
    {
      "id": "edu-1",
      "title": "Chương trình Kỹ thuật Tự động hóa",
      "organization": "[Điền tên trường, khoa]",
      "period": "[Niên khóa]",
      "description": "Hướng học tập: hệ thống nhúng, điều khiển, robot, truyền thông công nghiệp. Hãy bổ sung GPA, học bổng hoặc kết quả có xác nhận nếu có.",
      "evidence": "",
      "isPlaceholder": true
    }
  ],
  "courses": [
    {
      "id": "course-1",
      "title": "Thực hành lập trình vi điều khiển và cảm biến",
      "organization": "Đồ án / thực hành tại trường",
      "period": "",
      "description": "STM32, Arduino, ESP32, giao tiếp I²C/UART và đọc dữ liệu cảm biến. Đây là mô tả nhóm kiến thức thực hành, không phải chứng chỉ.",
      "evidence": ""
    },
    {
      "id": "course-2",
      "title": "Thực hành Robot & Truyền thông",
      "organization": "Đồ án / thực hành tại trường",
      "period": "",
      "description": "ROS 2, LiDAR, mô phỏng, Modbus RTU/TCP và MQTT.",
      "evidence": ""
    }
  ],
  "certificates": [],
  "experiences": [],
  "awards": [],
  "activities": [],
  "hobbies": [],
  "softSkills": [
    "Phân tích và giải quyết vấn đề",
    "Tự học kỹ thuật",
    "Viết tài liệu và báo cáo thử nghiệm",
    "Làm việc nhóm trong đồ án"
  ],
  "reflections": [
    {
      "id": "reflection-ros",
      "title": "Trải nghiệm tích hợp LiDAR và ROS 2",
      "period": "2026",
      "projectId": "ros2-mobile-robot",
      "situation": "Khi cảm biến đã lắp lên robot, dữ liệu quét chịu ảnh hưởng của vị trí lắp, TF và chuyển động của nền tảng.",
      "actions": "Đo hình học, kiểm tra bốn hướng quét, quan sát bag LaserScan và đối chiếu khung TF khi thử nghiệm SLAM.",
      "learning": "Một bản đồ méo không chỉ do thuật toán; trước hết phải xác minh thời gian, hướng khung tọa độ, vật cản quanh cảm biến và odometry.",
      "next": "Hoàn thành đo che khuất và đánh giá SLAM/odometry trên robot lắp thực tế.",
      "isSample": true
    },
    {
      "id": "reflection-pid",
      "title": "Bài học từ thử nghiệm nâng từ PID",
      "period": "2025–2026",
      "projectId": "magnetic-levitation-pid",
      "situation": "Hệ nâng từ nhạy với nhiễu cảm biến, đặc tuyến cuộn hút và độ trễ điều khiển.",
      "actions": "Đo tín hiệu Hall, quan sát điện áp và dòng của mạch kích; điều chỉnh phương pháp lấy mẫu và PID.",
      "learning": "Phải xác minh đường dòng đo và tính đúng chiều phản hồi trước khi tăng hệ số điều khiển.",
      "next": "Thu thập đồ thị thực nghiệm, so sánh PID và cải thiện độ ổn định.",
      "isSample": true
    }
  ],
  "media": [
    {
      "id": "media-ros",
      "title": "Ảnh lắp robot và LiDAR",
      "type": "image",
      "url": "",
      "description": "Chèn ảnh thật của khung robot, cảm biến và dây nối để minh chứng thiết kế.",
      "projectId": "ros2-mobile-robot",
      "isPlaceholder": true
    },
    {
      "id": "media-pid",
      "title": "Báo cáo PID và đồ thị đo",
      "type": "document",
      "url": "",
      "description": "Thêm báo cáo PDF, ảnh sơ đồ khối và đồ thị từ quá trình thử nghiệm.",
      "projectId": "magnetic-levitation-pid",
      "isPlaceholder": true
    },
    {
      "id": "media-esp",
      "title": "Video demo ESP32/MQTT",
      "type": "video",
      "url": "",
      "description": "Thêm video trình diễn cảm biến, màn hình OLED và chế độ AUTO/MANUAL.",
      "projectId": "esp32-smart-home",
      "isPlaceholder": true
    }
  ]
};
// STAR / START examples are editable descriptions, not independently verified outcome claims.
const portfolioStarDefaults = {
 'ros2-mobile-robot': ['Tích hợp LiDAR lên robot với các vấn đề về hướng trục và sai lệch bản đồ.','Hiệu chuẩn vị trí LiDAR, xây dựng TF/URDF và kiểm tra LaserScan.','Đo kích thước 700 × 700 mm, kiểm tra góc quét, phân tích dữ liệu ROS bag và thử nghiệm RF2O/slam_toolbox.','Đã thu thập mẫu quét và dữ liệu hiệu chuẩn; SLAM trên robot hoàn thiện vẫn cần kiểm chứng.','Luôn đối chiếu đồng bộ thời gian, trục tọa độ và odometry trước khi tối ưu SLAM.'],
 'magnetic-levitation-pid': ['Nâng từ đòi hỏi điều khiển lực điện từ liên tục theo vị trí nam châm.','Đo cảm biến Hall, kiểm tra phần công suất và nghiên cứu vòng PID.','Thử nghiệm đọc Hall, INA219, PWM, MATLAB và phương án hồi tiếp.','Đã thực hiện các phép đo và thử nghiệm điều khiển; chưa đưa ra độ ổn định đạt chuẩn.','Phải hiệu chuẩn cảm biến và kiểm tra chiều phản hồi/đường đo dòng trước khi chỉnh PID.'],
 'esp32-smart-home': ['Cần giám sát điều kiện môi trường và điều khiển thiết bị linh hoạt.','Xây dựng logic AUTO/MANUAL, giao tiếp MQTT và hiển thị cục bộ.','Tạo topic lệnh/trạng thái, đọc DHT22 và cảm biến ánh sáng, tích hợp OLED và client MQTT.','Đã xây dựng luồng thử nghiệm truyền/nhận và logic điều khiển.','Phân tách trạng thái hệ thống, ngưỡng và lệnh điều khiển giúp kiểm tra dễ dàng.']
};
window.PORTFOLIO_DEFAULTS.projects.forEach(project => {
 const star = portfolioStarDefaults[project.id];
 if (!star) return;
 ['situationVi','taskVi','actionVi','resultVi','reflectionVi'].forEach((field,index)=>project[field]=star[index]);
 project.evidence = '';
 project.photoUrl = '';
});
// Confirmed geometry from the robot's more recent build.
const mobileRobot = window.PORTFOLIO_DEFAULTS.projects.find(p=>p.id==='ros2-mobile-robot');
if (mobileRobot) {
 mobileRobot.summaryVi = 'Tích hợp ROS 2 Humble trên Jetson Orin Nano Super, RPLIDAR A3M1 và STM32 cho robot Swerve 4 bánh; đo hình học, TF2, RF2O, SLAM và chuẩn bị Nav2.';
 mobileRobot.summaryEn = 'ROS 2 Humble on Jetson Orin Nano Super with RPLIDAR A3M1 and STM32 for a four-wheel Swerve robot, focusing on TF2, RF2O, SLAM experiments and Nav2 preparation.';
 mobileRobot.hardware = ['Khung 700 × 700 mm','Wheelbase 550 mm / Track 550 mm','Bánh r = 35 mm','RPLIDAR A3M1','Jetson Orin Nano Super','STM32'];
 mobileRobot.architecture='RPLIDAR A3M1 → ROS 2 / Jetson → SLAM & Nav2 → (Vx, Vy, W) → STM32 / Swerve';
}
