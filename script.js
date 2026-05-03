    // --- DATA ---
    const PROJECTS = [
      {
        id: "01",
        client: "NavGurukul / Zuvy",
        role: "Product Designer",
        outcome: "Won Pragati Grant — Meta × The/Nudge Institute",
        summary: "Teaching an AI to feel like a person — in four weeks and one sprint.",
        href: "case-study-zoe.html",
        contextUrl: "https://images.unsplash.com/photo-1673255745677-b5d6b23d1cb6?q=80&w=1470&auto=format&fit=crop",
        detailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        specs: ["AI Product Design", "Voice UX"],
        content: {
          challenge: "Students could master code on Zuvy but faced their interviews alone. Manual mock sessions worked — but one staff member per student, 30 minutes each, couldn't scale across cohorts of hundreds.",
          solution: "A voice-first AI interviewer with a character (Zoe) at the centre. Latency was masked through personality: animated thinking states so silence felt deliberate, not broken. A post-session report turned every practice round into a study artifact.",
          impact: ["3,780 sessions · 2,764 unique users", "88% reported increased interview confidence", "91% said Zoe helped identify knowledge gaps", "3.94/5 CSAT score"]
        }
      },
      {
        id: "02",
        client: "Dantewada District Administration",
        role: "Product Designer → Design Lead",
        outcome: "97.4% app install coverage across 920 schools",
        summary: "Designing trust into a system 2,300 teachers never asked for.",
        href: "case-study-dantewada.html",
        contextUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop",
        detailUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop",
        specs: ["Offline-First Android", "Ed-Gov"],
        content: {
          challenge: "2,300 teachers across a remote tribal district recorded test scores for 35,000 students on paper. Registers traveled a chain of handoffs — each one compounding errors. 30% of schools had no reliable internet. Teachers ranged from 20 to 60, many managing multiple classes alone.",
          solution: "An offline-first Android app for teachers, paired with a web dashboard for district officers. Shared school-level UDISE login to eliminate credential overhead. Two distinct input models for two assessment types. Transparent sync status so teachers trusted the system with their data.",
          impact: ["920 schools onboarded", "97.4% app install coverage", "512 peak submissions in July", "1.15% crash rate (down from higher)"]
        }
      },
      {
        id: "03",
        client: "NavGurukul × Amazon Future Engineers",
        role: "Senior Product Designer",
        outcome: "87% rated the new platform Significantly Better",
        summary: "Four tools doing the job of one. Until they weren't.",
        href: "case-study-zuvy.html",
        contextUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
        detailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
        specs: ["LMS Redesign", "Research-Led"],
        content: {
          challenge: "A 10-month bootcamp for first-generation women coders was scattered across Graphy, Google Meet, Google Drive, and third-party assessments. Students navigated four systems to do one thing: learn. Many joined classes directly from Calendar and never visited the platform at all.",
          solution: "A unified platform where recordings lived inside the class they belonged to, attendance was visible per session, all upcoming deadlines lived in one panel, and assessments happened natively — with proctoring, timed windows, and a human re-attempt approval flow.",
          impact: ["87% rated it Significantly Better or Much Better", "67% rated attendance tracking Excellent", "87% rated assignment ease Excellent or Very Easy", "245 survey respondents post-launch"]
        }
      }
    ];

    // --- CORE SYSTEMS ---

    // 1. Router
    const router = {
      loadHome: () => {
        document.getElementById('view-home').classList.add('active');
        document.getElementById('view-case-study').classList.remove('active');
        window.scrollTo(0, 0);
      },
      loadCaseStudy: (index) => {
        const project = PROJECTS[index];
        renderCaseStudyTemplate(project);
        document.getElementById('view-home').classList.remove('active');
        document.getElementById('view-case-study').classList.add('active');
        window.scrollTo(0, 0);
        lucide.createIcons();
        initParallax(); // Re-init for new images
      }
    };

    // 2. Renderer
    function initApp() {
      const feed = document.getElementById('project-feed');
      const indexList = document.getElementById('quick-index-list');

      PROJECTS.forEach((p, i) => {
        // Populate Feed (Diptych)
        const card = document.createElement('div');
        card.className = "group border-t border-black/10 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-start";
        card.innerHTML = `
                    <div class="md:col-span-4 flex flex-col justify-between sticky top-32">
                        <div class="space-y-8">
                            <div class="flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-gray-400">
                                <span class="text-[#D4450C] font-bold">0${i + 1}</span>
                                <span>—</span>
                                <span>${p.client}</span>
                            </div>
                            <h2 class="text-4xl md:text-5xl font-serif font-light leading-[1.1] text-[#111]">${p.summary}</h2>
                            <div class="space-y-2 pt-4">
                                <h4 class="font-sans text-xs font-bold uppercase tracking-wide text-gray-400">Business Outcome</h4>
                                <p class="font-sans text-lg font-medium border-l-2 border-[#D4450C] pl-4">${p.outcome}</p>
                            </div>
                        </div>
                        <div class="pt-12">
                            <a href="${p.href}" class="flex items-center gap-3 font-sans text-sm font-bold tracking-wide uppercase text-[#111] hover:text-[#D4450C] transition-colors nav-link">
                                Read Brief <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </a>
                        </div>
                    </div>
                    <div class="md:col-span-8 pl-0 md:pl-12 relative">
                        <!-- DIPTYCH VISUALS -->
                        <div class="grid grid-cols-1 gap-8 relative">
                            <!-- Texture (Slow) -->
                            <div class="w-full aspect-[21/9] bg-gray-100 overflow-hidden relative group interactive-visual">
                                <div class="parallax-wrapper h-full">
                                    <img src="${p.detailUrl}" class="parallax-img" data-speed="-0.05">
                                </div>
                                <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 flex items-center gap-4">
                                    <span class="font-sans text-xs font-bold uppercase tracking-widest text-[#D4450C]">01. Texture</span>
                                    <span class="w-[1px] h-3 bg-black/20"></span>
                                    <span class="font-serif italic text-sm text-black">${p.specs[0]}</span>
                                </div>
                            </div>
                            <!-- Context (Fast) -->
                            <div class="w-[90%] ml-auto -mt-12 md:-mt-24 aspect-[4/3] bg-gray-200 overflow-hidden shadow-2xl relative z-10 group interactive-visual border-[8px] border-white cursor-pointer" onclick="window.location.href='${p.href}'">
                                <div class="parallax-wrapper h-full">
                                    <img src="${p.contextUrl}" class="parallax-img" data-speed="0.1">
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <i data-lucide="play" class="w-6 h-6 ml-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        feed.appendChild(card);

        // Populate Quick Index
        const li = document.createElement('li');
        li.innerHTML = `
                    <a href="${p.href}" class="group flex flex-col gap-1 nav-link">
                        <span class="flex items-center gap-2 font-serif text-lg text-gray-400 group-hover:text-[#111] transition-colors">
                            <span class="text-xs font-sans font-bold text-[#D4450C] opacity-0 group-hover:opacity-100 transition-opacity">0${i + 1}</span>
                            ${p.client}
                        </span>
                    </a>
                `;
        indexList.appendChild(li);
      });

      // Init Icons
      lucide.createIcons();
      initParallax();
    }

    function renderCaseStudyTemplate(project) {
      const container = document.getElementById('case-study-content');
      container.innerHTML = `
                <!-- TRAILER HEADER -->
                <div class="w-full h-[60vh] relative overflow-hidden">
                    <img src="${project.contextUrl}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-12">
                        <h1 class="text-6xl md:text-8xl font-serif text-white mb-4 italic">${project.client}</h1>
                        <p class="text-[#D4450C] font-sans font-bold tracking-widest uppercase bg-white/10 backdrop-blur w-max px-4 py-2">${project.outcome}</p>
                    </div>
                </div>

                <!-- PLOT SUMMARY -->
                <div class="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h4 class="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">The Challenge</h4>
                        <p class="font-serif text-2xl leading-relaxed">${project.content.challenge}</p>
                    </div>
                    <div>
                        <h4 class="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">The Solution</h4>
                        <p class="font-serif text-2xl leading-relaxed">${project.content.solution}</p>
                    </div>
                </div>

                <!-- ACTION MONTAGE (Process) -->
                <div class="bg-gray-50 py-24">
                    <div class="max-w-[1400px] mx-auto px-6 md:px-12">
                        <h3 class="font-serif text-4xl italic mb-12">Anatomy of Craft</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24">
                            <div class="space-y-6">
                                <h4 class="text-xl font-bold">Old vs New</h4>
                                <p class="text-gray-600">We stripped away the noise.</p>
                            </div>
                            <img src="${project.detailUrl}" class="w-full rounded shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                        </div>
                    </div>
                </div>

                <!-- VALIDATION (Reviews) -->
                <div class="max-w-[1400px] mx-auto px-6 md:px-12 py-24 text-center">
                    <h2 class="text-5xl font-serif italic mb-12">Impact Report</h2>
                    <div class="flex flex-wrap justify-center gap-8">
                        ${project.content.impact.map(item => `
                            <div class="border border-black px-8 py-6">
                                <span class="font-sans font-bold text-lg">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
    }

    // 3. Fluid Physics (Parallax & Cursor)
    function initParallax() {
      const images = document.querySelectorAll('.parallax-img');

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        images.forEach(img => {
          const rect = img.parentElement.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distanceFromCenter = center - windowHeight / 2;
          const speed = parseFloat(img.getAttribute('data-speed'));

          // Apply translation
          img.style.transform = `translateY(${distanceFromCenter * speed}px) scale(1.1)`;
        });

        // Nav Sticky Logic
        const nav = document.getElementById('main-nav');
        if (scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      });
    }

    function initCursor() {
      const cursor = document.getElementById('cursor-follower');

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Check hover targets
        const target = e.target;
        if (target.closest('.nav-link') || target.closest('button') || target.closest('.interactive-visual')) {
          cursor.classList.add('hover-active');
        } else {
          cursor.classList.remove('hover-active');
        }
      });
    }

    // 4. Clock
    function updateClock() {
      const now = new Date();
      document.getElementById('live-clock').innerText = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }

    // --- INIT ---
    document.addEventListener('DOMContentLoaded', () => {
      initApp();
      initCursor();
      setInterval(updateClock, 1000);
      updateClock();
    });