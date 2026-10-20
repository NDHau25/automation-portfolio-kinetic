/* Edit the defaults below to personalize the deployed website.
   Visitors' editor changes are stored only in that browser's localStorage. */
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
    website: '',
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
