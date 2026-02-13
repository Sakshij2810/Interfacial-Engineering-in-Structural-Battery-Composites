/* ============================================
   STRUCTURAL BATTERY COMPOSITES BLOG - JAVASCRIPT
   Sidebar Navigation, Progress Bar, Back-to-Top & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

  // ============================================
  // SIDEBAR ACTIVE SECTION TRACKING
  // ============================================
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Throttle scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
    });
  });

  highlightActiveSection();

  // ============================================
  // SMOOTH SCROLLING FOR SIDEBAR LINKS
  // ============================================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = 40;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile sidebar after click
        const sidebar = document.querySelector(".blog-sidebar");
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const blogSidebar = document.querySelector(".blog-sidebar");

  if (mobileNavToggle && blogSidebar) {
    mobileNavToggle.addEventListener("click", function () {
      blogSidebar.classList.toggle("active");
    });
  }

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".stat-card, .conclusion-card, .learn-more-card, .feature-item, .spec-card",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ============================================
  // IMAGE HOVER EFFECTS
  // ============================================
  const images = document.querySelectorAll(
    ".full-width-image, .split-image img",
  );
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      this.style.transform = "scale(1.01)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    });
  });

  // ============================================
  // TABLE ROW HOVER HIGHLIGHT
  // ============================================
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Scroll to top");
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #bf3425 0%, #9d2a1e 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(191, 52, 37, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 8px 25px rgba(191, 52, 37, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(191, 52, 37, 0.3)";
    });

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 500) {
        button.style.opacity = "1";
        button.style.visibility = "visible";
      } else {
        button.style.opacity = "0";
        button.style.visibility = "hidden";
      }
    });
  };

  createBackToTop();

  // ============================================
  // READING PROGRESS INDICATOR
  // ============================================
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #bf3425, #47577c);
      z-index: 9999;
      transition: width 0.1s linear;
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  };

  createProgressBar();

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" },
    );

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});
// <!-- infographic 1 -->
// <!-- infographic 2 -->
//   <!-- infographic 3 -->
(function () {
  function bseShowInfo(phase) {
    var ionEl = document.getElementById("bseInfoIon");
    var loadEl = document.getElementById("bseInfoLoad");
    if (phase === "ion") {
      ionEl.classList.add("bse-show");
      loadEl.classList.remove("bse-show");
    } else {
      loadEl.classList.add("bse-show");
      ionEl.classList.remove("bse-show");
    }
  }
  function bseHideInfo() {
    document.getElementById("bseInfoIon").classList.remove("bse-show");
    document.getElementById("bseInfoLoad").classList.remove("bse-show");
  }
  // Expose to inline event handlers
  window.bseShowInfo = bseShowInfo;
  window.bseHideInfo = bseHideInfo;
})();
//    <!-- infographic 4 -->
(function () {
  // Animate capacity bars when scrolled into view
  var barWrap = document.getElementById("cflBarWrap");
  if (!barWrap) return;

  function checkVisible() {
    var rect = barWrap.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      barWrap.classList.add("cfl-bar-animated");
      window.removeEventListener("scroll", checkVisible);
    }
  }

  // Trigger immediately in case already visible
  setTimeout(function () {
    barWrap.classList.add("cfl-bar-animated");
  }, 400);

  window.addEventListener("scroll", checkVisible);
})();
//   <!-- infographic 5 -->
(function () {
  var svg = document.getElementById("cfcSvg");
  var rings = svg.querySelectorAll(".cfc-ring");
  var cards = document.querySelectorAll(".cfc-detail-card");

  function cfcHighlight(layer) {
    svg.classList.add("cfc-has-hover");
    rings.forEach(function (r) {
      r.classList.remove("cfc-ring-active");
      if (r.getAttribute("data-layer") === layer) {
        r.classList.add("cfc-ring-active");
      }
    });
    cards.forEach(function (c) {
      c.classList.remove("cfc-detail-active");
      if (c.getAttribute("data-layer") === layer) {
        c.classList.add("cfc-detail-active");
      }
    });
  }

  function cfcClear() {
    svg.classList.remove("cfc-has-hover");
    rings.forEach(function (r) {
      r.classList.remove("cfc-ring-active");
    });
    cards.forEach(function (c) {
      c.classList.remove("cfc-detail-active");
    });
  }

  // Also wire SVG ring hovers to detail cards
  rings.forEach(function (ring) {
    ring.addEventListener("mouseenter", function () {
      cfcHighlight(ring.getAttribute("data-layer"));
    });
    ring.addEventListener("mouseleave", cfcClear);
  });

  // Expose for inline handlers
  window.cfcHighlight = cfcHighlight;
  window.cfcClear = cfcClear;
})();
//   <!-- infographic 6 -->
(function () {
  var ctx = document.getElementById("sepPropertyChart");

  // Custom plugin to draw the target zone rectangle
  var targetZonePlugin = {
    id: "targetZone",
    beforeDatasetsDraw: function (chart) {
      var xScale = chart.scales.x;
      var yScale = chart.scales.y;
      var ctx2 = chart.ctx;

      // Target zone: E > 2 GPa AND σ > 1e-4 S/cm
      var xLeft = xScale.getPixelForValue(2);
      var xRight = xScale.getPixelForValue(15);
      var yTop = yScale.getPixelForValue(1e-3);
      var yBottom = yScale.getPixelForValue(1e-4);

      ctx2.save();
      ctx2.fillStyle = "rgba(191, 52, 37, 0.06)";
      ctx2.fillRect(xLeft, yTop, xRight - xLeft, yBottom - yTop);
      ctx2.strokeStyle = "rgba(191, 52, 37, 0.3)";
      ctx2.lineWidth = 1.5;
      ctx2.setLineDash([6, 4]);
      ctx2.strokeRect(xLeft, yTop, xRight - xLeft, yBottom - yTop);
      ctx2.restore();

      // Label the target zone
      ctx2.save();
      ctx2.font = "600 10px Inter, sans-serif";
      ctx2.fillStyle = "rgba(191, 52, 37, 0.5)";
      ctx2.textAlign = "center";
      ctx2.fillText("TARGET", (xLeft + xRight) / 2, yTop + 14);
      ctx2.fillText("ZONE", (xLeft + xRight) / 2, yTop + 26);
      ctx2.restore();
    },
  };

  // Custom plugin to draw reference boundary lines
  var boundaryLinesPlugin = {
    id: "boundaryLines",
    beforeDatasetsDraw: function (chart) {
      var xScale = chart.scales.x;
      var yScale = chart.scales.y;
      var ctx2 = chart.ctx;

      // Horizontal line at σ = 10⁻⁴ (minimum useful conductivity)
      var yLine = yScale.getPixelForValue(1e-4);
      ctx2.save();
      ctx2.strokeStyle = "rgba(191, 52, 37, 0.15)";
      ctx2.lineWidth = 1;
      ctx2.setLineDash([4, 6]);
      ctx2.beginPath();
      ctx2.moveTo(xScale.left, yLine);
      ctx2.lineTo(xScale.right, yLine);
      ctx2.stroke();
      ctx2.restore();

      // Vertical line at E = 2 GPa (minimum useful modulus)
      var xLine = xScale.getPixelForValue(2);
      ctx2.save();
      ctx2.strokeStyle = "rgba(71, 87, 124, 0.15)";
      ctx2.lineWidth = 1;
      ctx2.setLineDash([4, 6]);
      ctx2.beginPath();
      ctx2.moveTo(xLine, yScale.top);
      ctx2.lineTo(xLine, yScale.bottom);
      ctx2.stroke();
      ctx2.restore();
    },
  };

  new Chart(ctx, {
    type: "scatter",
    plugins: [targetZonePlugin, boundaryLinesPlugin],
    data: {
      datasets: [
        {
          label: "Pure PEO (80°C)",
          data: [{ x: 0.01, y: 1e-3 }],
          backgroundColor: "#bf3425",
          borderColor: "#bf3425",
          borderWidth: 2,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointStyle: "circle",
        },
        {
          label: "PEO + LiTFSI (60°C)",
          data: [{ x: 0.03, y: 5e-4 }],
          backgroundColor: "rgba(191, 52, 37, 0.6)",
          borderColor: "#bf3425",
          borderWidth: 2,
          pointRadius: 9,
          pointHoverRadius: 13,
          pointStyle: "circle",
        },
        {
          label: "Bicontinuous (60°C)",
          data: [{ x: 0.4, y: 1.5e-4 }],
          backgroundColor: "#ffffff",
          borderColor: "#bf3425",
          borderWidth: 3,
          pointRadius: 11,
          pointHoverRadius: 15,
          pointStyle: "circle",
        },
        {
          label: "RIPS Blend (RT)",
          data: [{ x: 1.2, y: 8e-6 }],
          backgroundColor: "#9d9d9c",
          borderColor: "#9d9d9c",
          borderWidth: 2,
          pointRadius: 9,
          pointHoverRadius: 13,
          pointStyle: "circle",
        },
        {
          label: "Structural Epoxy",
          data: [{ x: 3.5, y: 5e-7 }],
          backgroundColor: "#47577c",
          borderColor: "#47577c",
          borderWidth: 2,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointStyle: "circle",
        },
        {
          label: "Liquid Electrolyte (ref)",
          data: [{ x: 0.001, y: 5e-3 }],
          backgroundColor: "rgba(191, 52, 37, 0.15)",
          borderColor: "#bf3425",
          borderWidth: 1.5,
          pointRadius: 8,
          pointHoverRadius: 12,
          pointStyle: "triangle",
          borderDash: [3, 3],
        },
        {
          label: "Neat Epoxy (ref)",
          data: [{ x: 5, y: 1e-7 }],
          backgroundColor: "rgba(71, 87, 124, 0.15)",
          borderColor: "#47577c",
          borderWidth: 1.5,
          pointRadius: 8,
          pointHoverRadius: 12,
          pointStyle: "rectRot",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 20, right: 20, bottom: 5, left: 5 },
      },
      scales: {
        x: {
          type: "logarithmic",
          title: {
            display: true,
            text: "Elastic Modulus (GPa)",
            color: "#47577c",
            font: { size: 13, weight: "600", family: "Inter, sans-serif" },
          },
          min: 0.001,
          max: 15,
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: function (value) {
              var vals = [0.001, 0.01, 0.1, 1, 10];
              if (vals.indexOf(value) !== -1) return value;
              return "";
            },
          },
        },
        y: {
          type: "logarithmic",
          title: {
            display: true,
            text: "Ionic Conductivity (S/cm)",
            color: "#bf3425",
            font: { size: 13, weight: "600", family: "Inter, sans-serif" },
          },
          min: 1e-8,
          max: 1e-2,
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: function (value) {
              var logVal = Math.log10(value);
              if (Number.isInteger(logVal) && logVal >= -7 && logVal <= -2) {
                return "10^" + logVal;
              }
              return "";
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#475569",
            font: { family: "Inter, sans-serif", size: 11, weight: "600" },
            usePointStyle: true,
            pointStyleWidth: 12,
            padding: 14,
          },
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#bf3425",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 14,
          displayColors: true,
          callbacks: {
            label: function (context) {
              var ds = context.dataset.label;
              var x = context.parsed.x;
              var y = context.parsed.y;
              var yExp = Math.log10(y).toFixed(1);
              return ds + ": E = " + x + " GPa, σ = 10^(" + yExp + ") S/cm";
            },
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
    },
  });
})();
// <!-- infographic 7 -->
(function () {
  var svg = document.getElementById("sbiSvg");
  var layers = svg.querySelectorAll(".sbi-layer-group");
  var cards = document.querySelectorAll(".sbi-side-card");

  function sbiHL(layer) {
    svg.classList.add("sbi-has-hover");
    layers.forEach(function (l) {
      l.classList.remove("sbi-layer-active");
      if (l.getAttribute("data-layer") === layer)
        l.classList.add("sbi-layer-active");
    });
    cards.forEach(function (c) {
      c.classList.remove("sbi-side-active");
      if (c.getAttribute("data-layer") === layer)
        c.classList.add("sbi-side-active");
    });
  }

  function sbiClear() {
    svg.classList.remove("sbi-has-hover");
    layers.forEach(function (l) {
      l.classList.remove("sbi-layer-active");
    });
    cards.forEach(function (c) {
      c.classList.remove("sbi-side-active");
    });
  }

  // Wire SVG layer hover
  layers.forEach(function (l) {
    l.addEventListener("mouseenter", function () {
      sbiHL(l.getAttribute("data-layer"));
    });
    l.addEventListener("mouseleave", sbiClear);
  });

  window.sbiHL = sbiHL;
  window.sbiClear = sbiClear;
})();
//    <!-- infographic 8 -->
(function () {
  var commonTooltip = {
    backgroundColor: "#ffffff",
    titleColor: "#bf3425",
    bodyColor: "#1e293b",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    padding: 14,
    displayColors: true,
    callbacks: {
      label: function (ctx) {
        var ds = ctx.dataset;
        var val = ctx.parsed.y;
        var ranges = ds.ranges ? ds.ranges[ctx.dataIndex] : null;
        if (ranges) {
          return ds.label + ": " + ranges;
        }
        return ds.label + ": " + val;
      },
    },
  };

  var commonScales = {
    x: {
      grid: { display: false },
      ticks: {
        color: "#1e293b",
        font: { size: 11, weight: "600", family: "Inter, sans-serif" },
        maxRotation: 0,
      },
    },
  };

  // Modulus chart
  new Chart(document.getElementById("mpcModulusChart"), {
    type: "bar",
    data: {
      labels: [
        "Struct. Battery\n(Std-CF)",
        "Struct. Battery\n(HS-CF)",
        "CF/Epoxy\nBenchmark",
      ],
      datasets: [
        {
          label: "Elastic Modulus (GPa)",
          data: [27.5, 45, 130],
          backgroundColor: ["#9d9d9c", "#bf3425", "#47577c"],
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.65,
          ranges: ["25–30 GPa", "40–50 GPa", "120–140 GPa"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: "easeOutQuart" },
      scales: {
        x: commonScales.x,
        y: {
          beginAtZero: true,
          max: 160,
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            stepSize: 40,
          },
          title: {
            display: true,
            text: "GPa",
            color: "#47577c",
            font: { size: 11, weight: "600", family: "Inter, sans-serif" },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: commonTooltip,
      },
    },
  });

  // Strength chart
  new Chart(document.getElementById("mpcStrengthChart"), {
    type: "bar",
    data: {
      labels: [
        "Struct. Battery\n(Std-CF)",
        "Struct. Battery\n(HS-CF)",
        "CF/Epoxy\nBenchmark",
      ],
      datasets: [
        {
          label: "Tensile Strength (MPa)",
          data: [400, 750, 2250],
          backgroundColor: ["#9d9d9c", "#bf3425", "#47577c"],
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.65,
          ranges: ["300–500 MPa", "600–900 MPa", "2000–2500 MPa"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: "easeOutQuart", delay: 300 },
      scales: {
        x: commonScales.x,
        y: {
          beginAtZero: true,
          max: 2800,
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            stepSize: 500,
          },
          title: {
            display: true,
            text: "MPa",
            color: "#bf3425",
            font: { size: 11, weight: "600", family: "Inter, sans-serif" },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: commonTooltip,
      },
    },
  });

  // Animate percentage bars
  var pctSection = document.getElementById("mpcPctSection");
  setTimeout(function () {
    pctSection.classList.add("mpc-pct-animated");
  }, 500);
})();
//   <!-- infographic 9 -->
//    <!-- infographic 10 -->
(function () {
  var svg = document.getElementById("scsSvg");
  var layers = svg.querySelectorAll(".scs-layer-g");
  var cards = document.querySelectorAll(".scs-side-card");

  function scsHL(layer) {
    svg.classList.add("scs-has-hover");
    layers.forEach(function (l) {
      l.classList.remove("scs-layer-active");
      if (l.getAttribute("data-layer") === layer)
        l.classList.add("scs-layer-active");
    });
    cards.forEach(function (c) {
      c.classList.remove("scs-side-active");
      if (c.getAttribute("data-layer") === layer)
        c.classList.add("scs-side-active");
    });
  }

  function scsClear() {
    svg.classList.remove("scs-has-hover");
    layers.forEach(function (l) {
      l.classList.remove("scs-layer-active");
    });
    cards.forEach(function (c) {
      c.classList.remove("scs-side-active");
    });
  }

  layers.forEach(function (l) {
    l.addEventListener("mouseenter", function () {
      scsHL(l.getAttribute("data-layer"));
    });
    l.addEventListener("mouseleave", scsClear);
  });

  window.scsHL = scsHL;
  window.scsClear = scsClear;
})();
//    <!-- infographic 11 -->
(function () {
  var timeline = document.getElementById("sarTimeline");
  setTimeout(function () {
    timeline.classList.add("sar-animated");
  }, 500);
})();
