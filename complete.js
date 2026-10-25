/* Course-aligned E-Portfolio and CV features. Pure client-side, fully offline. */
'use strict';
window.AUTO_EXT = (() => {
  const labels = {
    vi: {
      extraEduNav:'Hồ sơ',extraReflectionNav:'Trải nghiệm',extraEvidenceNav:'Minh chứng',extraCVNav:'CV',
      extraGoalsKicker:'PERSONAL VISION',extraGoalsTitle:'Mục tiêu rõ ràng.<br><span>Hành động có hướng đi.</span>',extraGoalsLead:'Mục tiêu cuộc đời, định hướng nghề nghiệp ngắn hạn và hành trình 3–5 năm.',
      extraEducationKicker:'EDUCATION & LEARNING',extraEducationTitle:'Học tập, rèn luyện.<br><span>Tiến bộ có minh chứng.</span>',extraEducationLead:'Học vấn, khóa học, chứng chỉ và các kỹ năng làm việc nhóm.',extraEducationHeading:'Quá trình học tập',extraCoursesHeading:'Khóa học / Học phần',extraCertHeading:'Chứng chỉ & đào tạo',extraSoftHeading:'Kỹ năng mềm',
      extraExperienceKicker:'EXPERIENCE',extraExperienceTitle:'Kinh nghiệm làm việc.<br><span>Việc tôi đã thực hiện.</span>',extraExperienceLead:'Thực tập, công việc hoặc kinh nghiệm thực tế. Không tự tạo thành tích.',
      extraReflectionKicker:'LEARNING WORKSPACE',extraReflectionTitle:'Không chỉ làm xong.<br><span>Còn nhìn lại để tốt hơn.</span>',extraReflectionLead:'Bài cảm nhận sau khi làm đồ án: trải nghiệm, bài học và hướng cải tiến.',extraSTARHint:'S – Bối cảnh · T – Nhiệm vụ · A – Hành động · R – Kết quả · T – Bài học và phát triển',
      extraActivitiesKicker:'BEYOND CLASSROOM',extraActivitiesTitle:'Hoạt động & thành tích.<br><span>Con người phía sau kỹ thuật.</span>',extraActivitiesLead:'Ngoại khóa, giải thưởng, học bổng và sở thích liên quan đến chuyên môn.',extraActivitiesHeading:'Hoạt động ngoại khóa',extraAwardsHeading:'Giải thưởng / Học bổng',extraHobbiesHeading:'Sở thích',
      extraEvidenceKicker:'EVIDENCE LIBRARY',extraEvidenceTitle:'Hình ảnh, báo cáo.<br><span>Minh chứng cho công việc.</span>',extraEvidenceLead:'Bộ sưu tập tài liệu, hình ảnh, video và đường dẫn sản phẩm.',
      extraCVKicker:'CURRICULUM VITAE',extraCVTitle:'Hồ sơ ứng tuyển.<br><span>Rõ ràng, ngắn gọn.</span>',extraCVLead:'CV dành cho sinh viên kỹ thuật: thông tin cá nhân, mục tiêu, học vấn, kỹ năng, kinh nghiệm và dự án.',
      extraCVChecklistHeading:'TIẾN ĐỘ HOÀN THIỆN CV',extraCVPrint:'In / Lưu CV dạng PDF ↓',extraCVEdit:'Chỉnh sửa nội dung',extraCVNote:'Mẫu CV A4, tối ưu khoảng 1–2 trang. Kiểm tra thông tin và kết quả thực tế trước khi gửi.',
      notUpdated:'Chưa cập nhật',example:'Nội dung gợi ý — cần xác nhận',sample:'Minh họa nội dung, chưa có tệp đính kèm',viewEvidence:'Mở minh chứng ↗',careerLife:'Mục tiêu cuộc đời',careerShort:'Mục tiêu ngắn hạn',careerLong:'Định hướng 3–5 năm',
      reflectionContext:'Bối cảnh',reflectionAction:'Việc đã làm',reflectionLesson:'Bài học',reflectionNext:'Bước tiếp theo',
      cName:'Họ tên chính xác',cContact:'Email và số điện thoại',cSchool:'Tên trường & niên khóa',cObjective:'Mục tiêu nghề nghiệp',cSkills:'Kỹ năng chuyên môn',cProjects:'Dự án có mô tả',cEvidence:'Minh chứng dự án',cSTAR:'Kết quả theo STAR',
      cvObjective:'MỤC TIÊU NGHỀ NGHIỆP',cvEducation:'HỌC VẤN',cvExperience:'KINH NGHIỆM / THỰC TẬP',cvProjects:'DỰ ÁN TIÊU BIỂU',cvSkills:'KỸ NĂNG CHUYÊN MÔN',cvSoftSkills:'KỸ NĂNG MỀM',cvCerts:'CHỨNG CHỈ / KHÓA HỌC',cvActivities:'HOẠT ĐỘNG NGOẠI KHÓA',cvAwards:'GIẢI THƯỞNG',cvPortfolio:'E-Portfolio',cvResult:'Kết quả',
      role:'Vị trí hướng đến',verified:'Đã có liên kết',urlMissing:'Chưa đính kèm đường dẫn',fullEdit:'Mở chỉnh sửa',cvDisclaimer:'CV tự tạo theo dữ liệu đã điền. Không sử dụng thông tin gợi ý làm thành tích cá nhân.'
    },
    en: {
      extraEduNav:'Profile',extraReflectionNav:'Reflections',extraEvidenceNav:'Evidence',extraCVNav:'CV',
      extraGoalsKicker:'PERSONAL VISION',extraGoalsTitle:'Clear goals.<br><span>Purposeful progress.</span>',extraGoalsLead:'Life goals, near-term career plans and a 3–5 year direction.',
      extraEducationKicker:'EDUCATION & LEARNING',extraEducationTitle:'Learn. Practice.<br><span>Document progress.</span>',extraEducationLead:'Education, coursework, certificates and collaboration skills.',extraEducationHeading:'Education',extraCoursesHeading:'Coursework & training',extraCertHeading:'Certificates',extraSoftHeading:'Soft skills',
      extraExperienceKicker:'EXPERIENCE',extraExperienceTitle:'Practical experience.<br><span>Work done, documented.</span>',extraExperienceLead:'Internships, paid work and verified practical experience.',
      extraReflectionKicker:'LEARNING WORKSPACE',extraReflectionTitle:'Build it.<br><span>Reflect and improve.</span>',extraReflectionLead:'Project reflections: challenges, takeaways and next steps.',extraSTARHint:'S – Situation · T – Task · A – Action · R – Result · T – Takeaways',
      extraActivitiesKicker:'BEYOND CLASSROOM',extraActivitiesTitle:'Activities & awards.<br><span>Beyond engineering.</span>',extraActivitiesLead:'Extracurriculars, awards, scholarships and relevant interests.',extraActivitiesHeading:'Activities',extraAwardsHeading:'Awards & scholarships',extraHobbiesHeading:'Interests',
      extraEvidenceKicker:'EVIDENCE LIBRARY',extraEvidenceTitle:'Photos, reports.<br><span>Evidence of real work.</span>',extraEvidenceLead:'A portfolio library of files, videos, images and project references.',
      extraCVKicker:'CURRICULUM VITAE',extraCVTitle:'Application-ready.<br><span>Clear and concise.</span>',extraCVLead:'Engineering graduate CV template with contact details, objective, education, skills, experience and projects.',
      extraCVChecklistHeading:'CV COMPLETENESS',extraCVPrint:'Print / Save PDF ↓',extraCVEdit:'Edit content',extraCVNote:'A4 print layout targeting 1–2 pages. Check every claim before sending.',
      notUpdated:'Not added yet',example:'Suggested text — verify before using',sample:'Placeholder — no attachment yet',viewEvidence:'Open evidence ↗',careerLife:'Life goal',careerShort:'Near-term objective',careerLong:'3–5 year direction',
      reflectionContext:'Situation',reflectionAction:'My actions',reflectionLesson:'Takeaways',reflectionNext:'Next steps',
      cName:'Full name',cContact:'Email and phone',cSchool:'School and dates',cObjective:'Career objective',cSkills:'Technical skills',cProjects:'Project descriptions',cEvidence:'Project evidence',cSTAR:'STAR outcome',
      cvObjective:'CAREER OBJECTIVE',cvEducation:'EDUCATION',cvExperience:'WORK / INTERNSHIP',cvProjects:'SELECTED PROJECTS',cvSkills:'TECHNICAL SKILLS',cvSoftSkills:'SOFT SKILLS',cvCerts:'CERTIFICATES / COURSES',cvActivities:'ACTIVITIES',cvAwards:'AWARDS',cvPortfolio:'E-Portfolio',cvResult:'Result',
      role:'Target role',verified:'Attached',urlMissing:'Link not provided',fullEdit:'Open editor',cvDisclaimer:'CV reflects entered data. Suggested sample text is not personal achievement.'
    }
  };
  const config = {
    education:{label:'Học vấn / Education', fields:[['title','Chuyên ngành / Bằng cấp'],['organization','Tên trường, khoa'],['period','Thời gian'],['description','Kết quả học tập, GPA, thành tích'],['evidence','Link xác nhận','url']]},
    courses:{label:'Khóa học / Coursework', fields:[['title','Tên học phần'],['organization','Đơn vị tổ chức'],['period','Thời gian'],['description','Nội dung / kết quả'],['evidence','Đường dẫn chứng minh','url']]},
    certificates:{label:'Chứng chỉ / Certificates', fields:[['title','Tên chứng chỉ'],['organization','Đơn vị cấp'],['period','Năm / Ngày cấp'],['description','Mô tả'],['evidence','Link chứng chỉ','url']]},
    experiences:{label:'Kinh nghiệm / Experience', fields:[['title','Vị trí đảm nhiệm'],['organization','Đơn vị / Công ty'],['period','Thời gian'],['description','Vai trò, công việc, kết quả đo được'],['evidence','Link xác nhận','url']]},
    activities:{label:'Hoạt động ngoại khóa / Activities', fields:[['title','Hoạt động'],['organization','Tổ chức / Vai trò'],['period','Thời gian'],['description','Đóng góp / Kết quả'],['evidence','Hình ảnh hoặc minh chứng','url']]},
    awards:{label:'Giải thưởng / Awards', fields:[['title','Tên giải / Học bổng'],['organization','Đơn vị tổ chức'],['period','Năm'],['description','Thành tích cụ thể'],['evidence','Giấy chứng nhận','url']]},
    hobbies:{label:'Sở thích / Interests', fields:[['title','Sở thích'],['description','Tại sao sở thích này liên quan đến công việc?']]},
    reflections:{label:'Bài cảm nhận / Reflection', fields:[['title','Tên bài cảm nhận'],['period','Năm'],['projectId','ID dự án liên quan (nếu có)'],['situation','Bối cảnh / khó khăn'],['actions','Hành động đã thực hiện'],['learning','Điều học được'],['next','Hướng cải tiến']]},
    media:{label:'Thư viện minh chứng / Evidence', fields:[['title','Tên tài liệu'],['type','Loại: image, video, document, link'],['url','URL file / video / ảnh','url'],['description','Mô tả'],['projectId','ID dự án']]}
  };
  const scalarFields = [
    ['mottoVi','Slogan (tiếng Việt)'],['mottoEn','Slogan (English)'],
    ['lifeGoalVi','Mục tiêu cuộc đời (VI)'],['lifeGoalEn','Life goal (EN)'],
    ['careerShortVi','Mục tiêu nghề nghiệp ngắn hạn (VI)'],['careerShortEn','Short-term objective (EN)'],
    ['careerLongVi','Mục tiêu 3–5 năm (VI)'],['careerLongEn','3–5 year goal (EN)'],
    ['cvPosition','Vị trí ứng tuyển (CV)'],['portfolioUrl','Đường dẫn E-Portfolio công khai','url'],['portraitUrl','URL ảnh chân dung chuyên nghiệp','url'],['dob','Ngày sinh (tùy chọn)']
  ];
  const el = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safe = value => {try {const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return ''}};
  let state = null, activeEdit = null;
  const txt = key => (labels[state?.getLanguage?.() || 'vi'] || labels.vi)[key] || key;
  const extra = () => state.getData().extras;
  const lang = () => state.getLanguage();
  const localized = key => extra()?.[key+(lang()==='en'?'En':'Vi')] || extra()?.[key+'Vi'] || '';
  function showEmpty(id, msg) { el(id).innerHTML=`<div class="empty-content"><span class="placeholder-glyph">⊕</span><p>${esc(msg||txt('notUpdated'))}</p><button type="button" class="link-edit-content" data-open-editor-extra>${esc(txt('fullEdit'))} ↗</button></div>`; }
  function list(id, key) {
    const items=extra()[key]||[];
    if(!items.length){showEmpty(id);return;}
    el(id).innerHTML=items.map(item=>`<article class="list-record"><span class="record-chip">${esc(item.period|| (item.isPlaceholder?txt('example'):(item.organization||'PORTFOLIO')))}</span><h4>${esc(item.title)}</h4>${item.organization?`<strong>${esc(item.organization)}</strong>`:''}<p>${esc(item.description||'')}</p>${safe(item.evidence)?`<a href="${esc(safe(item.evidence))}" target="_blank" rel="noopener noreferrer">${txt('viewEvidence')}</a>`:''}${item.isPlaceholder?`<span class="record-caveat">${esc(txt('example'))}</span>`:''}</article>`).join('');
  }
  function render({data, language}) {
    if(!data?.extras)return;
    const langSuffix=language==='en'?'En':'Vi';
    const value = key => data.extras[key+langSuffix] || data.extras[key+'Vi'] || '';
    el('hero-personal').textContent= data.profile.name && data.profile.name!=='Tên của bạn'?data.profile.name:'AUTOMATION · PORTFOLIO';
    el('hero-motto').textContent=value('motto');
    const portrait=el('profile-portrait');
    const portraitURL=safe(data.extras.portraitUrl);
    portrait.hidden=!portraitURL;
    portrait.innerHTML=portraitURL?`<img src="${esc(portraitURL)}" loading="lazy" alt="${esc(data.profile.name||'Ảnh đại diện')}">`:'';
    el('goals-content').innerHTML=[['careerLife','lifeGoal','◇'],['careerShort','careerShort','↗'],['careerLong','careerLong','◎']].map(([title,key,icon])=>`<article class="goal-card"><span class="goal-icon">${icon}</span><h3>${esc(txt(title))}</h3><p>${esc(value(key)||txt('notUpdated'))}</p></article>`).join('');
    [['edu-entries','education'],['course-entries','courses'],['cert-entries','certificates'],['experience-entries','experiences'],['activity-entries','activities'],['award-entries','awards'],['hobby-entries','hobbies']].forEach(([id,key])=>list(id,key));
    el('soft-skill-entries').innerHTML=(data.extras.softSkills||[]).map(s=>`<span class="soft-pill">${esc(s)}</span>`).join('')||`<span class="muted">${esc(txt('notUpdated'))}</span>`;
    const reflection=el('reflection-grid');
    reflection.innerHTML=(data.extras.reflections||[]).map(item=>`<article class="reflection-card"><div class="reflection-top"><span>REFLECTION / ${esc(item.period)}</span>${item.isSample?`<span class="record-caveat">${esc(txt('example'))}</span>`:''}</div><h3>${esc(item.title)}</h3><dl><div><dt>${esc(txt('reflectionContext'))}</dt><dd>${esc(item.situation)}</dd></div><div><dt>${esc(txt('reflectionAction'))}</dt><dd>${esc(item.actions)}</dd></div><div><dt>${esc(txt('reflectionLesson'))}</dt><dd>${esc(item.learning)}</dd></div><div><dt>${esc(txt('reflectionNext'))}</dt><dd>${esc(item.next)}</dd></div></dl>${item.projectId?`<a href="#projects" class="reflection-project-link" data-ref-project="${esc(item.projectId)}">${language==='vi'?'Xem dự án liên quan':'Related project'} ↗</a>`:''}</article>`).join('') || `<div class="empty-content">${esc(txt('notUpdated'))}</div>`;
    const media=el('evidence-grid');
    media.innerHTML=(data.extras.media||[]).map(item=>{
      const link=safe(item.url),isImage=item.type==='image';
      return `<article class="evidence-card"><div class="evidence-thumbnail">${link&&isImage?`<img loading="lazy" src="${esc(link)}" alt="${esc(item.title)}">`:`<span class="evidence-type">${esc(({image:'IMG',video:'VIDEO',document:'PDF / DOC',link:'LINK'})[item.type] || 'FILE')}</span><span class="evidence-symbol">${item.type==='video'?'▷':item.type==='image'?'▧':item.type==='document'?'▤':'↗'}</span>`}</div><div class="evidence-body"><span class="mini-label">${esc(item.type||'FILE')}</span><h3>${esc(item.title)}</h3><p>${esc(item.description||'')}</p>${link?`<a href="${esc(link)}" target="_blank" rel="noopener noreferrer">${esc(txt('viewEvidence'))}</a>`:`<span class="record-caveat">${esc(txt('urlMissing'))}</span>`}</div></article>`;
    }).join('') || `<div class="empty-content">${esc(txt('notUpdated'))}</div>`;
    updateChecklist(data);
    el('cv-preview').innerHTML=createCV({data,language,preview:true});
    // Make navigation labels responsive to the active language.
  }
  function projectSTAR({project,language}) {
    if (!project) return '';
    const map=[['S','Bối cảnh / Situation','situationVi'],['T','Nhiệm vụ / Task','taskVi'],['A','Hành động / Action','actionVi'],['R','Kết quả / Result','resultVi'],['T','Bài học / Takeaways','reflectionVi']];
    const chosen=map.filter(([, ,key])=>project[key]);
    const attached=safe(project.evidence),photo=safe(project.photoUrl);
    if(!chosen.length && !attached && !photo)return '';
    return `<section class="modal-section project-star"><h3>STAR / START · ${language==='vi'?'TRẢI NGHIỆM DỰ ÁN':'PROJECT REFLECTION'}</h3><div class="star-records">${chosen.map(([symbol,title,key])=>`<div><span>${symbol}</span><p><b>${esc(title)}</b>${esc(project[key])}</p></div>`).join('')}</div>${photo?`<img class="star-photo" src="${esc(photo)}" alt="${esc(project.titleVi)}">`:''}${attached?`<a class="evidence-open" href="${esc(attached)}" target="_blank" rel="noopener noreferrer">${txt('viewEvidence')}</a>`:''}</section>`;
  }
  const nonPlaceholder = text => !!String(text||'').trim() && !/^(\[|Tên của bạn|Trường \/ Khoa)/i.test(String(text||'').trim());
  function checks(data){const e=data.extras,p=data.profile;
    return [
      ['cName',nonPlaceholder(p.name)],['cContact',!!p.email&&!!p.phone],
      ['cSchool',e.education?.some(item=>!item.isPlaceholder&&nonPlaceholder(item.organization))],
      ['cObjective',!!e.careerShortVi],['cSkills',data.skillGroups?.some(g=>g.skills?.length)],
      ['cProjects',data.projects?.length>0],['cEvidence',e.media?.some(m=>safe(m.url))||data.projects?.some(pr=>safe(pr.evidence))],
      ['cSTAR',data.projects?.some(pr=>nonPlaceholder(pr.resultVi))]
    ];
  }
  function updateChecklist(data){const items=checks(data);const done=items.filter(item=>item[1]).length;const percent=Math.round(done/items.length*100);
    el('cv-progress').setAttribute('aria-valuenow',percent);
    el('cv-progress').innerHTML=`<div class="progress-head"><strong>${percent}%</strong><span>${done}/${items.length} ${lang()==='vi'?'mục hoàn thành':'checks complete'}</span></div><div class="progress-rail"><span style="width:${percent}%"></span></div>`;
    el('cv-checklist').innerHTML=items.map(([name,ok])=>`<div class="check-item"><span class="check-symbol ${ok?'ok':'pending'}">${ok?'✓':'○'}</span>${esc(txt(name))}</div>`).join('');
  }
  function createCV({data,language,preview=false}){
    const e=data.extras||{}, p=data.profile||{};
    const tr=(key)=>labels[language]?.[key]||key;
    const objective=e[language==='en'?'careerShortEn':'careerShortVi']||e.careerShortVi||'';
    const contact=[p.phone,p.email,p.location].filter(Boolean).map(esc).join('  ·  ');
    const portfolio=safe(e.portfolioUrl);
    const portrait=safe(e.portraitUrl);
    const sec=(title,html)=>html?`<section class="cv-section"><h2>${esc(tr(title))}</h2>${html}</section>`:'';
    const rows=(items,includeDescription=true)=>items.filter(item=>!item.isPlaceholder).map(item=>`<div class="cv-entry"><div class="cv-project-head"><strong>${esc(item.title||'')}</strong><span class="cv-muted">${esc(item.period||'')}</span></div>${item.organization?`<b class="cv-entry-org">${esc(item.organization)}</b>`:''}${includeDescription&&item.description?`<p>${esc(item.description)}</p>`:''}</div>`).join('');
    const school=rows(e.education||[]) || `<p class="cv-placeholder">${language==='vi'?'[CẦN ĐIỀN: Trường, chuyên ngành, niên khóa, thành tích/GPA nếu có]':'[ADD: Institution, major, attendance dates, GPA / honors if applicable]'}</p>`;
    const experience=rows(e.experiences||[]);
    const selectedProjects=data.projects.filter(item=>item.featured).slice(0,3);
    const projects=selectedProjects.map(item=>`<div class="cv-project"><div class="cv-project-head"><strong>${esc(language==='en'?item.titleEn||item.titleVi:item.titleVi)}</strong><span class="cv-muted">${esc(item.period)}</span></div><p>${esc(language==='en'?item.summaryEn||item.summaryVi:item.summaryVi)}</p>${item.resultVi?`<p class="cv-result"><b>${esc(tr('cvResult'))}:</b> ${esc(item.resultVi)}</p>`:''}<div class="cv-tags">${esc((item.tags||[]).slice(0,5).join(' · '))}</div></div>`).join('');
    const skills=data.skillGroups.map(item=>`<div><b>${esc(language==='en'?item.nameEn||item.nameVi:item.nameVi)}</b><span>${esc((item.skills||[]).join(' · '))}</span></div>`).join('');
    const certs=rows([...(e.certificates||[]),...(e.courses||[]).filter(c=>!c.isPlaceholder).slice(0,2)],false);
    const isDraft = !nonPlaceholder(p.name) || !p.email || !p.phone || !(e.education||[]).some(item=>!item.isPlaceholder);
    return `<div class="cv-paper ${preview?'cv-paper-preview':'cv-paper-print'}">${isDraft?`<div class="cv-draft-label">${language==='vi'?'BẢN MẪU · CẦN BỔ SUNG THÔNG TIN TRƯỚC KHI ỨNG TUYỂN':'DRAFT · COMPLETE DETAILS BEFORE APPLYING'}</div>`:''}<header class="cv-header"><div>${portrait?`<img class="cv-photo" src="${esc(portrait)}" alt="">`:''}<h1>${esc(nonPlaceholder(p.name)?p.name:(language==='vi'?'[HỌ VÀ TÊN]':'[FULL NAME]'))}</h1><div class="cv-role">${esc(e.cvPosition||p.roleVi||'')}</div><div class="cv-contact">${contact|| (preview?esc(tr('notUpdated')):(language==='vi'?'[Email] · [Điện thoại]':'[Email] · [Phone]'))}</div>${portfolio?`<div class="cv-contact">${tr('cvPortfolio')}: <a href="${esc(portfolio)}">${esc(portfolio)}</a></div>`:''}</div></header>
    ${sec('cvObjective',objective?`<p>${esc(objective)}</p>`:'')}
    ${sec('cvEducation',school)}
    ${sec('cvSkills',`<div class="cv-skills">${skills}</div>`)}
    ${sec('cvProjects',projects)}
    ${sec('cvExperience',experience)}
    ${sec('cvSoftSkills',(e.softSkills||[]).length?`<p>${esc(e.softSkills.join(' · '))}</p>`:'')}
    ${sec('cvCerts',certs)}
    ${sec('cvActivities',rows(e.activities||[],false))}
    ${sec('cvAwards',rows(e.awards||[],false))}
    </div>`;
  }
  function renderExtendedEditor(){
    const d=extra();if(!d)return;
    const scalar=scalarFields.map(([key,label,type])=>`<label class="complete-editor-field">${esc(label)}${type==='url'?`<input type="url" name="${esc(key)}" value="${esc(d[key]||'')}" placeholder="https://...">`:`<textarea name="${esc(key)}" rows="${key.toLowerCase().includes('career')||key.toLowerCase().includes('goal')?'3':'1'}">${esc(d[key]||'')}</textarea>`}</label>`).join('');
    el('extended-editor-body').innerHTML=`<form id="complete-settings-form"><div class="complete-fields">${scalar}</div><label class="complete-editor-field wide">Kỹ năng mềm (mỗi dòng một kỹ năng)<textarea rows="4" name="softSkills">${esc((d.softSkills||[]).join('\n'))}</textarea></label><button type="submit" class="btn btn-primary">Lưu mục tiêu & CV ✓</button></form><div class="extra-list-groups">${Object.keys(config).map(key=>`<details class="extra-management"><summary>${esc(config[key].label)} <small>${d[key]?.length||0} mục</small></summary><div class="extra-management-inner"><button type="button" class="btn btn-secondary" data-add-kind="${key}">+ Thêm mục mới</button>${(d[key]||[]).map((item,i)=>`<div class="extra-management-row"><div><strong>${esc(item.title||'Chưa đặt tên')}</strong><small>${esc(item.period||item.organization||'')}</small></div><div><button type="button" data-edit-kind="${key}" data-index="${i}">Sửa</button><button type="button" data-del-kind="${key}" data-index="${i}">Xóa</button></div></div>`).join('')||'<p>Chưa có dữ liệu.</p>'}</div></details>`).join('')}</div>`;
  }
  function openEntryEditor(kind,index){
    if(!config[kind])return;
    const original=index===null?{}:extra()[kind]?.[index]||{};
    activeEdit={kind,index};
    const dlg=el('extra-entry-dialog');
    el('extra-entry-title').textContent=`${index===null?'Thêm':'Chỉnh sửa'} · ${config[kind].label}`;
    el('extra-entry-fields').innerHTML=config[kind].fields.map(([key,title,type])=>`<label>${esc(title)}${key==='description'||['situation','actions','learning','next'].includes(key)?`<textarea rows="3" name="${key}">${esc(original[key]||'')}</textarea>`:`<input name="${key}" type="${type||'text'}" value="${esc(original[key]||'')}" ${key==='title'?'required':''}>`}</label>`).join('');
    dlg.showModal();
  }
  function init(api){
    state=api;
    const dlg=document.createElement('dialog');dlg.id='extra-entry-dialog';dlg.className='modal editor-modal complete-dialog';
    dlg.innerHTML=`<form id="extra-entry-form" class="dialog-shell editor-form"><div class="editor-header"><div><span class="kicker">PORTFOLIO CONTENT</span><h2 id="extra-entry-title">Chỉnh sửa</h2></div><button type="button" class="modal-close icon-btn" id="extra-entry-close" aria-label="Đóng">×</button></div><div class="complete-fields" id="extra-entry-fields"></div><div class="editor-footer"><button type="submit" class="btn btn-primary">Lưu mục ✓</button></div></form>`;
    document.body.appendChild(dlg);
    el('extra-entry-close').addEventListener('click',()=>dlg.close());
    dlg.addEventListener('click',event=>{if(event.target===dlg)dlg.close();});
    el('editor-extended').addEventListener('click',event=>{
      const add=event.target.closest('[data-add-kind]');const edit=event.target.closest('[data-edit-kind]');const del=event.target.closest('[data-del-kind]');
      if(add)openEntryEditor(add.dataset.addKind,null);
      if(edit)openEntryEditor(edit.dataset.editKind,Number(edit.dataset.index));
      if(del&&confirm('Bạn muốn xóa nội dung này?')){extra()[del.dataset.delKind].splice(Number(del.dataset.index),1);api.save();renderExtendedEditor();}
    });
    el('editor-extended').addEventListener('submit',event=>{
      if(event.target.id!=='complete-settings-form')return;
      event.preventDefault();const form=event.target;
      scalarFields.forEach(([key])=>{extra()[key]=form.elements.namedItem(key).value.trim()});
      extra().softSkills=form.elements.namedItem('softSkills').value.split('\n').map(s=>s.trim()).filter(Boolean);
      api.save();renderExtendedEditor();
    });
    el('extra-entry-form').addEventListener('submit',event=>{
      event.preventDefault();const{kind,index}=activeEdit;
      const form=event.target;
      const current=index===null?{}:extra()[kind][index];
      const item={...current,id:current.id||'item-'+Date.now().toString(36)};
      config[kind].fields.forEach(([key])=>item[key]=form.elements.namedItem(key).value.trim());
      delete item.isPlaceholder;delete item.isSample;
      if(index===null)extra()[kind].push(item);else extra()[kind][index]=item;
      dlg.close();api.save();renderExtendedEditor();
    });
    el('cv-print-extra').addEventListener('click',()=>{api.renderCV();window.print();});
    el('cv-edit-extra').addEventListener('click',()=>{el('open-editor').click();document.querySelector('[data-editor-tab="extended"]').click();});
    document.addEventListener('click',event=>{
      const open=event.target.closest('[data-open-editor-extra]');
      if(open){el('open-editor').click();document.querySelector('[data-editor-tab="extended"]').click();}
      const ref=event.target.closest('[data-ref-project]');if(ref){event.preventDefault();api.openProject(ref.dataset.refProject);}
    });
    document.querySelector('[data-editor-tab="extended"]').addEventListener('click',renderExtendedEditor);
  }
  return {labels,render,init,createCV,projectSTAR,renderExtendedEditor};
})();
