(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/splitting/dist/splitting.js
  var require_splitting = __commonJS({
    "node_modules/splitting/dist/splitting.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.Splitting = factory();
      })(exports, function() {
        "use strict";
        var root = document;
        var createText = root.createTextNode.bind(root);
        function setProperty(el, varName, value) {
          el.style.setProperty(varName, value);
        }
        function appendChild(el, child) {
          return el.appendChild(child);
        }
        function createElement(parent, key, text, whitespace) {
          var el = root.createElement("span");
          key && (el.className = key);
          if (text) {
            !whitespace && el.setAttribute("data-" + key, text);
            el.textContent = text;
          }
          return parent && appendChild(parent, el) || el;
        }
        function getData(el, key) {
          return el.getAttribute("data-" + key);
        }
        function $(e, parent) {
          return !e || e.length == 0 ? (
            // null or empty string returns empty array
            []
          ) : e.nodeName ? (
            // a single element is wrapped in an array
            [e]
          ) : (
            // selector and NodeList are converted to Element[]
            [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e))
          );
        }
        function Array2D(len) {
          var a = [];
          for (; len--; ) {
            a[len] = [];
          }
          return a;
        }
        function each(items, fn) {
          items && items.some(fn);
        }
        function selectFrom(obj) {
          return function(key) {
            return obj[key];
          };
        }
        function index(element, key, items) {
          var prefix = "--" + key;
          var cssVar = prefix + "-index";
          each(items, function(items2, i) {
            if (Array.isArray(items2)) {
              each(items2, function(item) {
                setProperty(item, cssVar, i);
              });
            } else {
              setProperty(items2, cssVar, i);
            }
          });
          setProperty(element, prefix + "-total", items.length);
        }
        var plugins = {};
        function resolvePlugins(by, parent, deps) {
          var index2 = deps.indexOf(by);
          if (index2 == -1) {
            deps.unshift(by);
            each(plugins[by].depends, function(p) {
              resolvePlugins(p, by, deps);
            });
          } else {
            var indexOfParent = deps.indexOf(parent);
            deps.splice(index2, 1);
            deps.splice(indexOfParent, 0, by);
          }
          return deps;
        }
        function createPlugin(by, depends, key, split) {
          return {
            by,
            depends,
            key,
            split
          };
        }
        function resolve(by) {
          return resolvePlugins(by, 0, []).map(selectFrom(plugins));
        }
        function add(opts) {
          plugins[opts.by] = opts;
        }
        function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
          el.normalize();
          var elements = [];
          var F = document.createDocumentFragment();
          if (includePrevious) {
            elements.push(el.previousSibling);
          }
          var allElements = [];
          $(el.childNodes).some(function(next) {
            if (next.tagName && !next.hasChildNodes()) {
              allElements.push(next);
              return;
            }
            if (next.childNodes && next.childNodes.length) {
              allElements.push(next);
              elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
              return;
            }
            var wholeText = next.wholeText || "";
            var contents = wholeText.trim();
            if (contents.length) {
              if (wholeText[0] === " ") {
                allElements.push(createText(" "));
              }
              each(contents.split(splitOn), function(splitText2, i) {
                if (i && preserveWhitespace) {
                  allElements.push(createElement(F, "whitespace", " ", preserveWhitespace));
                }
                var splitEl = createElement(F, key, splitText2);
                elements.push(splitEl);
                allElements.push(splitEl);
              });
              if (wholeText[wholeText.length - 1] === " ") {
                allElements.push(createText(" "));
              }
            }
          });
          each(allElements, function(el2) {
            appendChild(F, el2);
          });
          el.innerHTML = "";
          appendChild(el, F);
          return elements;
        }
        var _ = 0;
        function copy(dest, src) {
          for (var k in src) {
            dest[k] = src[k];
          }
          return dest;
        }
        var WORDS = "words";
        var wordPlugin = createPlugin(
          /*by: */
          WORDS,
          /*depends: */
          _,
          /*key: */
          "word",
          /*split: */
          function(el) {
            return splitText(el, "word", /\s+/, 0, 1);
          }
        );
        var CHARS = "chars";
        var charPlugin = createPlugin(
          /*by: */
          CHARS,
          /*depends: */
          [WORDS],
          /*key: */
          "char",
          /*split: */
          function(el, options, ctx) {
            var results = [];
            each(ctx[WORDS], function(word, i) {
              results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
            });
            return results;
          }
        );
        function Splitting3(opts) {
          opts = opts || {};
          var key = opts.key;
          return $(opts.target || "[data-splitting]").map(function(el) {
            var ctx = el["\u{1F34C}"];
            if (!opts.force && ctx) {
              return ctx;
            }
            ctx = el["\u{1F34C}"] = { el };
            var items = resolve(opts.by || getData(el, "splitting") || CHARS);
            var opts2 = copy({}, opts);
            each(items, function(plugin) {
              if (plugin.split) {
                var pluginBy = plugin.by;
                var key2 = (key ? "-" + key : "") + plugin.key;
                var results = plugin.split(el, opts2, ctx);
                key2 && index(el, key2, results);
                ctx[pluginBy] = results;
                el.classList.add(pluginBy);
              }
            });
            el.classList.add("splitting");
            return ctx;
          });
        }
        function html(opts) {
          opts = opts || {};
          var parent = opts.target = createElement();
          parent.innerHTML = opts.content;
          Splitting3(opts);
          return parent.outerHTML;
        }
        Splitting3.html = html;
        Splitting3.add = add;
        function detectGrid(el, options, side) {
          var items = $(options.matching || el.children, el);
          var c = {};
          each(items, function(w) {
            var val = Math.round(w[side]);
            (c[val] || (c[val] = [])).push(w);
          });
          return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
        }
        function byNumber(a, b) {
          return a - b;
        }
        var linePlugin = createPlugin(
          /*by: */
          "lines",
          /*depends: */
          [WORDS],
          /*key: */
          "line",
          /*split: */
          function(el, options, ctx) {
            return detectGrid(el, { matching: ctx[WORDS] }, "offsetTop");
          }
        );
        var itemPlugin = createPlugin(
          /*by: */
          "items",
          /*depends: */
          _,
          /*key: */
          "item",
          /*split: */
          function(el, options) {
            return $(options.matching || el.children, el);
          }
        );
        var rowPlugin = createPlugin(
          /*by: */
          "rows",
          /*depends: */
          _,
          /*key: */
          "row",
          /*split: */
          function(el, options) {
            return detectGrid(el, options, "offsetTop");
          }
        );
        var columnPlugin = createPlugin(
          /*by: */
          "cols",
          /*depends: */
          _,
          /*key: */
          "col",
          /*split: */
          function(el, options) {
            return detectGrid(el, options, "offsetLeft");
          }
        );
        var gridPlugin = createPlugin(
          /*by: */
          "grid",
          /*depends: */
          ["rows", "cols"]
        );
        var LAYOUT = "layout";
        var layoutPlugin = createPlugin(
          /*by: */
          LAYOUT,
          /*depends: */
          _,
          /*key: */
          _,
          /*split: */
          function(el, opts) {
            var rows = opts.rows = +(opts.rows || getData(el, "rows") || 1);
            var columns = opts.columns = +(opts.columns || getData(el, "columns") || 1);
            opts.image = opts.image || getData(el, "image") || el.currentSrc || el.src;
            if (opts.image) {
              var img = $("img", el)[0];
              opts.image = img && (img.currentSrc || img.src);
            }
            if (opts.image) {
              setProperty(el, "background-image", "url(" + opts.image + ")");
            }
            var totalCells = rows * columns;
            var elements = [];
            var container = createElement(_, "cell-grid");
            while (totalCells--) {
              var cell = createElement(container, "cell");
              createElement(cell, "cell-inner");
              elements.push(cell);
            }
            appendChild(el, container);
            return elements;
          }
        );
        var cellRowPlugin = createPlugin(
          /*by: */
          "cellRows",
          /*depends: */
          [LAYOUT],
          /*key: */
          "row",
          /*split: */
          function(el, opts, ctx) {
            var rowCount = opts.rows;
            var result = Array2D(rowCount);
            each(ctx[LAYOUT], function(cell, i, src) {
              result[Math.floor(i / (src.length / rowCount))].push(cell);
            });
            return result;
          }
        );
        var cellColumnPlugin = createPlugin(
          /*by: */
          "cellColumns",
          /*depends: */
          [LAYOUT],
          /*key: */
          "col",
          /*split: */
          function(el, opts, ctx) {
            var columnCount = opts.columns;
            var result = Array2D(columnCount);
            each(ctx[LAYOUT], function(cell, i) {
              result[i % columnCount].push(cell);
            });
            return result;
          }
        );
        var cellPlugin = createPlugin(
          /*by: */
          "cells",
          /*depends: */
          ["cellRows", "cellColumns"],
          /*key: */
          "cell",
          /*split: */
          function(el, opt, ctx) {
            return ctx[LAYOUT];
          }
        );
        add(wordPlugin);
        add(charPlugin);
        add(linePlugin);
        add(itemPlugin);
        add(rowPlugin);
        add(columnPlugin);
        add(gridPlugin);
        add(layoutPlugin);
        add(cellRowPlugin);
        add(cellColumnPlugin);
        add(cellPlugin);
        return Splitting3;
      });
    }
  });

  // client-projects/the-lumery/heroHeadingAnimation.ts
  var import_splitting = __toESM(require_splitting());

  // client-projects/the-lumery/swapOutTaglines.ts
  function swapOutTaglines() {
    const taglineEls = Array.from(
      document.querySelectorAll(".changing-taglines__tagline")
    );
    const shuffledEls = taglineEls.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
    const container = document.querySelector(".changing-taglines__container");
    container?.replaceChildren(...shuffledEls);
    const initialDelay = 1e3;
    const inDuration = 600;
    const outDuration = 600;
    const entranceDelay = 200;
    const pause = 3e3;
    const fill = "both";
    const keyframesIn = [
      {
        offset: 0,
        transform: "translateY(100%)",
        filter: "blur(2px)",
        easing: "cubic-bezier(.26,.39,.31,1)"
      },
      { offset: 0, opacity: 0, easing: "linear" },
      { offset: 1, transform: "translateY(0)", filter: "blur(0)" },
      { offset: 1, opacity: 1 }
    ];
    const keyframesOut = [
      {
        offset: 0,
        transform: "translateY(0)",
        filter: "blur(0)",
        easing: "cubic-bezier(.69,.1,.74,.61)"
      },
      { offset: 0, opacity: 1, easing: "linear" },
      { offset: 0.75, opacity: 0 },
      { offset: 1, transform: "translateY(-100%)", filter: "blur(2px)" },
      { offset: 1, opacity: 0 }
    ];
    const swapOutEls = (index, array) => {
      const nextIndex = (index + 1) % array.length;
      const currEl = array[index];
      const nextEl = array[nextIndex];
      currEl.animate(keyframesOut, {
        delay: pause,
        duration: outDuration,
        fill
      });
      const animateNextIn = nextEl.animate(keyframesIn, {
        delay: pause + entranceDelay,
        duration: inDuration,
        fill
      });
      animateNextIn.finished.then(() => swapOutEls(nextIndex, array));
    };
    shuffledEls[0].animate(keyframesIn, { duration: inDuration, delay: initialDelay, fill }).finished.then(() => swapOutEls(0, shuffledEls));
  }

  // client-projects/the-lumery/utils.ts
  function pauseAnimations(selector) {
    const container = document.querySelector(selector);
    container?.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").map((animation) => animation.pause());
  }
  function resumeAnimations(selector) {
    const container = document.querySelector(selector);
    container?.getAnimations({ subtree: true }).filter((animation) => animation.playState === "paused").map((animation) => animation.play());
  }
  function onlyPlayWhenVisible(selector) {
    const watchEl = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resumeAnimations(selector);
        } else {
          pauseAnimations(selector);
        }
      });
    };
    const observer = new IntersectionObserver(watchEl);
    const animatedEl = document.querySelector(selector);
    if (animatedEl) {
      observer.observe(animatedEl);
    }
  }

  // client-projects/the-lumery/heroHeadingAnimation.ts
  function heroHeadingAnimation() {
    const heroSection = document.querySelector(
      ".hero-animation__trigger--section"
    );
    const heading = document.querySelector(
      ".hero-animation__trigger--heading"
    );
    if (!heroSection || !heading) {
      throw new Error("Cannot find heading or hero section for header animation");
    }
    console.log(heroSection, heading);
    const hideHeading = () => heading.style.opacity = "0";
    hideHeading();
    const changingTaglinesContainer = document.querySelector(
      ".changing-taglines__container"
    );
    let isHeroHeadingAnimating = false;
    let hasHeroAnimatedOnce = false;
    let isOutsideHeroSection = true;
    const watchHeroSection = (entries) => {
      entries.forEach((entry) => {
        if (entry.target.className.includes("hero-animation__trigger--section")) {
          if (hasHeroAnimatedOnce && !isHeroHeadingAnimating) {
            hideHeading();
          }
          if (!entry.isIntersecting) {
            isOutsideHeroSection = true;
            if (changingTaglinesContainer && hasHeroAnimatedOnce) {
              pauseAnimations(".changing-taglines__container");
            }
          }
        }
      });
    };
    const watchHeading = (entries) => {
      entries.forEach((entry) => {
        if (entry.target.className.includes("hero-animation__trigger--heading")) {
          if (entry.isIntersecting) {
            console.log(entry.target.className);
            if (isOutsideHeroSection) {
              animateHeroHeading();
              isHeroHeadingAnimating = true;
              isOutsideHeroSection = false;
              if (changingTaglinesContainer) {
                hasHeroAnimatedOnce ? resumeAnimations(".changing-taglines__container") : swapOutTaglines();
              }
            }
          }
        }
      });
    };
    let sectionObserver = new IntersectionObserver(watchHeroSection, {
      threshold: 0.25
    });
    let headingObserver = new IntersectionObserver(watchHeading, {
      threshold: 0.5
    });
    sectionObserver.observe(heroSection);
    headingObserver.observe(heading);
    function animateHeroHeading() {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!mediaQuery || mediaQuery.matches) {
        return;
      }
      const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "x",
        "y",
        "z"
      ];
      const symbols = [
        "!",
        "@",
        "(",
        ")",
        "-",
        "+",
        "=",
        "[",
        "]",
        "{",
        "}",
        ";",
        ":",
        "<",
        ">",
        ",",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
      const lettersAndSymbols = [...letters, ...letters, ...symbols];
      const { targetEl, originalEl, lines, totalChars } = prepareElement(
        ".hero-animation__target"
      );
      const MAX_ITERATIONS = 20;
      const initialFadeIn = ({ spanEl }) => spanEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100,
        fill: "forwards"
      });
      const replaceWithRandomChar = ({ spanEl }) => spanEl.innerHTML = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
      let charsStillAnimating = totalChars;
      const loop = (cell, iteration = 0) => {
        if (iteration === MAX_ITERATIONS - 1) {
          cell.spanEl.innerHTML = cell.originalChar;
          --charsStillAnimating;
        } else {
          replaceWithRandomChar(cell);
        }
        if (iteration === 0) {
          initialFadeIn(cell);
        }
        if (charsStillAnimating === 0) {
          targetEl.replaceWith(originalEl);
          isHeroHeadingAnimating = false;
          hasHeroAnimatedOnce = true;
        }
        ++iteration;
        if (iteration < MAX_ITERATIONS) {
          setTimeout(() => loop(cell, iteration), 40);
        }
      };
      lines.forEach(
        (line) => line.cells.forEach(
          (cell) => setTimeout(() => loop(cell), (cell.position + 1) * 30)
        )
      );
    }
    function prepareElement(selector = ".hero-animation__target") {
      const targetEl = document.querySelector(selector);
      if (!targetEl) {
        throw new Error("Heading element to animate not found");
      }
      const originalEl = targetEl.cloneNode(true);
      const originalContent = targetEl.innerHTML;
      const splitByLines = (0, import_splitting.default)({
        target: targetEl,
        by: "lines"
      });
      const splitByWords = splitByLines.map(
        (line) => (0, import_splitting.default)({ target: line.words })
      );
      const lines = splitByLines[0].lines.map((line, index) => {
        const charsPerLine = splitByWords[0].filter(({ el }) => line.includes(el)).map((word) => word.chars).flat();
        const cells = charsPerLine.map((spanEl, index2) => ({
          spanEl,
          position: index2,
          originalChar: spanEl.innerHTML
        }));
        return { position: index, cells };
      });
      const wrapper = document.querySelector(
        ".hero-animation__trigger--heading"
      );
      if (wrapper) {
        wrapper.style.opacity = "1";
      } else {
        throw new Error("Heading wrapper not found");
      }
      const totalChars = lines.reduce((acc, curr) => acc + curr.cells.length, 0);
      const preventLinesFromWrapping = () => {
        const wordSpans = Array.from(targetEl.children);
        const groupedByLine = wordSpans.reduce(
          (acc, curr) => {
            const lineIndex = parseInt(
              getComputedStyle(curr).getPropertyValue("--line-index")
            );
            if (curr.tagName === "BR") {
              return acc;
            }
            if (curr.className === "whitespace") {
              acc[acc.length - 1].push(curr);
              return acc;
            }
            if (!acc[lineIndex]) {
              acc[lineIndex] = [];
            }
            acc[lineIndex].push(curr);
            return acc;
          },
          []
        );
        const enclosedInBlockSpans = groupedByLine.map((line) => {
          const container = document.createElement("span");
          container.setAttribute("class", "no-wrap");
          container.setAttribute("aria-hidden", "true");
          line.forEach((el) => container.appendChild(el));
          return container;
        });
        const temporaryScreenreaderHeading = document.createElement("span");
        temporaryScreenreaderHeading.setAttribute("class", "screenreader-only");
        temporaryScreenreaderHeading.innerHTML = originalContent;
        targetEl.replaceChildren(
          temporaryScreenreaderHeading,
          ...enclosedInBlockSpans
        );
      };
      preventLinesFromWrapping();
      return { targetEl, originalEl, lines, totalChars };
    }
  }

  // client-projects/the-lumery/typeTextOn.ts
  var import_splitting2 = __toESM(require_splitting());
  function typeTextOn() {
    const typedText = document.querySelector("#typewriter");
    const textColorHsl = typedText?.dataset?.color === "white" ? "0, 0%, 100%" : "0, 0%, 11.8%";
    const transparentColor = `hsla(${textColorHsl}, 0)`;
    const visibleColor = `hsla(${textColorHsl}, 1)`;
    const cursorWidth = "2px";
    const transparentRightCursor = `${cursorWidth} 0 0 ${transparentColor}`;
    const transparentLeftCursor = "-" + transparentRightCursor;
    const visibleRightCursor = `${cursorWidth} 0 0 ${visibleColor}`;
    const visibleLeftCursor = "-" + visibleRightCursor;
    const blinkLeftCursor = [
      {
        offset: 0.4,
        boxShadow: transparentLeftCursor
      },
      {
        offset: 0.5,
        boxShadow: visibleLeftCursor
      },
      {
        offset: 0.9,
        boxShadow: visibleLeftCursor
      }
    ];
    const blinkRightCursor = [
      {
        offset: 0.2,
        boxShadow: transparentRightCursor
      },
      {
        offset: 0.3,
        boxShadow: visibleRightCursor
      },
      {
        offset: 0.7,
        boxShadow: visibleRightCursor
      },
      {
        offset: 0.8,
        boxShadow: transparentRightCursor
      }
    ];
    const typeCharacterOn = [
      {
        boxShadow: transparentRightCursor,
        color: visibleColor,
        offset: 0.2
      },
      {
        boxShadow: visibleRightCursor,
        offset: 0.3
      },
      {
        boxShadow: visibleRightCursor,
        offset: 0.99
      },
      {
        boxShadow: transparentRightCursor,
        color: visibleColor
      }
    ];
    const initialBlinkDuration = 1200;
    const infiniteBlinkDuration = 2e3;
    if (typedText) {
      let getRandomDuration = function() {
        return Math.random() * (200 - 60) + 60;
      };
      (0, import_splitting2.default)({
        target: typedText,
        by: "chars",
        key: null
      });
      const elements = typedText?.querySelectorAll(
        ".typing__link .char, .typing__link .whitespace"
      );
      elements[0].animate(blinkLeftCursor, initialBlinkDuration);
      let delay = initialBlinkDuration;
      elements?.forEach((el) => {
        const duration = getRandomDuration();
        el.animate(typeCharacterOn, {
          delay,
          duration,
          fill: "forwards"
        });
        delay += duration;
      });
      const finalCharacter = elements[elements.length - 1];
      Promise.all(
        typedText.getAnimations({ subtree: true }).map((animation) => animation.finished)
      ).then(() => {
        finalCharacter.animate(blinkRightCursor, {
          duration: infiniteBlinkDuration,
          iterations: Infinity
        });
      });
    }
  }

  // client-projects/the-lumery/ytdefer.js
  var ytdefer_ic_w = 73;
  var ytdefer_ic_h = 52;
  var yt_iconString = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48" width="100%" height="100%"><path class="ytp-large-play-button-bg" d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6C4 2.3 2.3 4.8 1.5 7.7.1 13.1 0 24 0 24s.1 10.9 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24S67.9 13.1 66.5 7.7z"></path><path d="M 45,24 27,14 27,34" fill="#fff" fill-opacity="1"></path></svg>';
  var yt_icon = '<svg fill="#eb3223" ' + yt_iconString;
  var yt_dark_icon = '<svg fill="#212121" fill-opacity="0.8"' + yt_iconString;
  function ytdefer_setup() {
    var d = document;
    var els = d.getElementsByClassName("ytdefer");
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      var ds = e.getAttribute("data-src");
      if (!ds) {
        alert("data-src missing for video");
        return;
      }
      var w = e.clientWidth;
      var h = e.clientHeight;
      var dv = d.createElement("div");
      dv.id = "ytdefer_vid" + i;
      dv.style.width = w + "px";
      dv.style.height = h + "px";
      dv.style.position = "relative";
      dv.onresize = ytdefer_resize;
      e.appendChild(dv);
      var im = d.createElement("img");
      if (e.hasAttribute("data-alt")) {
        var alt = e.getAttribute("data-alt");
        im.alt = alt;
      }
      if (e.hasAttribute("data-title")) {
        var title = e.getAttribute("data-title");
        im.title = title;
      }
      var res = "0";
      if (w > 480) {
        res = "maxresdefault";
      }
      im.src = "https://img.youtube.com/vi/" + ds + "/" + res + ".jpg";
      im.id = "ytdefer_img" + i;
      im.style.width = "100%";
      im.style.height = "100%";
      im.style.objectFit = "cover";
      im.style.position = "absolute";
      im.onclick = gen_ytdefer_clk(i);
      dv.appendChild(im);
      var bt = d.createElement("button");
      bt.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(yt_dark_icon) + ")";
      bt.id = "ytdefer_icon" + i;
      bt.setAttribute("aria-label", "Play");
      bt.style.position = "absolute";
      bt.style.border = "0";
      bt.style.backgroundColor = "transparent";
      bt.style.left = w / 2 - ytdefer_ic_w / 2 + "px";
      bt.style.top = h / 2 - ytdefer_ic_h / 2 + "px";
      bt.style.width = ytdefer_ic_w + "px";
      bt.style.height = ytdefer_ic_h + "px";
      bt.style.pointerEvents = "none";
      dv.appendChild(bt);
      im.onmouseover = gen_mouseover(bt);
      im.onmouseout = gen_mouseout(bt);
    }
    if (typeof YT == "undefined") {
      var js = d.createElement("script");
      js.type = "text/javascript";
      js.src = "https://www.youtube.com/player_api";
      d.body.appendChild(js);
    }
    window.addEventListener("resize", ytdefer_resize);
  }
  function ytdefer_resize() {
    var d = document;
    var els = d.getElementsByClassName("ytdefer");
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      var w = e.clientWidth;
      var h = e.clientHeight;
      var dv = d.getElementById("ytdefer_vid" + i);
      dv.style.width = w + "px";
      dv.style.height = h + "px";
      var ic = d.getElementById("ytdefer_icon" + i);
      if (null != ic) {
        ic.style.left = w / 2 - ytdefer_ic_w / 2 + "px";
        ic.style.top = h / 2 - ytdefer_ic_h / 2 + "px";
      }
    }
  }
  function gen_mouseout(bt) {
    return function() {
      bt.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(yt_dark_icon) + ")";
    };
  }
  function gen_mouseover(bt) {
    return function() {
      bt.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(yt_icon) + ")";
    };
  }
  function gen_ytdefer_clk(i) {
    return function() {
      var d = document;
      var el = d.getElementById("ytdefer_vid" + i);
      var vid_id = el.parentNode.getAttribute("data-src");
      var player = new YT.Player(el.id, {
        height: el.style.height,
        width: el.style.width,
        videoId: vid_id,
        events: {
          onReady: function(ev) {
            ev.target.playVideo();
          }
        }
      });
    };
  }

  // client-projects/the-lumery/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    heroHeadingAnimation();
    const tickerTapeSelector = ".ticker-tape__link";
    const tickerTapeLink = document.querySelector(tickerTapeSelector);
    onlyPlayWhenVisible(tickerTapeSelector);
    tickerTapeLink?.addEventListener(
      "mouseover",
      () => pauseAnimations(tickerTapeSelector)
    );
    tickerTapeLink?.addEventListener(
      "mouseout",
      () => resumeAnimations(tickerTapeSelector)
    );
    const typingSelector = ".typing__link";
    const typingLink = document.querySelector(typingSelector);
    if (typingLink) {
      typeTextOn();
      onlyPlayWhenVisible(typingSelector);
    }
    ytdefer_setup();
  });
})();
//# sourceMappingURL=index.js.map
