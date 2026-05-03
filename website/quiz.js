/* ============================================================
   Zero to Fluent — AI Readiness Quiz
   Full-screen modal quiz funnel
   ============================================================ */

(function () {
  'use strict';

  // --- Quiz Data ---
  const quizData = {
    questions: [
      {
        id: 'role',
        type: 'single',
        num: 1,
        text: 'What best describes your role?',
        options: [
          { label: 'Small Business Owner', score: 0 },
          { label: 'Executive / C-Suite', score: 1 },
          { label: 'Manager / Team Lead', score: 1 },
          { label: 'Self-Employed / Freelancer', score: 0 },
          { label: 'Other', score: 0 }
        ]
      },
      {
        id: 'size',
        type: 'single',
        num: 2,
        text: 'How many employees does your business have?',
        options: [
          { label: 'Just me', score: 0 },
          { label: '2–10', score: 1 },
          { label: '11–50', score: 2 },
          { label: '50+', score: 3 }
        ]
      },
      {
        id: 'goal',
        type: 'single',
        num: 3,
        text: "What's your #1 goal with AI?",
        options: [
          { label: 'Save time on repetitive tasks', score: 2 },
          { label: 'Create better marketing content', score: 2 },
          { label: 'Make smarter business decisions', score: 3 },
          { label: 'Stay ahead of competitors', score: 3 },
          { label: "I honestly don't know yet", score: 0 }
        ]
      },
      {
        id: 'frustration',
        type: 'single',
        num: 4,
        text: "What's been your biggest frustration with AI so far?",
        options: [
          { label: "I don't know where to start", score: 0 },
          { label: "I tried ChatGPT but couldn't make it useful", score: 2 },
          { label: "I'm overwhelmed by all the options", score: 1 },
          { label: "My business needs it but I can't figure it out", score: 1 },
          { label: "I haven't tried anything yet", score: 0 }
        ]
      },
      {
        id: 'breather',
        type: 'breather'
      },
      {
        id: 'tools',
        type: 'multi',
        num: 5,
        text: 'Which AI tools have you used? (Select all that apply)',
        options: [
          { label: 'ChatGPT', score: 2 },
          { label: 'Claude', score: 3 },
          { label: 'Microsoft Copilot', score: 2 },
          { label: 'Google Gemini', score: 2 },
          { label: "None — I haven't used any", score: 0 }
        ]
      },
      {
        id: 'learning',
        type: 'single',
        num: 6,
        text: 'How do you prefer to learn new skills?',
        options: [
          { label: 'In-person workshop with an instructor', score: 1 },
          { label: 'Online course at my own pace', score: 2 },
          { label: 'One-on-one coaching', score: 2 },
          { label: 'YouTube and free resources', score: 1 }
        ]
      },
      {
        id: 'urgency',
        type: 'single',
        num: 7,
        text: 'How soon do you want to start using AI in your business?',
        options: [
          { label: "Immediately — I'm already behind", score: 3 },
          { label: 'Within the next month', score: 2 },
          { label: 'Sometime this quarter', score: 1 },
          { label: 'No rush', score: 0 }
        ]
      }
    ]
  };

  // --- State ---
  let currentStep = 0; // 0 = intro, 1-8 = questions/breather, 9 = results
  let answers = {};
  let totalScore = 0;

  // --- DOM ---
  const overlay = document.getElementById('quiz-overlay');
  const container = document.getElementById('quiz-container');
  const progressBar = document.getElementById('quiz-progress-bar');
  const closeBtn = document.getElementById('quiz-close');

  // Total steps: intro(1) + questions(8 including breather) + results(1) = 10
  const totalSteps = quizData.questions.length + 2; // intro + questions + results

  function updateProgress() {
    const pct = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = pct + '%';
  }

  // --- Render Functions ---

  function renderIntro() {
    container.innerHTML = `
      <div class="quiz-screen">
        <div class="quiz-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="#E5E7EB" stroke-width="2"/>
            <circle cx="28" cy="28" r="18" stroke="#818CF8" stroke-width="2"/>
            <path d="M23 28h10M28 23v10" stroke="#818CF8" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="quiz-screen-title">AI Readiness Assessment</h2>
        <p class="quiz-screen-subtitle">Answer 7 quick questions. We'll tell you exactly where you stand — and what to do next.</p>
        <p class="quiz-screen-meta">Takes about 2 minutes</p>
        <button class="quiz-start-btn" id="quiz-start">Start the Assessment →</button>
      </div>
    `;
    document.getElementById('quiz-start').addEventListener('click', function () {
      currentStep = 1;
      renderStep();
    });
  }

  function renderQuestion(q, stepIndex) {
    const isMulti = q.type === 'multi';
    const indicatorType = isMulti ? 'quiz-option-checkbox' : 'quiz-option-radio';

    let optionsHTML = q.options.map(function (opt, i) {
      return '<div class="quiz-option" data-index="' + i + '" data-score="' + opt.score + '"><div class="' + indicatorType + '"></div><span>' + opt.label + '</span></div>';
    }).join('');

    let nextBtnHTML = '';
    if (isMulti) {
      nextBtnHTML = '<button class="quiz-next-btn" id="quiz-next">Next →</button>';
    }

    container.innerHTML = `
      <div class="quiz-screen">
        <p class="quiz-question-num">Question ${q.num} of 7</p>
        <h2 class="quiz-question-text">${q.text}</h2>
        <div class="quiz-options" id="quiz-options">
          ${optionsHTML}
        </div>
        ${nextBtnHTML}
      </div>
    `;

    var options = container.querySelectorAll('.quiz-option');
    var selected = [];

    if (isMulti) {
      var nextBtn = document.getElementById('quiz-next');

      options.forEach(function (opt) {
        opt.addEventListener('click', function () {
          var idx = parseInt(opt.getAttribute('data-index'));
          if (opt.classList.contains('selected')) {
            opt.classList.remove('selected');
            selected = selected.filter(function (s) { return s !== idx; });
          } else {
            opt.classList.add('selected');
            selected.push(idx);
          }
          if (selected.length > 0) {
            nextBtn.classList.add('enabled');
          } else {
            nextBtn.classList.remove('enabled');
          }
        });
      });

      nextBtn.addEventListener('click', function () {
        if (selected.length === 0) return;
        // Calculate score for multi-select (cap Q5 at 3 points max)
        var score = 0;
        selected.forEach(function (idx) {
          score += q.options[idx].score;
        });
        if (q.id === 'tools') {
          score = Math.min(score, 3);
        }
        answers[q.id] = selected.map(function (idx) { return q.options[idx].label; });
        totalScore += score;
        currentStep++;
        renderStep();
      });
    } else {
      options.forEach(function (opt) {
        opt.addEventListener('click', function () {
          // Deselect all
          options.forEach(function (o) { o.classList.remove('selected'); });
          opt.classList.add('selected');

          var score = parseInt(opt.getAttribute('data-score'));
          var idx = parseInt(opt.getAttribute('data-index'));
          answers[q.id] = q.options[idx].label;
          totalScore += score;

          // Auto-advance after brief delay
          setTimeout(function () {
            currentStep++;
            renderStep();
          }, 300);
        });
      });
    }
  }

  function renderBreather() {
    container.innerHTML = `
      <div class="quiz-screen quiz-breather">
        <div class="quiz-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="#E5E7EB" stroke-width="2"/>
            <path d="M16 24l6 6 10-12" stroke="#818CF8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="quiz-breather-text">You're in good company. <strong>88% of small business owners</strong> say they want to use AI — but don't know how.</p>
        <p class="quiz-breather-stat">That's exactly why we built Zero to Fluent.</p>
        <button class="quiz-continue-btn" id="quiz-continue">Continue →</button>
      </div>
    `;
    document.getElementById('quiz-continue').addEventListener('click', function () {
      currentStep++;
      renderStep();
    });
  }

  function getResult() {
    if (totalScore <= 8) {
      return {
        tier: 'Beginner',
        headline: 'Your AI Readiness Score: Beginner',
        body: "You're starting from zero — and that's perfectly fine. That's literally why we named it \"Zero to Fluent.\" Our 2-day workshop is built for people in exactly your position. No jargon, no assumptions, just practical hands-on training that you'll actually use on Monday morning.",
        recommendation: 'Recommended: Zero to Fluent 2-Day Workshop — April 21-22 in Frisco',
        pct: 25
      };
    } else if (totalScore <= 14) {
      return {
        tier: 'Curious',
        headline: 'Your AI Readiness Score: Curious',
        body: "You've dipped your toes in, but you haven't found the right way to make AI work for your business. The 2-day workshop will take you from scattered experiments to a structured AI workflow you can rely on every day.",
        recommendation: 'Recommended: Zero to Fluent 2-Day Workshop + Community',
        pct: 55
      };
    } else {
      return {
        tier: 'Aware',
        headline: 'Your AI Readiness Score: Aware',
        body: "You know the basics, but you're not yet fluent. Day 2 of our workshop covers advanced prompting, vibecoding, and AI agents — the skills that separate casual users from fluent operators. Plus, you'll build a 90-day implementation plan.",
        recommendation: 'Recommended: Zero to Fluent 2-Day Workshop (you\'ll get the most out of Day 2)',
        pct: 78
      };
    }
  }

  function renderResults() {
    var result = getResult();

    container.innerHTML = `
      <div class="quiz-screen quiz-result">
        <p class="quiz-result-badge">Assessment Complete</p>
        <h2 class="quiz-result-title">${result.headline}</h2>
        <div class="quiz-result-gauge"><div class="quiz-result-gauge-fill" id="gauge-fill" style="width: 0%"></div></div>
        <p class="quiz-result-score-label">Score: ${totalScore} · ${result.tier}</p>
        <p class="quiz-result-body">${result.body}</p>
        <div class="quiz-result-rec">${result.recommendation}</div>
        <div class="quiz-email-form">
          <p class="quiz-email-label">Enter your email to save your results and get our free AI Quick-Start Guide</p>
          <input type="email" class="quiz-email-input" placeholder="your@email.com" id="quiz-email">
        </div>
        <a href="#pricing" class="quiz-result-cta" id="quiz-result-cta">Reserve My Seat — $697 →</a>
        <p style="font-size:13px;color:#6B7280;margin-top:12px;">April 21-22 in Frisco, TX · Only 40 seats · 100% satisfaction guarantee</p>
      </div>
    `;

    // Animate gauge
    setTimeout(function () {
      document.getElementById('gauge-fill').style.width = result.pct + '%';
    }, 100);

    // Close quiz on CTA click
    document.getElementById('quiz-result-cta').addEventListener('click', function () {
      closeQuiz();
    });
  }

  // --- Step Router ---
  function renderStep() {
    updateProgress();
    var qIndex = currentStep - 1; // 0-indexed into questions array

    if (currentStep === 0) {
      renderIntro();
    } else if (qIndex < quizData.questions.length) {
      var q = quizData.questions[qIndex];
      if (q.type === 'breather') {
        renderBreather();
      } else {
        renderQuestion(q, qIndex);
      }
    } else {
      renderResults();
    }
  }

  // --- Open / Close ---
  function openQuiz() {
    // Reset state
    currentStep = 0;
    answers = {};
    totalScore = 0;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderIntro();
    updateProgress();
  }

  function closeQuiz() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners
  closeBtn.addEventListener('click', closeQuiz);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeQuiz();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeQuiz();
    }
  });

  // Open quiz buttons
  document.getElementById('open-quiz').addEventListener('click', function (e) {
    e.preventDefault();
    openQuiz();
  });

  // Also hook any other elements with data-open-quiz
  document.querySelectorAll('[data-open-quiz]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openQuiz();
    });
  });

})();
