var ytdefer_ic_w = 73;
var ytdefer_ic_h = 52;
const yt_iconString =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48" width="100%" height="100%"><path class="ytp-large-play-button-bg" d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6C4 2.3 2.3 4.8 1.5 7.7.1 13.1 0 24 0 24s.1 10.9 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24S67.9 13.1 66.5 7.7z"></path><path d="M 45,24 27,14 27,34" fill="#fff" fill-opacity="1"></path></svg>';
var yt_icon = '<svg fill="#eb3223" ' + yt_iconString;
var yt_dark_icon = '<svg fill="#212121" fill-opacity="0.8"' + yt_iconString;
export function ytdefer_setup() {
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
    bt.style.backgroundImage =
      "url(data:image/svg+xml;base64," + window.btoa(yt_dark_icon) + ")";
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
  return function () {
    bt.style.backgroundImage =
      "url(data:image/svg+xml;base64," + window.btoa(yt_dark_icon) + ")";
  };
}
function gen_mouseover(bt) {
  return function () {
    bt.style.backgroundImage =
      "url(data:image/svg+xml;base64," + window.btoa(yt_icon) + ")";
  };
}
function gen_ytdefer_clk(i) {
  return function () {
    var d = document;
    var el = d.getElementById("ytdefer_vid" + i);
    var vid_id = el.parentNode.getAttribute("data-src");
    var player = new YT.Player(el.id, {
      height: el.style.height,
      width: el.style.width,
      videoId: vid_id,
      events: {
        onReady: function (ev) {
          ev.target.playVideo();
        },
      },
    });
  };
}
