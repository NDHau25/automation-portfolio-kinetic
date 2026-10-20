# AUTO.DEV — Portfolio sinh viên Kỹ thuật Tự động hóa

Website portfolio **responsive, hoạt động offline**, không cần React, Node.js hay máy chủ backend. Bộ code dùng HTML, CSS và JavaScript thuần.

## Cách chạy

1. Giải nén thư mục `automation-portfolio`.
2. Mở `index.html` bằng Chrome, Edge hoặc Firefox.
3. Chọn **Chỉnh sửa** trên thanh điều hướng để thay tên, thông tin liên hệ, kỹ năng và danh sách dự án.
4. Chọn **Xuất CV / PDF**, sau đó chọn máy in **Save as PDF / Lưu thành PDF** trong hộp thoại của trình duyệt.

Nếu muốn chạy trên localhost:

```bash
cd automation-portfolio
python -m http.server 8080
```

Mở `http://localhost:8080`.

## Những tính năng đã có

- Giao diện desktop/tablet/mobile với menu di động và hỗ trợ keyboard, reduced-motion.
- Chế độ tối / sáng; chuyển đổi tiếng Việt / tiếng Anh.
- Dự án tự động hóa mẫu: ROS 2, STM32, ESP32/MQTT, nâng từ PID, Modbus RTU/TCP, Unity/Arduino, Plant Simulation.
- Lọc dự án theo lĩnh vực và tìm kiếm không dấu theo tên/công nghệ (`/` hoặc Ctrl+K để tìm).
- Popup xem công nghệ, phần cứng, việc đã thực hiện và kiến trúc từng dự án.
- Trình chỉnh sửa hồ sơ, thêm/sửa/xóa dự án, chỉnh sửa kỹ năng; lưu trên **localStorage** của trình duyệt.
- Sao lưu và phục hồi dữ liệu JSON, tải `data.js` đã chỉnh sửa để deploy; khôi phục dữ liệu mẫu.
- Xuất CV gọn dạng A4 bằng chức năng in của trình duyệt (Save as PDF).
- Biểu mẫu liên hệ có kiểm tra thông tin: mở trình soạn **email mặc định** nếu đã cấu hình địa chỉ nhận; nếu chưa có địa chỉ nhận thì sao chép nội dung để tránh gửi nhầm.
- Liên kết GitHub / LinkedIn / Website; nút trở về đầu trang, hỗ trợ nội dung meta cơ bản.
- Radar robot trong hero là **minh họa mô phỏng, không phải kết nối thiết bị thật**.
- Không yêu cầu CDN, font hoặc tài khoản bên thứ ba.

## Cá nhân hóa để đăng lên internet

**Bước 1.** Mở `data.js` và sửa `window.PORTFOLIO_DEFAULTS.profile` với các thông tin thật (tên, trường, email, GitHub...). Các dự án mẫu là phần phác thảo từ các đề tài đã học / thử nghiệm; hãy kiểm tra mô tả, trạng thái và kết quả trước khi đưa lên hồ sơ tuyển dụng.

**Bước 2.** Bổ sung liên kết mã nguồn / video vào từng dự án tại `github` và `demo` (đường dẫn HTTPS).

**Bước 3.** Đưa thư mục lên GitHub Pages / Netlify / Vercel dưới dạng site tĩnh.

**Lưu ý quan trọng về trình chỉnh sửa:** không có cơ sở dữ liệu hay đăng nhập. Những thay đổi qua nút **Chỉnh sửa** chỉ được lưu trong *trình duyệt đang dùng*, không thay đổi file `data.js` trên server và không cập nhật website cho khách truy cập khác. Muốn cập nhật site công khai, hãy dùng nút **Xuất data.js**, thay tệp `data.js` cũ trong thư mục website và deploy lại (hoặc tự sửa `data.js` bằng VS Code). Có thể dùng chức năng Xuất JSON để sao lưu hoặc chuyển dữ liệu giữa các trình duyệt, sau đó nhập JSON ở nơi cần dùng. Không nhập JSON từ nguồn không tin cậy.

**Biểu mẫu liên hệ:** website tĩnh **không tự gửi email** và không có email backend; `mailto:` mở ứng dụng email của khách, để họ tự bấm Gửi. Nếu cần gửi thẳng và lưu lịch sử tin nhắn, bạn sẽ cần backend hoặc dịch vụ form như Formspree/EmailJS, đồng thời thiết lập chống spam và bảo vệ dữ liệu.

## Cấu trúc thư mục

```text
automation-portfolio/
├── index.html              # Thành phần và cấu trúc trang
├── styles.css              # Giao diện và bản in CV
├── motion.css              # Hiệu ứng chuyển động và robot tí hon
├── data.js                 # Thông tin và dự án mẫu (cấu hình public)
├── app.js                  # Logic i18n, tìm kiếm, editor, liên hệ, CV
├── motion.js               # Tuyến di chuyển, tương tác và bật/tắt hiệu ứng
├── assets/
│   └── favicon.svg
└── README.md
```

## Quyền riêng tư

Mọi thông tin mặc định đều là dữ liệu công khai nếu deploy website. **Không thêm dữ liệu nhạy cảm, mã truy cập, mật khẩu hoặc API key** vào `data.js` hay mã nguồn. Để đơn giản và bảo mật, trang không có bộ đếm truy cập, analytics hoặc script theo dõi bên ngoài.

## Animation tùy chỉnh — Kinetic Engineering Edition

Bản này bổ sung hai tệp **`motion.css`** và **`motion.js`** (được liên kết ở `index.html`) để tạo chuyển động hoàn toàn offline:

- **T-01 Rover:** robot tí hon đi bộ theo đường trạm bên trái, bước chân khi cuộn và bật nhảy nhẹ khi nghỉ.
- **T-02 Hopper:** robot thỏ máy nhảy hai nhịp bên phải, theo từng khu vực.
- **D-03 Scout:** drone nhỏ bay nhẹ theo tuyến bên phải (ẩn trên màn hình nhỏ để nội dung dễ đọc).
- Đường mạch chấm mờ kết nối các khu (hero → giới thiệu → kỹ năng → dự án → hành trình → liên hệ), tự đo lại vị trí khi chiều cao trang thay đổi.
- Hiệu ứng xuất hiện khi cuộn trang, quét tín hiệu trong mô phỏng radar, card di chuyển và quét đường viền rất nhẹ khi hover.
- **Nút `Robot · BẬT/TẮT` ở góc trái dưới** cho phép dừng/bật toàn bộ lớp hiệu ứng. Tùy chọn được giữ bằng `localStorage` trên trình duyệt hiện tại.

**Chống gây chói / say chuyển động:** Không sử dụng chớp sáng nhanh hoặc đổi màu liên tục; giảm hiệu ứng trên màn hình nhỏ; nếu hệ điều hành bật **Reduce Motion / Giảm chuyển động** thì lớp robot sẽ bị ẩn và điều khiển hiệu ứng sẽ khóa để tôn trọng tùy chọn hệ thống. Khi in CV/PDF, không có robot hay hiệu ứng xuất hiện.

### Tùy chỉnh nhanh

- Màu chủ đạo: biến `--accent`, `--gold` trong `styles.css`.
- Tốc độ và độ nhảy: `@keyframes mini-hop`, `mini-double-hop`, `mini-loiter`, `drone-scout` trong `motion.css`.
- Số lượng, hình dáng và đường đi của bot: chỉnh các SVG `rover`, `hopper`, `drone` và các hàm `layout()`/`position()` trong `motion.js`.
- Để loại bỏ toàn bộ nâng cấp animation, xóa hai dòng tham chiếu `motion.css` và `motion.js` trong `index.html`; mọi tính năng portfolio gốc vẫn chạy bình thường.
