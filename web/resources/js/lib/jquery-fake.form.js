/*
* form 요소에 디자인을 입히기 위한 대체 스크립트
* Alternate script for form elements
* with jQuery
* Info - 
* Demo - 
* License - http://creativecommons.org/licenses/by-sa/2.0/kr/
*/
;
(function ($) {
	// 기본 옵션 설정
	var defaultoptions = {
		// PLACEHOLDER
		'placeholder': {
			// 해당 input에 아래 클래스 추가 또는 제거.
			classname: 'placeholder',
			// placeholder를 지원하는 브라우저에도 사용할 것인지 여부.
			useall: true
		},
		// RADIO
		// $().fakecheck() 실행시 별도로 필요한 옵션 객체를 지정할 수 있고, 지정되지 않았을 경우 기본 옵션을 따름.
		'radio': {
			// 사용할 태그명
			tagname: 'span',
			// CSS 클래스명. base 클래스명에 나머지 클래스명이 추가 또는 제거.
			// 해당 input[type="radio"] 태그에 별도 클래스명이 지정된 경우 해당 클래스명을 추가.
			classname: {
				base: 'radio',
				focus: 'focus',
				checked: 'checked',
				disabled: 'disabled'
			}
		},
		// $().fakecheck() 실행시 별도로 필요한 옵션 객체를 지정할 수 있고, 지정되지 않았을 경우 기본 옵션을 따름.
		'checkbox': {
			// 사용할 태그명
			tagname: 'span',
			// CSS 클래스명. base 클래스명에 나머지 클래스명이 추가 또는 제거.
			// 해당 input[type="checkbox"] 태그에 별도 클래스명이 지정된 경우 해당 클래스명을 추가.
			classname: {
				base: 'checkbox',
				focus: 'focus',
				checked: 'checked',
				disabled: 'disabled'
			}
		},
		// SELECT
		// $().fakeselect() 실행시 별도로 필요한 옵션 객체를 지정할 수 있고, 지정되지 않았을 경우 기본 옵션을 따름.
		'select': {
			// 타이틀
			title: {
				// 사용할 태그명
				tagname: 'span',
				// 내부에 넣을 HTML.
				// 지정되면 제일 안쪽 자식(childNodes[0])에 텍스트 지정.
				innerhtml: '<strong></strong>',
				// CSS 클래스명. base 클래스명에 나머지 클래스명이 추가 또는 제거.
				// 해당 select 태그에 별도 클래스명이 지정된 경우 해당 클래스명을 추가.
				classname: {
					base: '_sel_tit',
					focus: 'focus',
					active: 'active',
					// 옵션 레이어가 보일 때
					disabled: 'disabled'
				},
				// 대상 select 요소의 넓이를 확인할 수 없을 때 지정할 넓이
				defaultwidth: 100
			},
			// 옵션 레이어
			option: {
				// 사용할 태그명
				tagname: 'div',
				// CSS 클래스명. base 클래스명에 나머지 클래스명이 추가 또는 제거.
				// 해당 select 태그에 별도 클래스명이 지정된 경우 해당 클래스명을 추가.
				classname: {
					base: '_sel_option',
					show: 'show',
					upper: 'upper',
					// 레이어가 타이틀 상단에 위치하는 경우 추가될 클래스명
					selected: 'selected',
					// 선택된 옵션의 span 태그에 지정되는 클래스명
					disabled: 'disabled' // disabled 속성이 지정된 옵션그룹에 지정되는 클래스명
				},
				// 내부에 넣을 HTML.
				// 지정되면 제일 안쪽 자식(childNodes[0])에 아래 형식으로 옵션 목록 지정.
				// <ul>
				// 	<li><span[ class="옵션 태그에 지정된 CSS 클래스명"]> option </span></li>
				// 	<li> 또는 <li>
				// 		<strong[ class="옵션그룹 태그에 지정된 CSS 클래스명"]> optgroup </strong>
				// 		<ul>
				// 			<li><span> option </span></li>
				// 		</ul>
				// 	</li>
				// </ul>
				// * tagname이 'ul'인 경우 최상위 ul 태그는 만들지 않음.
				innerhtml: '',
				// 레이어가 타이틀 하단에 위치하는 경우 포지션
				position: -1,
				// 레이어가 타이틀 상단에 위치하는 경우 포지션
				upperposition: 1,
				// CSS z-index
				zindex: 1000003,
				// 최대 표시 개수. 이상일 경우 스크롤바 생성.
				maxlength: 11
			},
			// show|hide 효과 지정.
			// 'fade', 'slide', 'fade&slide' 또는 직접 함수 지정( ex) show: function() { ... } ).
			// 직접 지정함수 내 this는 visibility 속성이 'hidden' 처리 된 옵션 레이어 jQuery 객체.
			effect: {
				show: 'fade&slide',
				hide: 'fade&slide'
			},
			// 모바일 환경에서 사용 여부
			useinmobile: true
		}
	}
	'use strict';
	(function () {
		function U() {
			this.parentNode && this.parentNode.removeChild(this)
		}
		function d(d) {
			return parseInt(d.getAttribute("data-fakeform-index"))
		}
		function K(d, f) {
			var g, p, c = defaultoptions[d];
			if (!f) return c;
			for (g in c) if ("string" == typeof g) void 0 === f[g] && (f[g] = f[g] || c[g]);
			else for (p in f[g] = f[g] || {}, c[g]) void 0 === f[g][p] && (f[g][p] = c[g][p]);
			return f
		}
		if ($ && !$.fn.fakeform) {
			var L = void 0 !== document.ontouchstart,
				M = $(window),
				A = $(document.documentElement),
				x = null,
				G = /^[0-9]+$/,
				Q = null;
			$.fn.fakeform = function (d, f) {
				
				this.filter("select").fakeselect(d, f);
				this.filter('input[type="radio"], input[type="checkbox"]').not('.rdo_m input[type="radio"], .chk_m input[type="checkbox"]').fakecheck(d, f);
				this.filter("textarea, input").not('[type="radio"], [type="checkbox"]').fakeplaceholder(d, f);
				return this
			};
			(function () {
				function d(g) {
					var f = $(this),
						c = f.data("placeholder"),
						t = f.data("classname");
					g = g ? g.type : "blur";
					var v = this.value;
					"focus" != g || v != c || this.readOnly ? "blur" == g && (v && v != c ? f.removeClass(t) : (f.addClass(t), this.value = c)) : (f.removeClass(t), this.value = "")
				}
				var f = "placeholder" in document.createElement("input");
				$.fn.fakeplaceholder = function (g) {
					return this.each(function () {
						if ($(this).data("placeholder")) d.call(this);
						else {
							var p, c, t;
							c = this.getAttribute("placeholder");
							t = K("placeholder", g);
							!c || !t.useall && f || (p = $(this), p.data({
								placeholder: c,
								classname: t.classname
							}).removeAttr("placeholder").bind("focus blur", d), d.call(p[0]))
						}
					})
				}
			})();
			(function () {
				function x(b, d) {
					for (var C, D, r = 0, m = b.length; r < m; r++)!H.test(b[r].type) || G.test(b[r].getAttribute("data-fakeform-index")) ? $(b[r]).fakecheck("reset") : (C = b[r].className, s++, D = b[r].type.match(H)[1], currentoptions = y[s] = K(D, d), u[s] = $(b[r]).attr("data-fakeform-index", s).css({
						position: "absolute",
						left: "-999em"
					}).change(f).focus(g).blur(p), q[s] = $("<" + currentoptions.tagname + ' class="' + currentoptions.classname.base + '" data-fakeform-index="' + s + '" />').mouseenter(g).mouseleave(p).click(v).insertBefore(u[s]), u[s].insertBefore(q[s]), $('label[for="' + u[s].attr("id") + '"]').mouseenter(c).mouseleave(t), C && q[s].addClass(C), f.call(u[s][0]))
				}
				function f() {
					var b, f, g, c = d(this);
					if (G.test(c) && (b = d(this), q[b])) q[b][this.disabled ? "addClass" : "removeClass"](y[b].classname.disabled);
					if ("checkbox" == this.type) q[c] && q[c][this.checked ? "addClass" : "removeClass"](y[c].classname.checked);
					else if ("radio" == this.type && this.form && this.name) for (b = this.form[this.name], f = 0, g = b.length; f < g; f++) c = d(b[f]), q[c] && q[c][b[f].checked ? "addClass" : "removeClass"](y[c].classname.checked)
				}
				function g() {
					var b = d(this);
					q[b] && q[b].addClass(y[b].classname.focus)
				}
				function p() {
					var b = d(this);
					q[b] && q[b].removeClass(y[b].classname.focus)
				}

				function c() {
					g.call($("#" + this.htmlFor)[0])
				}
				function t() {
					p.call($("#" + this.htmlFor)[0])
				}
				function v() {
					u[d(this)].click()
				}
				var u = [],
					q = [],
					A = /^(reset|remove|disable|enable)$/,
					H = /^(checkbox|radio)$/i,
					y = [],
					E, s = -1;
				$.fn.fakecheck = function (b) {
					!b || $.isPlainObject(b) ? x(this, b) : "string" == typeof b && A.test(b) && this.each(function () {
						E[b].call(this);
						"reset" != b && E.reset.call(this)
					});
					return this
				};
				E = {
					reset: function () {
						f.call(this)
					},
					remove: function () {
						var b = d(this);
						q[b] && (q[b].remove(), u[b].removeAttr("data-fakeform-index").css({
							position: "",
							left: ""
						}), u[b] = q[b] = null)
					},
					disable: function () {
						this.disabled = "disabled"
					},
					enable: function () {
						this.removeAttribute("disabled")
					}
				}
			})();
			(function () {
				function V(a, e) {
					var z, l, b = 0,
						d = a.length;
					x || (x = $('<div style="width:100px;border:1px solid #fff;box-sizing:border-box;" />').appendTo(document.body), Q = 100 == x[0].offsetWidth, x.remove(), x = $(document.body));
					for (; b < d; b++) if (G.test(a[b].getAttribute("data-fakeform-index"))) $(a[b]).fakeselect("reset");
					else if (z = a[b].className, h++, l = n[h] = K("select", e), !L || l.useinmobile) m[h] = $(a[b]).attr("data-fakeform-index", h).css({
						position: "absolute",
						left: "-999em"
					}).change(f).keydown(g).focus(c).blur(t), k[h] = $("<" + l.title.tagname + ' class="' + l.title.classname.base + '" data-fakeform-index="' + h + '" />').html(l.title.innerhtml).bind("mouseover mousemove mouseout mousedown mouseup mouseenter mouseleave", v).click(u).insertBefore(m[h]), "none" == m[h].css("display") && k[h].hide(), l.title.widthminus = Q && "border-box" == k[h].css("boxSizing") ? 0 : parseInt(k[h].css("borderLeftWidth")) + parseInt(k[h].css("borderRightWidth")) + parseInt(k[h].css("paddingLeft")) + parseInt(k[h].css("paddingRight")), O[h] = r(k[h]), m[h].insertBefore(k[h]), k[h].before(" "), w[h] = $("<" + l.option.tagname + ' class="' + l.option.classname.base + '" data-option-width="' + (m[h].attr("data-option-width") || 0) + '" data-option-length="' + (m[h].attr("data-option-length") || l.option.maxlength) + '" />').css({
						position: "absolute",
						zIndex: l.option.zindex
					}).html(l.option.innerhtml), B[h] = r(w[h]), z && (k[h].addClass(z), w[h].addClass(z)), m[h].removeAttr("data-option-width").removeAttr("data-option-length"), N(h, !0), D(m[h][0])
				}
				function f(a) {
					var e = d(this);
					G.test(e) && (D(this), N(e, !0 === a))
				}
				function g(a) {
					a = a.keyCode;
					var e, z, b;
					if (38 == a || 40 == a) return e = d(this), z = m[e][0].options, b = z.selectedIndex, 38 == a && 0 < b ? p(e, b - 1) : 40 == a && z.length - 1 > b && p(e, b + 1), !1
				}
				function p(a, e) {
					m[a][0].options[e].selected = "selected";
					m[a].change()
				}
				function c(a) {
					a = d(this);
					k[a] && k[a].addClass(n[a].title.classname.focus)
				}
				function t(a) {
					a = d(this);
					k[a] && k[a].removeClass(n[a].title.classname.focus)
				}
				function v(a) {
					var e = d(this);
					m[e][a.type]()
				}
				function u(a) {
					a =
					d(this);
					if (m[a][0].disabled) return !1;
					if (I[a]) return q(a), !L && m[a].focus(), !1;
					if (!w[a][0].offsetWidth) {
						var e = w[a],
							b = m[a][0].options.selectedIndex,
							l = A[0].clientWidth,
							f = A[0].clientHeight,
							g = M.scrollLeft(),
							h = M.scrollTop(),
							c = k[a][0].getBoundingClientRect(),
							p = k[a][0].offsetWidth,
							s = k[a][0].offsetHeight,
							//t = Math.max(p, parseInt(e.attr("data-option-width"))),
							//2015.02.05 박현아 추가
							t = Math.max(p, parseInt($(this).prev().css('width'))),
							r, u = c.left + g - A[0].clientLeft,
							c = c.top + h - A[0].clientTop;
						r = parseInt(e.attr("data-option-length"));
						E(a);
						e.css("visibility", "hidden").appendTo(x);
						void 0 === n[a].option.widthminus && (n[a].option.widthminus = e[0].offsetWidth - e[0].clientWidth);
						
						e.css("width", t);
						
						r >= J[a].length ? e.css({
							height: "",
							overflow: "hidden"
						}) : e.css("overflow", "").css("height", H(a, b, r));
						r = e[0].offsetHeight;
						
						//c + s + r > f + h ? (c = c - r + n[a].option.position, e.addClass(n[a].option.classname.upper)) : (c = c + s + n[a].option.position, e.removeClass(n[a].option.classname.upper));
						c = c + s + n[a].option.position;//151029 수정
						t > p && u + t > l + g && (u -= t - p);
						e.css({
							left: Math.max(0, u),
							top: c,
							width: t - n[a].option.widthminus
						}).scrollTop(y(a, b))
					}
					m[a].click();
					
					var e = w[a].stop(!0),
						b = n[a].effect.show,
						l = e[0].clientHeight,
						v;
					S.test(b) ? (e.css("visibility", "visible"), "fade" == b ? (v = {
						opacity: 1
					}, e.css("opacity", 0)) : "slide" == b ? (v = {
						height: l
					}, e.css({
						height: 0,
						opacity: 1
					})) : "fade&slide" == b && (v = {
						height: l,
						opacity: 1
					}, e.css({
						height: 0,
						opacity: 0
					})), !e.hasClass(n[a].option.classname.upper) || "slide" != b && "fade&slide" != b || (v.top = parseInt(e.css("top")), e.css("top", v.top + l)), e.animate(v, T.show)) : "function" == typeof b ? b.call(e) : e.css("visibility", "visible");
					
					F = a;
					I[a] = !0;
					k[a].addClass(n[a].title.classname.active);
					return !1
				}

				function q(a) {
					var e = w[a].stop(!0),
						b = n[a].effect.hide || n[a].effect.show,
						l;
					S.test(b) ? ("fade" == b ? l = {
						opacity: 0
					} : "slide" == b ? l = {
						height: 1
					} : "fade&slide" == b && (l = {
						height: 0,
						opacity: 0
					}), !e.hasClass(n[a].option.classname.upper) || "slide" != b && "fade&slide" != b || (l.top = e[0].offsetTop + e[0].offsetHeight), e.animate(l, T.hide)) : "function" == typeof b ? b.call(e) : e.detach();
					F = -1;
					I[a] = !1;
					k[a].removeClass(n[a].title.classname.active)
					
				}
				function R() {
					-1 < F && I[F] && q(F)
				}
				function H(a, b, f) {
					a = J[a];
					for (var l = a.length, c = 0, d = 0, g, h = 0; d < l; d++) if ("span" == a[d].nodeName.toLowerCase()) {
						if (h == b) {
							d = Math.max(0, Math.min(d, l - f));
							g = Math.min(d + f, l);
							break
						}
						h++
					}
					for (; d < g; d++)(b = a[d].offsetHeight) ? c += b : d--;
					return c
				}
				function y(a, b) {
					return B[a].find("span")[b].offsetTop
				}
				function E(a) {
					var e = m[a][0].options.selectedIndex,
						d = n[a].option,
						c = [];
					"ul" != d.tagname.toLowerCase() && (c = ["<ul>"]);
					c.push(s(m[a]));
					"ul" != d.tagname.toLowerCase() && c.push("</ul>");
					B[a].html(c.join(""));
					B[a].find("span").each(function (d) {
						d == e && $(this).addClass(n[a].option.classname.selected);
						this.onclick =

						function (a, e) {
							return function (d) {
								var c;
								b: {
									for (c = m[a][0].options[e];
									"select" != c.nodeName.toLowerCase();) {
										if (c.disabled) {
											c = !0;
											break b
										}
										c = c.parentNode
									}
									c = !1
								}
								c ? b(d) : (p(a, e), !L && m[a].focus());
								return !1
							}
						}(a, d)
					});
					B[a].find("strong").click(b);
					J[a] = B[a].find("strong, span")
				}
				function s(a) {
					a = a.children("option, optgroup");
					for (var b = [], c = 0, d = a.length; c < d; c++) b.push("<li"), a[c].disabled && b.push(' class="disabled"'), a[c].getAttribute("data-fakeselect-hide") && b.push(' style="display:none;"'), b.push(">"), "optgroup" == a[c].nodeName.toLowerCase() ? (b.push('<strong class="', a[c].className, '">', a[c].label, "</strong>"), b.push("<ul>"), b.push(s($(a[c]))), b.push("</ul>")) : b.push('<span class="', a[c].className, '">', a[c].innerHTML, "</span>"), b.push("</li>");
					return b.join("")
				}
				function b(a) {
					a.stopPropagation()
				}
				function N(a, b) {
					var c, d;
					k[a] && (c = m[a], d = c[0].options, O[a].html(d.length ? d[d.selectedIndex].text : ""), b && k[a].css("width", (c[0].offsetWidth || C(c[0]) || n[a].title.defaultwidth) - n[a].title.widthminus))
				}
				function C(a) {
					a = a.currentStyle ? a.currentStyle.width : document.defaultView.getComputedStyle(a, null).width;
					return parseInt(a) || 0
				}
				function D(a) {
					var b = d(a);
					if (k[b]) k[b][a.disabled ? "addClass" : "removeClass"](n[b].title.classname.disabled)
				}
				function r(a) {
					for (; a.children().length;) a = a.children().eq(0);
					return a
				}
				var m = [],
					k = [],
					O = [],
					w = [],
					B = [],
					J = [],
					W = /^(reset|value|show|hide|remove|disable|enable)$/,
					S = /^(fade|slide|fade&slide)$/,
					n = [],
					I = [],
					F = -1,
					h = -1,
					P, T = {
						show: {
							duration: 175
						},
						hide: {
							duration: 100,
							complete: U
						}
					};
				$.fn.fakeselect = function (a, b) {
					
					!a || $.isPlainObject(a) ? V(this, a) : "string" == typeof a && W.test(a) && this.each(function () {
						P[a].call(this, b);
						"reset" != a && P.reset.call(this)
						
					});
					return this;
				};
				P = {
					reset: function () {
						f.call(this, !0)
					},
					value: function (a) {
						this.value = a
					},
					show: function () {
						var a = d(this);
						$(this).show();
						k[a] && (N(a), k[a].show())
					},
					hide: function () {
						var a = d(this);
						$(this).hide();
						k[a] && k[a].hide()
					},
					remove: function () {
						var a = d(this);
						k[a] && (k[a].remove(), w[a].remove(), m[a].removeAttr("data-fakeform-index").css({
							position: "",
							left: ""
						}), m[a] = k[a] = O[a] = w[a] = B[a] = J[a] = null)
					},
					disable: function () {
						this.disabled = "disabled"
					},
					enable: function () {
						this.removeAttribute("disabled")
					}
				};
				A.bind("click", R);
				M.bind("resize", R)
			})()
		}
	})();
})(window.jQuery); /* jquery.fill */
(function () {
	if (!window.console) {
		window.console = {};
		window.console.log = window.console.clear = window.console.error = window.console.table = function () {}
	}
})();
(function (e, t, n) {
	if (e === n) return;
	var r = t,
		i = e(r),
		s = {
			set: {
				str: "eventSet",
				resizeTime: function (e) {
					if (e === n) return;
					s.resize.time = e;
					return this
				}
			},
			bridge: {
				str: "eventBridge",
				$el: e('<div id="_EVENT_BRIDGE" />')
			},
			dictionary: {
				str: "eventDictionary",
				temp: "tempEvent",
				global: {
					LOAD: "load",
					RESIZE: "resize",
					RESIZE_STOP: "resize_stop",
					SCROLL: "scroll"
				}
			},
			resize: {
				timerID: "",
				time: 150
			}
		};
	var o = s.bridge.str,
		u = s.dictionary.str,
		a = s.set.str,
		f = s.resize.timerID;
	if (!e[o]) e[o] = s.bridge.$el;
	if (!e[u]) e[u] = s.dictionary;
	if (!e[a]) e[a] = s.set;
	i.on({
		load: function () {
			e.eventBridge.trigger(e.Event(e.eventDictionary.global.LOAD))
		},
		resize: function () {
			e.eventBridge.trigger(e.Event(e.eventDictionary.global.RESIZE));
			clearTimeout(f);
			f = setTimeout(function () {
				e.eventBridge.trigger(e.Event(e.eventDictionary.global.RESIZE_STOP))
			}, s.resize.time)
		},
		scroll: function () {
			e.eventBridge.trigger(e.Event(e.eventDictionary.global.SCROLL))
		}
	})
})(jQuery, window);
(function (e, t, n) {
	function i(e, t, n) {
		var r = n.width || e.width(),
			i = n.height || e.height(),
			s = t.width(),
			o = t.height();
		var u, a, f;
		u = r > i ? o / i : s / r;
		u = o > Math.round(i * u) ? o / i : s > r * u ? s / r : u;
		a = Math.max(s, Math.round(r * u));
		f = Math.max(o, Math.round(i * u));
		e.css({
			width: a,
			height: f,
			marginLeft: (s - a) / 2,
			marginTop: (o - f) / 2
		})
	}
	function s(e) {
		if (e == n) return;
		var t = e.target,
			r = e.parent,
			i = e.imgDataSrc = t.data("img-src"),
			s = e.isImg = a(t),
			u = e.isImgData = i != n && i != "" ? i : n,
			f = e.imgSrc = s == true ? t.attr("src") : i,
			l = e.width,
			c = e.height;
		var h = new Image;
		h.onload = function () {
			if (s == false && u != n) {
				t.css({
					backgroundImage: 'url("' + f + '")',
					backgroundRepeat: "no-repeat",
					backgroundPosition: "0 0",
					backgroundSize: "100% 100%"
				})
			}
			o(t, r, {
				width: l || h.width,
				height: c || h.height
			})
		};
		h.onerror = function (e) {
			console.log(e)
		};
		h.src = f
	}
	function o(t, n, r) {
		i(t, n, r);
		e.eventBridge.on(e.eventDictionary.global.RESIZE, function (e) {
			i(t, n, r)
		});
		e.eventBridge.on(e.eventDictionary.global.RESIZE_STOP, function (e) {
			i(t, n, r)
		})
	}
	function u() {
		e.eventBridge.off(e.eventDictionary.global.RESIZE);
		e.eventBridge.off(e.eventDictionary.global.RESIZE_STOP)
	}
	function a(e) {
		return e[0].nodeName.toLowerCase() == "img"
	}
	var r = "error -_-^?";
	e.fn.fill = function (t) {
		if (this.length == 0) return;
		var n = t || {};
		e.each(this, function () {
			var t = e(this),
				n = t.parent();
			s({
				target: t,
				parent: n
			})
		})
	};
	e.oneFill = function (t) {
		if (t == n) return;
		var r = t || {};
		s({
			target: r.target || e("#" + r.targetID),
			parent: r.outer != n ? r.outer : r.outerID != n ? e("#" + r.outerID) : r.target.parent(),
			width: r.width,
			height: r.height
		})
	};
	e.oneFillStop = function () {
		u()
	}
})(jQuery); /* jquery.placeholder.js */
(function (e, t, n) {
	function f(e) {
		var t = {},
			r = /^jQuery\d+$/;
		n.each(e.attributes, function (e, n) {
			if (n.specified && !r.test(n.name)) {
				t[n.name] = n.value
			}
		});
		return t
	}
	function l(e, r) {
		var i = this,
			s = n(i);
		if (i.value.replace (/[\r\n]/gim, '') == s.attr("placeholder").replace (/[\r\n]/gim, '') && s.hasClass("placeholder")) {
			if (s.data("placeholder-password")) {
				s = s.hide().next().show().attr("id", s.removeAttr("id").data("placeholder-id"));
				if (e === true) {
					return s[0].value = r
				}
				s.focus()
			} else {
				i.value = "";
				s.removeClass("placeholder");
				i == t.activeElement && i.select()
			}
		}
	}
	function c() {
		var e, t = this,
			r = n(t),
			i = r,
			s = this.id;
		if (t.value == "") {
			if (t.type == "password") {
				if (!r.data("placeholder-textinput")) {
					try {
						e = r.clone().attr({
							type: "text"
						})
					} catch (o) {
						e = n("<input>").attr(n.extend(f(this), {
							type: "text"
						}))
					}
					e.removeAttr("name").data({
						"placeholder-password": true,
						"placeholder-id": s
					}).bind("focus.placeholder", l);
					r.data({
						"placeholder-textinput": e,
						"placeholder-id": s
					}).before(e)
				}
				r = r.removeAttr("id").hide().prev().attr("id", s).show()
			}
			r.addClass("placeholder");
			r[0].value = r.attr("placeholder")
		} else {
			r.removeClass("placeholder")
		}
	}
	var r = "placeholder" in t.createElement("input"),
		i = "placeholder" in t.createElement("textarea"),
		s = n.fn,
		o = n.valHooks,
		u, a;
	if (r && i) {
		a = s.placeholder = function () {
			return this
		};
		a.input = a.textarea = true
	} else {
		a = s.placeholder = function () {
			var e = this;
			e.filter((r ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
				"focus.placeholder": l,
				"blur.placeholder": c
			}).data("placeholder-enabled", true).trigger("blur.placeholder");
			return e
		};
		a.input = r;
		a.textarea = i;
		u = {
			get: function (e) {
				var t = n(e);
				return t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
			},
			set: function (e, r) {
				var i = n(e);
				if (!i.data("placeholder-enabled")) {
					return e.value = r
				}
				if (r == "") {
					e.value = r;
					if (e != t.activeElement) {
						c.call(e)
					}
				} else if (i.hasClass("placeholder")) {
					l.call(e, true, r) || (e.value = r)
				} else {
					e.value = r
				}
				return i
			}
		};
		r || (o.input = u);
		i || (o.textarea = u);
		n(function () {
			n(t).delegate("form", "submit.placeholder", function () {
				var e = n(".placeholder", this).each(l);
				setTimeout(function () {
					e.each(c)
				}, 10)
			})
		});
		n(e).bind("beforeunload.placeholder", function () {
			n(".placeholder").each(function () {
				this.value = ""
			})
		})
	}

})(this, document, jQuery);
$(function () {
	$("input, textarea").placeholder()
}); /*! Video.js v4.10.2 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
;
$(function(){
	var $inputCheckRadio = $('input[type="radio"], input[type="checkbox"]'),
		cssOn = '_checked',
		cssOn2 = '_disable';
	
	/* 폼요소 라디오 포커스 및 블러 함수 */
	function inputFocusBlurEvent(e) {
		var eType = e.type,
			$this = $(this),
			$parent = $this.parent(),
			cssOn = '_radio_focus';

		if (eType == 'focus' && $this[0].checked == false) {
			$parent.addClass(cssOn);
		} else {
			$parent.removeClass(cssOn);
		}
	}
	
	/* 클릭시 이미지 변경 함수  */
	$(this).on('click', 'input[type="radio"], input[type="checkbox"]' , function(e){
		
		var $this = $(this),
			$parent = $this.parent(),
			$rootParent = $parent.parent(),
			$checkBoxList = $rootParent.parent().parent(),
			isChekBoxList = ($checkBoxList[0].className == 'checkbox-text-list') ? true : false;
		
		if (this.type == 'radio') {
			if (isChekBoxList == false) {
				
				if($rootParent.is('.input_gw')){
					$checkBoxList.find('.input_gw .rdo_l').removeClass(cssOn);
				}else{
					
					$rootParent.find('>.rdo_l, >.rdo_m, >.rdo_m2').removeClass(cssOn);
				}
				
			} else {
				
				$checkBoxList.find('>.rdo_l, >.rdo_m, >.rdo_m2').removeClass(cssOn);
			}
			$parent.addClass(cssOn);
		} else {
			
			if ($parent.hasClass(cssOn)) {
				$parent.removeClass(cssOn)
			} else {
				$parent.addClass(cssOn);
			}
		}
		$.reFake.reset(':checkbox, :radio');
	});
	/* 라디오 버튼, 체크박스 포커스 블러 함수실행 */
	$('input[type="radio"], input[type="checkbox"]').on('focus blur', inputFocusBlurEvent);
	/* 셀렉트박스 디자인 함수 실행 */
	$('select').fakeselect();
	
	
	
	/* 
	 * 라디오버튼 및 체크박스가 체크일 경우 활성화
	 * 2015.02.26 [애드캡슐 퍼블리싱 박현아] 추가  
	 */
	jQuery.setInputCheckRadio = function(){
		$.each($inputCheckRadio, function(){
			if (this.checked) {
				$(this).parent().addClass(cssOn);
			}else if (this.disabled) {
				$(this).parent().addClass(cssOn2);
			}
		});
	}
	
//	if(navigator.userAgent.match('Trident/7.0') == 'Trident/7.0' || window.navigator.userAgent.indexOf("MSIE 9") > -1) {//IE11에서 포커스 관련 오류 또는 IE9일떄
	if (window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('rv:11') > -1) {
//	if(environment.getBrowserInfo()=="IE") {//IE11에서 포커스 관련 오류
	
		$('input[type=text]').on('focus', function(){$(this).select();  });
	} 
	
	
	/* 체크 활성화 */
	//$.setInputCheckRadio();
	
	/*
	 * Part : 기본 셀렉트 높이 외 추가 옵션 
	 * 2015.10.15 [애드캡슐 퍼블리싱팀 김혜련]
	 * 보여줄 리스트 갯수 만큼 해당 셀렉트 클래스 maxlength-갯수 추가하여 사용.
	 */
	
	$(this).on('click', 'select.sel_m', function(){
		var wordArray = $(this).attr('class').split('-'),
			maxLength = Number(wordArray[1]),
			optionH = $('._sel_option li').outerHeight(),
			maxH = optionH * (maxLength+1), // 160106 수정
			selH = $('._sel_option ul').outerHeight();
		if($(this).is($("[class*='max']"))){
			if(maxH < selH){
				$('._sel_option').css({
					'height': maxH,
					'overflow' : 'auto'
				})
			}else{
				$('._sel_option').css({
					'height': maxH
				})
			}
		}
		// 160106 수정
	});
	
	$(document).on('click', function(event){
		var $target = $(event.target);
		if(!$target.is('.sel_m')){
			$(document).find('._sel_option').remove();
		}
	});
	
});

