'use strict';
(() => {
  const STORAGE_KEY = 'autodev_portfolio_content_v1';
  const META_KEY = 'autodev_portfolio_content_meta_v1';
  const GH_KEY = 'autodev_portfolio_github_v1';
  const ADMIN_FLAG = 'autodev_admin_mode_v1';
  const GH_REPO_DEFAULT = 'NDHau25/automation-portfolio-kinetic';
  const PREF_KEY = 'autodev_portfolio_preferences_v1';
  const defaults = window.PORTFOLIO_DEFAULTS;
  if (!defaults) return;
  // Admin mode: the deployed site is read-only. The owner unlocks editing on a browser
  // by visiting ?admin=<PORTFOLIO_ADMIN_KEY> (flag kept in localStorage); a locally
  // served copy is always admin. With PORTFOLIO_OAUTH_CLIENT_ID set, the key only opens
  // a GitHub device-flow login gate — only the repo owner's account unlocks editing.
  // Publishing still requires the GitHub token.
  const adminQuery = new URLSearchParams(location.search);
  const ownerPreview = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
  const ADMIN_KEY = window.PORTFOLIO_ADMIN_KEY || '';
  const OWNER_LOGIN = GH_REPO_DEFAULT.split('/')[0];
  let isAdmin = ownerPreview;
  try { isAdmin = isAdmin || localStorage.getItem(ADMIN_FLAG) === '1'; } catch { /* storage blocked */ }
  if (ADMIN_KEY && adminQuery.get('admin') === ADMIN_KEY) {
    adminQuery.delete('admin');
    const restQuery = adminQuery.toString();
    history.replaceState(null, '', location.pathname + (restQuery ? `?${restQuery}` : '') + location.hash);
    if (!ownerPreview && !isAdmin) {
      // The key only opens the door: editing unlocks after GitHub verifies the
      // token belongs to the repo owner's account (api.github.com is CORS-safe).
      grantAdminViaToken();
    } else {
      try { localStorage.setItem(ADMIN_FLAG, '1'); } catch { /* storage blocked */ }
      isAdmin = true;
    }
  }
  if (isAdmin) document.body.dataset.admin = '1';
  const clone = obj => JSON.parse(JSON.stringify(obj));
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const safeURL = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  const getStorage = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const setStorage = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const validate = obj => obj && typeof obj === 'object' && !Array.isArray(obj) && obj.profile && typeof obj.profile === 'object' && Array.isArray(obj.projects) && Array.isArray(obj.skillGroups);
  const storedDraft = getStorage(STORAGE_KEY);
  const hasLocalDraft = validate(storedDraft);
  let data = hasLocalDraft ? storedDraft : clone(defaults);
  let meta = getStorage(META_KEY) || {};
  // Drafts saved before timestamps existed win until a newer GitHub publish arrives;
  // brand-new visitors keep savedAt = 0 so the published data.json applies.
  if (!Number.isFinite(meta.savedAt)) meta.savedAt = hasLocalDraft ? Date.now() : 0;
  let gh = getStorage(GH_KEY) || {};
  // Migrate existing users' local drafts without overwriting their content.
  if (!data.extras) data.extras = clone(defaults.extras || {});
  else if(defaults.extras) for (const key of Object.keys(defaults.extras)) {
    if (data.extras[key] === undefined) data.extras[key] = clone(defaults.extras[key]);
  }
  const prefs = getStorage(PREF_KEY) || {};
  let language = prefs.language === 'en' ? 'en' : 'vi';
  let theme = prefs.theme === 'light' ? 'light' : 'dark';
  let selectedFilter = 'all';
  let query = '';
  let toastTimer;

  const translations = {
    vi: {
      navAbout:'Giới thiệu',navSkills:'Kỹ năng',navProjects:'Dự án',navJourney:'Hành trình',navContact:'Liên hệ',edit:'Chỉnh sửa',
      heroEyebrow:'AUTOMATION ENGINEER IN THE MAKING',available:'Sẵn sàng kết nối & hợp tác',unavailable:'Đang tập trung vào dự án',
      heroTitle:'Tôi xây dựng<br><em>hệ thống</em><br>biết <span>vận hành.</span>',exploreProjects:'Khám phá dự án',printCV:'Xuất CV / PDF',
      demo:'● MÔ PHỎNG / DEMO',systemOnline:'HỆ THỐNG MÔ PHỎNG',focusArea:'LĨNH VỰC TẬP TRUNG',
      aboutKicker:'ABOUT ME',aboutTitle:'Kỹ thuật là cách tôi<br><span>giải quyết vấn đề.</span>',aboutLead:'Tôi yêu thích việc kết nối phần cứng, thuật toán và phần mềm thành một hệ thống hoàn chỉnh.',whoAmI:'TÔI LÀ AI?',education:'HỌC TẬP',
      focusEmbedded:'Thiết kế và lập trình hệ thống nhúng, đọc cảm biến, điều khiển cơ cấu chấp hành.',focusRobot:'Xây dựng robot, tích hợp LiDAR, ROS 2 và thuật toán điều khiển.',focusIndustrial:'Truyền thông và giám sát dữ liệu giữa thiết bị, HMI và hệ thống công nghiệp.',
      skillsKicker:'TECHNICAL STACK',skillsTitle:'Công cụ tôi dùng để<br><span>biến ý tưởng thành thật.</span>',skillsLead:'Các công nghệ đã học, thực hành và tích hợp trong những đồ án kỹ thuật.',skillsDisclaimer:'Các công nghệ được liệt kê theo trải nghiệm học tập và thực hành, không phải chứng nhận mức độ thành thạo.',
      projectsKicker:'SELECTED WORK',projectsTitle:'Dự án đã làm.<br><span>Bài toán đã giải.</span>',projectsLead:'Mỗi dự án là một cơ hội để học bằng cách chế tạo, thử nghiệm và cải tiến.',clickDetail:'CHỌN THẺ ĐỂ XEM CHI TIẾT ↗',noProjects:'Không tìm thấy dự án',tryFilter:'Hãy thử từ khóa hoặc bộ lọc khác.',clearFilters:'Xóa bộ lọc',
      journeyKicker:'ENGINEERING JOURNEY',journeyTitle:'Học từ những lần<br><span>làm thật.</span>',journeyLead:'Một vài cột mốc trong quá trình học tập, nghiên cứu và triển khai đồ án.',myApproach:'CÁCH TÔI TIẾP CẬN',approachText:'“Một hệ thống tốt không chỉ chạy được — mà còn phải <em>đo được, hiểu được và cải tiến được.</em>”',step1:'PHÂN TÍCH',step2:'THIẾT KẾ',step3:'THỬ NGHIỆM',step4:'TỐI ƯU',
      contactKicker:"LET'S CONNECT",contactTitle:'Có một ý tưởng?<br><span>Cùng bắt đầu.</span>',contactLead:'Tôi luôn sẵn sàng trao đổi về đồ án, cơ hội thực tập, robot, điều khiển và các hệ thống nhúng.',sendMessage:'GỬI LỜI NHẮN',yourName:'HỌ VÀ TÊN *',subject:'CHỦ ĐỀ *',message:'NỘI DUNG *',submitMessage:'Soạn email',formNote:'Dùng ứng dụng email trên thiết bị; không lưu trên máy chủ.',footerText:'Được thiết kế cho hành trình kỹ thuật tự động hóa.',backTop:'VỀ ĐẦU TRANG ↑',
      all:'Tất cả',robotics:'Robotics',embedded:'Embedded / IoT',control:'Điều khiển',industrial:'Công nghiệp',simulation:'Mô phỏng',searchPlaceholder:'Tìm dự án, công nghệ...',detail:'Chi tiết dự án',technologies:'CÔNG NGHỆ',projectCount:'DỰ ÁN',techCount:'CÔNG NGHỆ',skillAreas:'NHÓM KỸ NĂNG',
      implementation:'Những gì đã thực hiện',equipment:'Phần cứng & công cụ',architecture:'Luồng hệ thống',openSource:'Mã nguồn',viewDemo:'Xem demo',noLinks:'Bạn có thể thêm liên kết GitHub và demo trong phần Chỉnh sửa.',
      contactEmail:'EMAIL',contactPhone:'ĐIỆN THOẠI',contactLocation:'ĐỊA ĐIỂM',contactMissing:'Chưa thiết lập email liên hệ. Chọn “Chỉnh sửa” để thêm.',
      invalidContact:'Vui lòng điền đúng họ tên, email, chủ đề và nội dung ít nhất 10 ký tự.',copied:'Đã sao chép nội dung lời nhắn. Hãy bổ sung email nhận trong Chỉnh sửa.',emailReady:'Ứng dụng email đã được gọi. Nếu chưa mở, hãy kiểm tra ứng dụng email mặc định.',copyFailed:'Không sao chép được. Hãy thiết lập email ở phần Chỉnh sửa.',
      saved:'Đã lưu thay đổi trên trình duyệt này.',saveFailed:'Không lưu được, có thể trình duyệt chặn localStorage.',projectDeleted:'Đã xóa dự án.',exported:'Đã xuất dữ liệu JSON.',imported:'Đã nhập dữ liệu thành công.',invalidImport:'Tệp JSON không hợp lệ hoặc thiếu dữ liệu portfolio.',resetDone:'Đã khôi phục dữ liệu mẫu.',confirmDelete:'Xóa dự án này?',confirmReset:'Đặt lại toàn bộ nội dung về dữ liệu mẫu? Những thay đổi chưa xuất sẽ bị mất.',
      timelineFallback:'Dự án thực hành tích hợp phần cứng và phần mềm.',viewProject:'XEM CHI TIẾT',projectLabel:'PROJECT',currentStudent:'Sinh viên Kỹ thuật Tự động hóa',savedCV:'Chọn “In / Save as PDF” trong hộp thoại trình duyệt.',
      syncedFromGitHub:'Đã tải nội dung mới nhất từ GitHub.',publishedGitHub:'Đã lưu lên GitHub ✓. Trang web cập nhật sau ~1 phút.',publishFailed:'Không lưu lên GitHub được — kiểm tra token, repo và quyền Contents.',pulledGitHub:'Đã tải bản lưu từ GitHub vào trang này.',pullEmpty:'Chưa có bản lưu data.json trên GitHub.',pullFailed:'Không tải được data.json từ GitHub.',confirmPullOlder:'Bản lưu trên trình duyệt này mới hơn bản trên GitHub. Tải xuống sẽ mất các thay đổi mới hơn — tiếp tục?'
    },
    en: {
      navAbout:'About',navSkills:'Skills',navProjects:'Projects',navJourney:'Journey',navContact:'Contact',edit:'Edit',
      heroEyebrow:'AUTOMATION ENGINEER IN THE MAKING',available:'Open to connecting & collaborating',unavailable:'Currently focused on projects',
      heroTitle:'I build<br><em>systems</em><br>that <span>work.</span>',exploreProjects:'Explore projects',printCV:'Export CV / PDF',
      demo:'● SIMULATION / DEMO',systemOnline:'SIMULATED SYSTEM',focusArea:'FOCUS AREAS',
      aboutKicker:'ABOUT ME',aboutTitle:'Engineering is how I<br><span>solve problems.</span>',aboutLead:'I love turning hardware, algorithms and software into complete systems.',whoAmI:'WHO AM I?',education:'EDUCATION',
      focusEmbedded:'Designing embedded firmware, sensor interfaces and actuator controls.',focusRobot:'Building robots with LiDAR, ROS 2 and feedback control.',focusIndustrial:'Connecting and monitoring devices, HMIs and industrial networks.',
      skillsKicker:'TECHNICAL STACK',skillsTitle:'Tools I use to<br><span>make ideas real.</span>',skillsLead:'Technologies explored in coursework, experiments and engineering projects.',skillsDisclaimer:'Technologies reflect learning and hands-on experience, not certified proficiency.',
      projectsKicker:'SELECTED WORK',projectsTitle:'Projects built.<br><span>Problems explored.</span>',projectsLead:'Every project is an opportunity to learn by building, testing and refining.',clickDetail:'SELECT A CARD FOR DETAILS ↗',noProjects:'No projects found',tryFilter:'Try another keyword or category.',clearFilters:'Clear filters',
      journeyKicker:'ENGINEERING JOURNEY',journeyTitle:'Learning by<br><span>building.</span>',journeyLead:'Highlights from my engineering coursework and experiments.',myApproach:'MY APPROACH',approachText:'“Good engineering is not just about making it run. It must be <em>measurable, explainable and improvable.</em>”',step1:'ANALYZE',step2:'DESIGN',step3:'TEST',step4:'IMPROVE',
      contactKicker:"LET'S CONNECT",contactTitle:'Got an idea?<br><span>Let’s build.</span>',contactLead:'Happy to discuss engineering projects, internships, robotics, controls and embedded systems.',sendMessage:'SEND A MESSAGE',yourName:'YOUR NAME *',subject:'SUBJECT *',message:'MESSAGE *',submitMessage:'Compose email',formNote:'Opens your email app; no messages are stored on a server.',footerText:'Designed for an automation engineering journey.',backTop:'BACK TO TOP ↑',
      all:'All',robotics:'Robotics',embedded:'Embedded / IoT',control:'Control',industrial:'Industrial',simulation:'Simulation',searchPlaceholder:'Search projects, technologies...',detail:'Project details',technologies:'TECHNOLOGIES',projectCount:'PROJECTS',techCount:'TECHNOLOGIES',skillAreas:'SKILL AREAS',
      implementation:'What I worked on',equipment:'Hardware & tools',architecture:'System architecture',openSource:'Source code',viewDemo:'Watch demo',noLinks:'GitHub and demo links can be added in the editor.',
      contactEmail:'EMAIL',contactPhone:'PHONE',contactLocation:'LOCATION',contactMissing:'Contact email not set. Use “Edit” to add yours.',
      invalidContact:'Please enter your name, valid email, subject and a message of at least 10 characters.',copied:'Message copied. Add a destination email in the editor.',emailReady:'Your mail app was requested. Check your default email client if it did not open.',copyFailed:'Could not copy. Please configure the contact email in Edit.',
      saved:'Changes saved in this browser.',saveFailed:'Could not save. Browser storage may be unavailable.',projectDeleted:'Project deleted.',exported:'JSON backup exported.',imported:'Portfolio data imported.',invalidImport:'Invalid JSON or missing portfolio data.',resetDone:'Sample data restored.',confirmDelete:'Delete this project?',confirmReset:'Reset all data to the sample? Unsaved changes not exported to JSON will be lost.',
      timelineFallback:'Hands-on engineering work combining hardware and software.',viewProject:'VIEW DETAILS',projectLabel:'PROJECT',currentStudent:'Automation Engineering Student',savedCV:'Select “Print / Save as PDF” in your browser dialog.',
      syncedFromGitHub:'Loaded the newest content from GitHub.',publishedGitHub:'Saved to GitHub ✓. The live site updates in ~1 minute.',publishFailed:'Could not save to GitHub — check the token, repo and Contents permission.',pulledGitHub:'Loaded the GitHub backup into this page.',pullEmpty:'No data.json backup on GitHub yet.',pullFailed:'Could not load data.json from GitHub.',confirmPullOlder:'This browser has newer changes than GitHub. Pulling will lose them — continue?'
    }
  };
  if (window.AUTO_EXT?.labels) {
    Object.assign(translations.vi,window.AUTO_EXT.labels.vi);
    Object.assign(translations.en,window.AUTO_EXT.labels.en);
  }
  const tr = key => translations[language][key] || key;
  const local = (obj, stem) => String(obj?.[stem + (language === 'en' ? 'En' : 'Vi')] || obj?.[stem + 'Vi'] || '');
  const status = val => language === 'en' ? ({'Đang phát triển':'In progress','Thử nghiệm':'Experimental','Đồ án học tập':'Course project','Bài thực hành':'Lab exercise','Nguyên mẫu':'Prototype','Mô phỏng học tập':'Simulation study'}[val] || val) : val;
  const categories = ['all','robotics','embedded','control','industrial','simulation'];
  const iconPaths = {
    robot:'<rect x="25" y="28" width="50" height="48" rx="8"/><path d="M50 17v11M43 17h14M25 43H13v18h12M75 43h12v18H75M35 76v8M65 76v8"/><circle cx="40" cy="47" r="3"/><circle cx="60" cy="47" r="3"/><path d="M39 63h22"/>',
    chip:'<rect x="25" y="25" width="50" height="50" rx="6"/><rect x="36" y="36" width="28" height="28" rx="2"/><path d="M35 25V12M50 25V12M65 25V12M35 75v13M50 75v13M65 75v13M25 35H12M25 50H12M25 65H12M75 35h13M75 50h13M75 65h13"/>',
    wave:'<path d="M9 52h14l10-29 15 54 13-39 9 14h21"/><path d="M10 80h80M10 20h80" opacity=".28"/><circle cx="48" cy="77" r="4"/>',
    network:'<rect x="36" y="15" width="28" height="19" rx="4"/><rect x="9" y="66" width="28" height="19" rx="4"/><rect x="63" y="66" width="28" height="19" rx="4"/><path d="M50 34v15M23 66V49h54v17"/><circle cx="50" cy="49" r="3"/>',
    target:'<circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="20"/><circle cx="50" cy="50" r="6"/><path d="M50 6v14M50 80v14M6 50h14M80 50h14"/>',
    factory:'<path d="M15 85V42l24 13V35l25 15V20h17v65Z"/><path d="M21 85h67M27 65h11v10H27ZM48 65h11v10H48ZM69 65h11v10H69Z"/>',
    terminal:'<rect x="14" y="18" width="72" height="64" rx="6"/><path d="m25 35 12 12-12 12M45 62h23"/>'
  };
  const projectIcon = (name = 'chip') => `<svg class="project-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.chip}</svg>`;
  function notify(message) {
    const el = $('#toast'); el.textContent = message; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3200);
  }
  function grantAdminViaToken() {
    $('#gate-owner').textContent = OWNER_LOGIN;
    $('#gate-status').textContent = '';
    $('#gate-token').value = '';
    $('#gate-modal').showModal();
    $('#gate-token').focus();
  }
  async function verifyOwnerToken() {
    const token = $('#gate-token').value.trim();
    const status = $('#gate-status');
    if (!/^[\w-]{20,}$/.test(token)) { status.textContent = '⚠ Token chưa hợp lệ (cần fine-grained token đủ dài).'; return; }
    status.textContent = 'Đang xác minh với GitHub…';
    try {
      const res = await ghRequest('/user', token);
      const user = await res.json().catch(() => ({}));
      if (res.ok && user.login === OWNER_LOGIN) {
        gh = { token, repo: gh.repo || GH_REPO_DEFAULT, branch: gh.branch || 'main' };
        setStorage(GH_KEY, gh);
        try { localStorage.setItem(ADMIN_FLAG, '1'); } catch { /* storage blocked */ }
        isAdmin = true;
        document.body.dataset.admin = '1';
        const exitBtn = $('#exit-admin'); if (exitBtn) exitBtn.hidden = false;
        status.textContent = `✓ Xin chào ${user.login} — đã mở khóa chế độ quản trị.`;
        notify(`Đã mở khóa quản trị với tài khoản GitHub ${user.login}.`);
        setTimeout(() => { const d = $('#gate-modal'); if (d.open) d.close(); }, 1400);
      } else if (res.ok) {
        status.textContent = `✕ Token này thuộc tài khoản “${user.login}” — không phải chủ sở hữu ${OWNER_LOGIN}.`;
      } else {
        status.textContent = `⚠ GitHub từ chối token (HTTP ${res.status}). Kiểm tra lại token.`;
      }
    } catch {
      status.textContent = '⚠ Không kết nối được GitHub. Kiểm tra mạng rồi thử lại.';
    }
  }
  function save() { meta.savedAt = Date.now(); const stored = setStorage(STORAGE_KEY, data) && setStorage(META_KEY, meta); if (!stored) notify(tr('saveFailed')); else notify(tr('saved')); render(); }
  function renderI18n() {
    document.documentElement.lang = language;
    $$('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = tr(el.dataset.i18nHtml); });
    $('#language-toggle').textContent = language === 'vi' ? 'EN' : 'VI';
    $('#project-search').placeholder = tr('searchPlaceholder');
    $('#form-name').placeholder = language === 'vi' ? 'Tên của bạn' : 'Your full name';
    $('#form-subject').placeholder = language === 'vi' ? 'Trao đổi về dự án / hợp tác' : 'Project discussion / collaboration';
    $('#form-message').placeholder = language === 'vi' ? 'Bạn muốn trao đổi về điều gì?' : 'What would you like to discuss?';
  }
  function renderProfile() {
    const p = data.profile;
    const role = local(p,'role');
    $('#hero-summary').textContent = local(p,'bio');
    $('#about-name').textContent = role;
    $('#about-bio').textContent = local(p,'bio');
    $('#school-name').textContent = p.school || (language === 'vi' ? 'Chưa cập nhật trường học' : 'Education not set');
    $('#availability-label').innerHTML = `<span class="status-dot"></span><span>${escapeHTML(p.available ? tr('available') : tr('unavailable'))}</span>`;
    const skills = new Set(data.skillGroups.flatMap(g => Array.isArray(g.skills) ? g.skills : []));
    const metrics = [ [data.projects.length.toString().padStart(2,'0'),tr('projectCount')], [skills.size.toString().padStart(2,'0'),tr('techCount')], [String(data.skillGroups.length).padStart(2,'0'),tr('skillAreas')] ];
    $('#hero-metrics').innerHTML = metrics.map(([n,label]) => `<div class="hero-metric"><strong class="metric-value">${escapeHTML(n)}</strong><small class="metric-label">${escapeHTML(label)}</small></div>`).join('');
    const contactEntries = [
      ['contactEmail',p.email,'<path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/>'],
      ['contactPhone',p.phone,'<path d="M22 16.6v3a2 2 0 0 1-2.1 2A19 19 0 0 1 2.4 4.1 2 2 0 0 1 4.4 2h3a2 2 0 0 1 2 1.7l.4 3a2 2 0 0 1-.6 1.7L7.5 10a15 15 0 0 0 6.5 6.5l1.6-1.7a2 2 0 0 1 1.7-.6l3 .4a2 2 0 0 1 1.7 2z"/>'],
      ['contactLocation',p.location,'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.7"/>']
    ].filter(([_, v]) => !!v);
    $('#contact-info').innerHTML = contactEntries.map(([key, val, path]) => `<div class="contact-info-item"><span class="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">${path}</svg></span><span class="contact-info-text"><span>${escapeHTML(tr(key))}</span>${escapeHTML(val)}</span></div>`).join('') + (!p.email ? `<p style="font-size:10px;color:var(--muted)">${escapeHTML(tr('contactMissing'))}</p>` : '');
    const socials = [['GitHub',p.github],['LinkedIn',p.linkedin],['Website',p.website],['Facebook',p.facebook],['YouTube',p.youtube],['Zalo',p.zalo],['TikTok',p.tiktok],['Instagram',p.instagram]];
    $('#social-links').innerHTML = socials.filter(([,url])=>safeURL(url)).map(([label,url])=> `<a class="social-link" href="${escapeHTML(safeURL(url))}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('');
    document.title = `${p.name || 'Portfolio'} | Automation Engineering`;
    $('meta[name=description]').content = (local(p,'bio') || 'Automation Engineering Portfolio').slice(0,160);
  }
  function renderSkills() {
    $('#skills-grid').innerHTML = data.skillGroups.map((g,i) => `<article class="skill-card"><div class="skill-card-head"><span class="skill-symbol">${projectIcon(g.icon || 'chip').replace('class="project-symbol"','')}</span><span class="skill-counter">0${i+1} / 0${data.skillGroups.length}</span></div><h3>${escapeHTML(local(g,'name'))}</h3><div class="skill-items">${(g.skills || []).map(skill=>`<span class="skill-pill">${escapeHTML(skill)}</span>`).join('')}</div></article>`).join('');
  }
  function renderFilters() {
    $('#filters').innerHTML = categories.map(key=>`<button type="button" class="filter-btn ${selectedFilter===key?'active':''}" data-filter="${key}" aria-pressed="${selectedFilter===key}">${escapeHTML(tr(key))}</button>`).join('');
  }
  function renderProjects() {
    const list = data.projects.filter(p => {
      const passesFilter = selectedFilter === 'all' || p.category === selectedFilter;
      const haystack = [p.titleVi,p.titleEn,p.summaryVi,p.summaryEn,p.status,p.category,...(p.tags||[])].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
      const needle = query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
      return passesFilter && haystack.includes(needle);
    });
    list.sort((a,b) => Number(!!b.featured)-Number(!!a.featured));
    $('#project-counter').textContent = `${String(list.length).padStart(2,'0')} / ${String(data.projects.length).padStart(2,'0')} PROJECTS`;
    $('#empty-state').hidden = list.length > 0;
    $('#projects-grid').innerHTML = list.map((p,i) => `<article class="project-card" data-category="${escapeHTML(p.category)}" data-project-card-id="${escapeHTML(p.id)}"><div class="project-visual">${projectIcon(p.visual)}<span class="project-visual-label">${escapeHTML(p.id.toUpperCase().replaceAll('-','_').slice(0,29))}</span><span class="project-visual-period">${escapeHTML(p.period)}</span></div><div class="project-card-body"><div class="project-topline"><span>0${i+1} / ${escapeHTML(tr(p.category).toUpperCase())}</span><span class="status-tag">${escapeHTML(status(p.status || ''))}</span></div><h3>${escapeHTML(local(p,'title'))}</h3><p class="project-summary">${escapeHTML(local(p,'summary'))}</p><div class="tag-row">${(p.tags||[]).slice(0,4).map(tag=>`<span class="tech-tag">${escapeHTML(tag)}</span>`).join('')}</div><div class="project-card-footer"><span>↗ ${escapeHTML(tr('projectLabel'))} DETAILS</span><button class="view-project" type="button" data-project-id="${escapeHTML(p.id)}" aria-label="${escapeHTML(tr('viewProject')+': '+local(p,'title'))}">${escapeHTML(tr('viewProject'))} ↗</button></div></div></article>`).join('');
  }
  function renderJourney() {
    const selected = [...data.projects].slice(0,4);
    $('#timeline').innerHTML = selected.map(p=>`<div class="timeline-item"><span class="timeline-year">${escapeHTML(p.period||'—')}</span><h3>${escapeHTML(local(p,'title'))}</h3><p>${escapeHTML(local(p,'summary')||tr('timelineFallback'))}</p></div>`).join('');
  }
  function render() { renderI18n();renderProfile();renderSkills();renderFilters();renderProjects();renderJourney();window.AUTO_EXT?.render({data,language,escapeHTML,safeURL,local}); }
  function openProject(id) {
    const p = data.projects.find(p=>p.id===id); if (!p) return;
    const urls = [['openSource',p.github],['viewDemo',p.demo]].filter(([,u])=>safeURL(u));
    $('#project-modal-content').innerHTML = `<div class="modal-banner">${projectIcon(p.visual)}<div class="modal-banner-copy"><small>${escapeHTML(tr(p.category).toUpperCase())} / ${escapeHTML(p.period)} / ${escapeHTML(status(p.status))}</small><h2 id="modal-title">${escapeHTML(local(p,'title'))}</h2></div></div><p class="modal-description">${escapeHTML(local(p,'summary'))}</p><div class="modal-meta">${(p.tags||[]).map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div><div class="modal-section"><h3>${escapeHTML(tr('implementation'))}</h3><ul>${(language==='en' && p.tasksEn?.length?p.tasksEn:p.tasksVi||[]).map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul></div><div class="modal-section"><h3>${escapeHTML(tr('equipment'))}</h3><p>${escapeHTML((p.hardware||[]).join(' · '))}</p></div><div class="modal-section"><h3>${escapeHTML(tr('architecture'))}</h3><div class="modal-architecture">${escapeHTML(p.architecture||'—')}</div></div>${urls.length?`<div class="modal-actions">${urls.map(([label,url])=>`<a class="btn btn-secondary" href="${escapeHTML(safeURL(url))}" target="_blank" rel="noopener noreferrer">${escapeHTML(tr(label))} ↗</a>`).join('')}</div>`:`<p style="color:var(--muted);font-size:11px;margin-top:25px">${escapeHTML(tr('noLinks'))}</p>`}`;
    $('#project-modal-content').insertAdjacentHTML('beforeend',window.AUTO_EXT?.projectSTAR({project:p,language})||'');
    $('#project-modal').showModal();
  }
  function initDialogs() {
    $$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>$('#'+btn.dataset.close)?.close()));
    $$('.modal').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();}));
  }
  function persistPreferences() { setStorage(PREF_KEY,{language,theme}); }
  function initNav() {
    document.body.dataset.theme = theme;
    $('#theme-toggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';document.body.dataset.theme=theme;persistPreferences();});
    $('#language-toggle').addEventListener('click',()=>{language=language==='vi'?'en':'vi';persistPreferences();render();});
    $('#menu-toggle').addEventListener('click',()=>{const isOpen=$('#nav-links').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(isOpen));});
    $$('#nav-links a').forEach(a=>a.addEventListener('click',()=>{$('#nav-links').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}));
    $('#back-to-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    window.addEventListener('scroll',()=>$('#back-to-top').classList.toggle('visible',window.scrollY>500),{passive:true});
    if('IntersectionObserver' in window){const ob=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){$$('#nav-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}}),{rootMargin:'-27% 0px -65% 0px'});$$('main section[id]').forEach(s=>ob.observe(s));}
    const updateClock=()=>{$('#clock-label').textContent = new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'});};updateClock();setInterval(updateClock,60000);
    $('#footer-year').textContent=`© ${new Date().getFullYear()} AUTO.DEV`;
  }
  function initProjects() {
    $('#filters').addEventListener('click',event=>{const btn=event.target.closest('[data-filter]');if(!btn)return;selectedFilter=btn.dataset.filter;renderFilters();renderProjects();});
    $('#project-search').addEventListener('input',event=>{query=event.target.value;renderProjects();});
    $('#projects-grid').addEventListener('click',event=>{const button=event.target.closest('[data-project-id]');const card=event.target.closest('[data-project-card-id]');if(button||card)openProject(button?.dataset.projectId||card?.dataset.projectCardId);});
    $('#reset-filter').addEventListener('click',()=>{selectedFilter='all';query='';$('#project-search').value='';renderFilters();renderProjects();});
    document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!$$('dialog[open]').length){event.preventDefault();$('#project-search').focus();}if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#project-search').focus();}});
  }
  async function copyText(str) {
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(str);return true;}}catch{}
    try{const t=document.createElement('textarea');t.value=str;t.style.position='fixed';t.style.left='-9999px';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return ok;}catch{return false;}
  }
  function initContact() {
    $('#contact-form').addEventListener('submit',async event=>{
      event.preventDefault(); const form=event.currentTarget;
      if(!form.checkValidity()){form.reportValidity();$('#form-feedback').textContent=tr('invalidContact');return;}
      const name=$('#form-name').value.trim(),sender=$('#form-email').value.trim(),subject=$('#form-subject').value.trim(),message=$('#form-message').value.trim();
      if(message.length<10||name.length<2){$('#form-feedback').textContent=tr('invalidContact');return;}
      const body=`${message}\n\n---\nFrom: ${name}\nEmail: ${sender}\nSent via Automation Engineering Portfolio`;
      if(data.profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.profile.email)){
        const url=`mailto:${encodeURIComponent(data.profile.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // mailto opens the visitor's configured email client. It does not silently send anything.
        window.location.href=url;
        $('#form-feedback').textContent=tr('emailReady');
      }else{
        const success=await copyText(`To: [your email]\nSubject: ${subject}\n\n${body}`);
        $('#form-feedback').textContent=tr(success?'copied':'copyFailed');
      }
    });
  }
  function fillProfileEditor(){const form=$('#profile-form');const p=data.profile;['name','roleVi','roleEn','school','email','phone','location','github','linkedin','website','facebook','youtube','zalo','tiktok','instagram','bioVi','bioEn'].forEach(key=>{form.elements.namedItem(key).value=p[key]??'';});form.elements.namedItem('available').checked=!!p.available;}
  function renderEditorProjectList(){
    $('#editor-project-list').innerHTML=data.projects.map(p=>`<div class="editor-list-row"><div><strong>${escapeHTML(p.titleVi||p.titleEn)}</strong><span>${escapeHTML(p.period)} · ${escapeHTML(tr(p.category))}</span></div><div class="editor-row-actions"><button type="button" data-edit-project="${escapeHTML(p.id)}">Sửa</button><button type="button" class="danger" data-delete-project="${escapeHTML(p.id)}">Xóa</button></div></div>`).join('') || '<p>Chưa có dự án nào.</p>';
  }
  function fillSkillsEditor(){
    $('#skills-editor-fields').innerHTML=data.skillGroups.map((g,i)=>`<label class="wide">${escapeHTML(local(g,'name'))}<textarea rows="3" data-skill-index="${i}">${escapeHTML((g.skills||[]).join(', '))}</textarea></label>`).join('');
  }
  function showEditorTab(tab){$$('.editor-tab').forEach(b=>b.classList.toggle('active',b.dataset.editorTab===tab));$$('.editor-panel').forEach(p=>p.hidden=p.id!==`editor-${tab}`);if(tab==='profile')fillProfileEditor();if(tab==='projects')renderEditorProjectList();if(tab==='skills')fillSkillsEditor();if(tab==='data')fillGitHubSync();}
  function projectIdForNew(){return `project-${Date.now().toString(36)}`;}
  const projectKeys=['titleVi','titleEn','period','status','category','visual','summaryVi','summaryEn','architecture','github','demo','situationVi','taskVi','actionVi','resultVi','reflectionVi','evidence','photoUrl'];
  function openProjectEditor(project){
    const form=$('#project-editor-form');form.reset();
    form.elements.namedItem('id').value=project?.id||'';
    projectKeys.forEach(key=>{form.elements.namedItem(key).value=project?.[key]||((key==='category')?'robotics':((key==='visual')?'robot':''));});
    ['tags','hardware'].forEach(key=>form.elements.namedItem(key).value=(project?.[key]||[]).join(', '));
    ['tasksVi','tasksEn'].forEach(key=>form.elements.namedItem(key).value=(project?.[key]||[]).join('\n'));
    form.elements.namedItem('featured').checked=project?.featured??true;
    $('#project-editor-title').textContent=project?(language==='vi'?'Sửa dự án':'Edit project'):(language==='vi'?'Thêm dự án':'New project');
    $('#project-editor-modal').showModal();
  }
  function initEditor(){
    $('#open-editor').addEventListener('click',()=>{showEditorTab('profile');$('#editor-modal').showModal();});
    $$('.editor-tab').forEach(btn=>btn.addEventListener('click',()=>showEditorTab(btn.dataset.editorTab)));
    if (isAdmin) $('#exit-admin').hidden = false;
    $('#exit-admin').addEventListener('click',()=>{
      try { localStorage.removeItem(ADMIN_FLAG); } catch { /* storage blocked */ }
      delete document.body.dataset.admin;
      $('#editor-modal').close();
      notify('Đã thoát chế độ quản trị. Dùng link bí mật ?admin=… để mở lại.');
    });
    $('#gate-verify').addEventListener('click', verifyOwnerToken);
    $('#gate-token').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); verifyOwnerToken(); } });
    $('#profile-form').addEventListener('submit',event=>{
      event.preventDefault();const form=event.currentTarget;
      ['name','roleVi','roleEn','school','email','phone','location','github','linkedin','website','facebook','youtube','zalo','tiktok','instagram','bioVi','bioEn'].forEach(key=>data.profile[key]=form.elements.namedItem(key).value.trim());
      data.profile.available=form.elements.namedItem('available').checked;
      save();
    });
    $('#skills-form').addEventListener('submit',event=>{
      event.preventDefault();$$('[data-skill-index]').forEach(input=>{data.skillGroups[Number(input.dataset.skillIndex)].skills=input.value.split(',').map(t=>t.trim()).filter(Boolean);});save();
    });
    $('#add-project').addEventListener('click',()=>openProjectEditor(null));
    $('#editor-project-list').addEventListener('click',event=>{
      const e=event.target.closest('[data-edit-project]'),d=event.target.closest('[data-delete-project]');
      if(e){openProjectEditor(data.projects.find(p=>p.id===e.dataset.editProject));}
      if(d&&confirm(tr('confirmDelete'))){data.projects=data.projects.filter(p=>p.id!==d.dataset.deleteProject);save();renderEditorProjectList();notify(tr('projectDeleted'));}
    });
    $('#project-editor-form').addEventListener('submit',event=>{
      event.preventDefault();const form=event.currentTarget;
      const id=form.elements.namedItem('id').value||projectIdForNew();
      const current=data.projects.find(p=>p.id===id) || {};
      const p={...current,id};
      projectKeys.forEach(key=>p[key]=form.elements.namedItem(key).value.trim());
      ['tags','hardware'].forEach(key=>p[key]=form.elements.namedItem(key).value.split(',').map(s=>s.trim()).filter(Boolean));
      ['tasksVi','tasksEn'].forEach(key=>p[key]=form.elements.namedItem(key).value.split('\n').map(s=>s.trim()).filter(Boolean));
      p.featured=form.elements.namedItem('featured').checked;
      const index=data.projects.findIndex(p=>p.id===id);if(index===-1)data.projects.unshift(p);else data.projects[index]=p;
      save();renderEditorProjectList();$('#project-editor-modal').close();
    });
    $('#export-json').addEventListener('click',()=>{
      const body=JSON.stringify(data,null,2); const blob=new Blob([body],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download='automation-portfolio-data.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify(tr('exported'));
    });
    $('#export-data-js').addEventListener('click',()=>{
      const content='/* Portfolio configuration generated by AUTO.DEV editor */\nwindow.PORTFOLIO_DEFAULTS = '+JSON.stringify(data,null,2)+';\n';
      const blob=new Blob([content],{type:'text/javascript;charset=utf-8'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download='data.js';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify(tr('exported'));
    });
    $('#import-json').addEventListener('change',async event=>{
      const file=event.target.files[0];if(!file)return;
      try{const parsed=JSON.parse(await file.text());if(!validate(parsed))throw Error('schema');if(!parsed.extras)parsed.extras=clone(defaults.extras||{});else for(const key of Object.keys(defaults.extras||{})){if(parsed.extras[key]===undefined)parsed.extras[key]=clone(defaults.extras[key]);}data=parsed;save();showEditorTab('data');notify(tr('imported'));}
      catch{notify(tr('invalidImport'));}
      event.target.value='';
    });
    $('#reset-data').addEventListener('click',()=>{if(confirm(tr('confirmReset'))){data=clone(defaults);save();showEditorTab('data');notify(tr('resetDone'));}});
  }
  function fillGitHubSync(){
    $('#gh-token').value = gh.token || '';
    $('#gh-repo').value = gh.repo || GH_REPO_DEFAULT;
    $('#gh-branch').value = gh.branch || 'main';
    $('#gh-status').textContent = gh.lastPublish ? `Bản lưu gần nhất trên GitHub: ${new Date(gh.lastPublish).toLocaleString('vi-VN')}` : 'Chưa lưu lên GitHub lần nào.';
  }
  const utf8ToBase64 = str => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(binary);
  };
  async function ghRequest(path, token, options = {}) {
    return fetch(`https://api.github.com${path}`, { ...options, headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) } });
  }
  async function fetchRemoteData(repo, branch, token) {
    // Token holders read through the Contents API: always fresh, no CDN lag.
    if (token) {
      try {
        const res = await ghRequest(`/repos/${repo}/contents/data.json?ref=${encodeURIComponent(branch)}`, token);
        if (res.ok) {
          const json = await res.json();
          const decoded = new TextDecoder().decode(Uint8Array.from(atob(json.content.replace(/\n/g, '')), c => c.charCodeAt(0)));
          return JSON.parse(decoded);
        }
        if (res.status === 404) return null;
      } catch { /* fall back to raw below */ }
    }
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/${encodeURIComponent(branch)}/data.json?ts=${Date.now()}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    if (!res.ok) throw Error(`HTTP ${res.status}`);
    return res.json();
  }
  function applyRemoteData(remote) {
    if (!validate(remote?.content)) throw Error('schema');
    data = remote.content;
    if (!data.extras) data.extras = clone(defaults.extras || {});
    else if (defaults.extras) for (const key of Object.keys(defaults.extras)) { if (data.extras[key] === undefined) data.extras[key] = clone(defaults.extras[key]); }
    meta.savedAt = remote.savedAt || 0;
    setStorage(STORAGE_KEY, data);
    setStorage(META_KEY, meta);
    render();
  }
  function readGitHubForm() {
    return {
      token: $('#gh-token').value.trim(),
      repo: ($('#gh-repo').value.trim() || GH_REPO_DEFAULT).replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/\/+$/, ''),
      branch: $('#gh-branch').value.trim() || 'main'
    };
  }
  async function publishToGitHub() {
    const { token, repo, branch } = readGitHubForm();
    const status = $('#gh-status');
    const publishBtn = $('#gh-publish');
    if (!/^[\w-]{20,}$/.test(token)) { status.textContent = '⚠ Token chưa hợp lệ. Cần fine-grained token với quyền Contents: Read and write cho repo này.'; return; }
    status.textContent = 'Đang lưu lên GitHub…';
    publishBtn.disabled = true;
    try {
      const savedAt = Date.now();
      const payload = JSON.stringify({ savedAt, content: data }, null, 2);
      for (let attempt = 0; attempt < 2; attempt++) {
        let sha;
        const head = await ghRequest(`/repos/${repo}/contents/data.json?ref=${encodeURIComponent(branch)}`, token);
        const headJson = await head.json().catch(() => null);
        if (head.ok) sha = headJson.sha;
        else if (head.status !== 404) throw Error(headJson?.message || `HTTP ${head.status}`);
        const body = { message: 'Update portfolio content from web editor', branch, content: utf8ToBase64(payload) };
        if (sha) body.sha = sha;
        const put = await ghRequest(`/repos/${repo}/contents/data.json`, token, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        if (put.ok) break;
        if (put.status === 409 && attempt === 0) continue; // data.json moved meanwhile; retry with the fresh sha
        const putJson = await put.json().catch(() => null);
        throw Error(putJson?.message || `HTTP ${put.status}`);
      }
      meta.savedAt = savedAt;
      gh = { token, repo, branch, lastPublish: savedAt };
      setStorage(META_KEY, meta);
      setStorage(GH_KEY, gh);
      status.textContent = `✓ Đã lưu lên GitHub lúc ${new Date(savedAt).toLocaleTimeString('vi-VN')} — trang web cập nhật sau ~1 phút.`;
      notify(tr('publishedGitHub'));
    } catch (err) {
      status.textContent = `⚠ ${err.message || 'Lỗi mạng'} — kiểm tra token, repo và quyền Contents (Read and write).`;
      notify(tr('publishFailed'));
    } finally {
      publishBtn.disabled = false;
    }
  }
  async function pullFromGitHub() {
    const { token, repo, branch } = readGitHubForm();
    const status = $('#gh-status');
    status.textContent = 'Đang tải bản lưu từ GitHub…';
    try {
      const remote = await fetchRemoteData(repo, branch, token);
      if (!remote) { status.textContent = `Chưa có data.json trong ${repo}@${branch}. Hãy bấm “Lưu lên GitHub” trước.`; notify(tr('pullEmpty')); return; }
      if ((meta.savedAt || 0) > (remote.savedAt || 0) && !confirm(tr('confirmPullOlder'))) { status.textContent = 'Đã hủy tải xuống.'; return; }
      applyRemoteData(remote);
      status.textContent = `✓ Đã tải bản lưu ${new Date(remote.savedAt || Date.now()).toLocaleString('vi-VN')} vào trang.`;
      notify(tr('pulledGitHub'));
    } catch {
      status.textContent = '⚠ Không tải được data.json từ GitHub.';
      notify(tr('pullFailed'));
    }
  }
  function initGitHubSync() {
    $('#gh-publish').addEventListener('click', publishToGitHub);
    $('#gh-pull').addEventListener('click', pullFromGitHub);
    $('#gh-forget').addEventListener('click', () => {
      gh = { repo: gh.repo, branch: gh.branch };
      setStorage(GH_KEY, gh);
      $('#gh-token').value = '';
      $('#gh-status').textContent = 'Đã xóa token khỏi trình duyệt này.';
    });
    // Pull the published data.json on load so every device starts from the newest content.
    (async () => {
      try {
        const remote = await fetchRemoteData(gh.repo || GH_REPO_DEFAULT, gh.branch || 'main', gh.token);
        if (remote && Number(remote.savedAt || 0) > (meta.savedAt || 0)) { applyRemoteData(remote); notify(tr('syncedFromGitHub')); }
      } catch { /* offline or rate-limited: the local copy still renders */ }
    })();
  }
  function renderCV(){
    const paper=window.AUTO_EXT?.createCV({data,language,preview:false});
    if (paper) {$('#cv-sheet').innerHTML=paper;return;}
    $('#cv-sheet').textContent=local(data.profile,'bio');
  }
  $('#hero-cv').addEventListener('click',()=>{renderCV();notify(tr('savedCV'));window.print();});
  initNav();initProjects();initDialogs();initContact();initEditor();initGitHubSync();
  window.AUTO_EXT?.init({getData:()=>data,getLanguage:()=>language,save,notify,renderCV,openProject});
  render();
})();
