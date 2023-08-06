let audio = new Audio("./static/audio.mp3"),
	icon = document.getElementById("upIcon"),
	easterImg = document.getElementById("imgclick"),
	loader = document.getElementById("loader"),
	clickCount = 0,
	fadeOutInterval;
onloadCallBack = () => {
	document.getElementById("year").innerText = new Date().getFullYear();
	$(".siteMoveAlert").css({ minHeight: $(".navbar").outerHeight(), top: -$(".navbar").outerHeight() });
	document.getElementById("loadStatus").style.width = "100%";
	icon.style.cssText = "opacity: 0; pointer-events: none";
	setTimeout(() => {
		loader.style.cssText = "opacity:0;pointer-events:none";
		setTimeout(() => {
			new Typewriter("#typewriter", {
				strings: ["Linn Myat Htet", "Athena"],
				autoStart: !0,
				loop: !0,
				pauseFor: 3000,
				deleteSpeed: 150,
			});
			$("#loader").detach();
		}, 1000);
		$("body").css({ overflow: "auto", height: "auto" });
		$("#home img").addClass(["animate__animated", "animate__fadeInDown"]);
		$(".name div").addClass(["animate__animated", "animate__fadeInLeft"]);
		$(".name p[class=mt-5]").addClass(["animate__animated", "animate__fadeInUp"]);
	}, 500);
	$("#igHover").hover(
		function () {
			$("#hoveredItem").text("/athena.3140");
		},
		function () {
			$("#hoveredItem").text("/athena3140");
		}
	);
	$("input, textarea").each(function () {
		$(this).data("placeholder", $(this).attr("placeholder"));
		$(this).removeAttr("placeholder");
	});
	$("input, textarea").focus(function () {
		"" === $(this).val() && $(this).attr("placeholder", $(this).data("placeholder"));
	});
	$("input, textarea").blur(function () {
		"" === $(this).val() && $(this).removeAttr("placeholder");
	});
	$("#FORMDIV").css("min-height", $("#FORMDIV").height());
	$("#submit").removeClass("disabled");
	if (window.location.hostname.includes("github.io")) {
		setTimeout(() => {
			$(".siteMoveAlert").css({ top: 0 });
		}, 10000);
	}
};
window.onload = () => {
	onloadCallBack();
	$("form").submit(function (e) {
		e.preventDefault();
		let r = $.param(
				$(this)
					.serializeArray()
					.filter((e) => "g-recaptcha-response" !== e.name)
			),
			i = $("#name").val().trim(),
			s = $("#email").val().trim(),
			a = $("#subject").val().trim(),
			l = $("#message").val().trim(),
			t = grecaptcha.getResponse(),
			o = "";
		"" === t && (o += "<li>Please complete the <b>reCAPTCHA</b> verification.</li>"),
			"" === i && (o += "<li>Name is required</li>"),
			"" === s && (o += "<li>Email is required</li>"),
			"" === a && (o += "<li>Subject is required</li>"),
			"" === l && (o += "<li>Message is required</li>"),
			"" !== o
				? ($(".formError ul").html(o), scrollError(), $(".formError").slideDown())
				: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
				? ($(".formError").hide(),
				  $("#submit").addClass("disabled"),
				  grecaptcha.reset(),
				  $.ajax({
						url: "https://formsubmit.co/ajax/134e4ab60ba2ed7bd5e8298e0d4a7e25",
						method: "POST",
						accepts: "application/json",
						data: r,
						success: function (e) {
							let r = JSON.parse(e);
							"true" === r.success
								? ($("form").hide(),
								  $(".formAlert").show(),
								  setTimeout(() => {
										$("form").show(), $(".formAlert").hide();
								  }, 9e3),
								  $("#submit").removeClass("disabled"),
								  $("input, textarea").val(""),
								  $("input, textarea").blur())
								: console.error("Form submission failed: " + r);
						},
						error: function (e) {
							console.error(e),
								$(".formError ul").html(e),
								$(".formError").slideDown(),
								scrollError();
						},
				  }))
				: ((o += "Please enter a valid email address."),
				  $(".formError").slideDown(),
				  scrollError(),
				  $(".formError ul").html(o));
	});

	scrollError = () => {
		$("#formError").length ? o() : setTimeout(o, 200);
		function o() {
			$("html, body").scrollTop($(".formError").offset().top - window.innerHeight / 2 + 150);
		}
	};
};
window.addEventListener("scroll", () => {
	500 < scrollY ? (icon.style.cssText = "top: 90%;") : (icon.style.cssText = "top: 100%;");
	icon.addEventListener("click", function (a) {
		a.preventDefault();
		$("#upIcon").tooltip("hide");
		window.scrollTo({ top: 0, left: 0, behavior: "smooth", easing: "easeInOutQuad" });
	});
});
document.addEventListener("visibilitychange", () => {
	document.hidden
		? (document.title = "| \u00a0\u00a0 See You Later !")
		: ((document.title = "| \u00a0\u00a0 Welcome !"),
		  setTimeout(() => {
				document.title = "| \u00a0\u00a0Athena's Portfolio";
		  }, 2e3));
});

//link navigation
(() => {
	document.querySelectorAll(".nav-item a,.list-inline-item a").forEach((a) => {
		a.addEventListener("click", function (b) {
			b.preventDefault();
			b = b.target.getAttribute("href");
			var f = document.querySelector(b);
			location.hash = b;
			setTimeout(function () {
				history.replaceState({}, document.title, window.location.pathname);
			}, 1e3);
			b = f.getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo({ top: b - document.querySelector(".navbar").offsetHeight - 10, behavior: "smooth" });
		});
	});
})(),
	//tooltip
	(() => {
		const easterAlert = tippy("#imgclick", {
			content: "Double click to pause the song",
			animation: "shift-toward",
			placement: "left",
			multiple: !0,
			trigger: "manual",
			hideOnClick: !1,
			delay: [200, 200],
		});
		easterImg.addEventListener("click", () => {
			5 == (clickCount += 1) &&
				(toolTip[0].disable(),
				(clickCount = 0),
				(audio.volume = 0.5),
				audio.play(),
				easterAlert[0].show());
		}),
			easterImg.addEventListener("dblclick", () => {
				easterAlert[0].hide();
				toolTip[0].enable();
				let a = audio.volume;
				if (!audio.paused) {
					let b = setInterval(() => {
						0 <= a ? ((a -= 0.05), (audio.volume = a)) : (clearInterval(b), audio.pause());
					}, 100);
				}
				clickCount = 0;
			});
		const toolTip = tippy("#imgclick", {
			content: "Click 5 Times To Activate The Easter Egg",
			animation: "shift-toward",
			theme: "myTheme",
			multiple: !0,
		});
		/(Mobi|Android|iPhone|iPad|iPod)/i.test(navigator.userAgent) ||
			tippy("#upIcon", {
				animation: "shift-toward",
				content: "Back To Top",
				placement: "left",
				hideOnClick: !0,
			});
	})(),
	//nav observer
	(() => {
		let a = document.querySelectorAll(".navbar-nav a"),
			b = document.querySelectorAll("section"),
			f = new IntersectionObserver(
				(c) => {
					c.forEach((d) => {
						d.isIntersecting ? g(d.target.getAttribute("id")) : e(d.target.getAttribute("id"));
					});
				},
				{ threshold: 0.7 }
			);
		function g(c) {
			a.forEach((d) => {
				d.parentElement.classList.remove("outtro");
				d.getAttribute("href") === `#${c}`
					? d.parentElement.classList.add("navActive")
					: d.parentElement.classList.remove("navActive");
			});
		}
		function e(c) {
			a.forEach((d) => {
				d.getAttribute("href") === `#${c}` &&
					(d.parentElement.classList.add("outtro"),
					setTimeout(() => {
						d.parentElement.classList.remove("navActive", "outtro");
					}, 200));
			});
		}
		b.forEach((c) => {
			f.observe(c);
		});
	})(),
	//loading bar
	(function () {
		const resources = Array.from(
			document.querySelectorAll(
				"link:not([data-not-load-check]),script:not([data-not-load-check]),img,audio"
			)
		).filter((resource) => resource.src || resource.href);

		let loadedResources = 0;

		Promise.all(
			resources.map((resource) => {
				return fetch(resource.src || resource.href).then(() => {
					loadedResources++;
					const percentageLoaded = (loadedResources / resources.length) * 100;
					document.getElementById("loadStatus").style.width = percentageLoaded + "%";
				});
			})
		);
	})(),
	//scroll reveal
	(() => {
		ScrollReveal({
			delay: 700,
		});
		scrollConfig = { distance: "35%", origin: "bottom" };
		ElementScroll = $(
			"body div:not(div.siteMoveAlert):not(.warpper div):not(.navbar div):not(.home div):not(h4 .hover-username):not(#reviews div):not(form .formError):not(#FORMDIV .formAlert):not(.formAlert div):not(.footer div)"
		);
		ScrollReveal().reveal(ElementScroll, scrollConfig);
		ScrollReveal().reveal($("#reviews h2"), scrollConfig);
		ScrollReveal().reveal($("#reviewCarousel"), scrollConfig);

		ScrollReveal().reveal($(".project-item")[0], { delay: 700 });
		ScrollReveal().reveal($(".project-item")[1], { delay: 900 });
		ScrollReveal().reveal($(".project-item")[2], { delay: 1100 });

		ScrollReveal().reveal($(".col-11.col-sm-5.col-lg-4.rounded")[0], { delay: 700 });
		ScrollReveal().reveal($(".mt-3.mt-sm-0.col-11.col-sm-5.col-lg-3.rounded"), { delay: 900 });
		ScrollReveal().reveal($(".col-11.col-sm-5.col-lg-4.rounded")[1], { delay: 1100 });

		ScrollReveal().reveal($(".pricing p"), { delay: 700 });
		ScrollReveal().reveal($(".pricing i.mt-3"), { delay: 900 });
		ScrollReveal().reveal($(".pricing a"), { delay: 1100 });
	})();
