let audio = new Audio("./static/audio.mp3");
icon = document.getElementById("upIcon");
easterImg = document.getElementById("imgclick");
loader = document.getElementById("loader");
document.querySelectorAll("body *").forEach((a) => {
	a.tabIndex = -1;
});
window.addEventListener("scroll", () => {
	500 < scrollY
		? (icon.style.cssText = 'opacity: 1;pointerEvents: "auto"')
		: (icon.style.cssText = 'opacity: 0;pointerEvents: "none";bottom: 0%;transform:scale(0);border-radius:0');
	icon.addEventListener("click", function (a) {
		a.preventDefault();
		$("#upIcon").tooltip("hide");
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
let clickCount = 0,
	fadeOutInterval;
function mousedown() {
	easterImg.classList.remove("shadow-sm");
	easterImg.style.transform = "scale(.97)";
	easterImg.style.boxShadow = "0px 0px 90px -10px rgba(190,190,190,1)";
	easterImg.style.border = "1px solid #c22424";
}
function mouseup() {
	easterImg.classList.add("shadow-sm");
	easterImg.style.transform = "scale(1)";
	easterImg.style.boxShadow = "";
	easterImg.style.border = "none";
}
if (
	(easterImg.addEventListener("click", () => {
		5 == (clickCount += 1) &&
			(toolTip[0].disable(), (clickCount = 0), (audio.volume = 0.5), audio.play(), easterAlert[0].show());
		easterImg.classList.remove("shadow-sm");
		easterImg.style.transform = "scale(.97)";
		easterImg.style.boxShadow = "0px 0px 90px -10px rgba(190,190,190,1)";
		easterImg.style.border = "1px solid #c22424";
		setTimeout(() => {
			easterImg.style.transform = "scale(1)";
			easterImg.style.boxShadow = "";
			easterImg.style.border = "none";
		}, 130);
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
	}),
	992 > screen.width)
)
	null;
else {
	let a = document.querySelectorAll(".navbar-nav a"),
		b = document.querySelectorAll("section"),
		f = new IntersectionObserver(
			(c) => {
				c.forEach((d) => {
					d.isIntersecting ? g(d.target.getAttribute("id")) : e(d.target.getAttribute("id"));
				});
			},
			{ threshold: 0.5 }
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
}
$("#igHover").hover(
	function () {
		$("#hoveredItem").text("/athena.3140");
	},
	function () {
		$("#hoveredItem").text("/athena3140");
	}
);
const toolTip = tippy("#imgclick", {
	content: "Click 5 Times To Activate The Easter Egg",
	delay: [400, 200],
	animation: "shift-toward",
	theme: "myTheme",
	multiple: !0,
});
/(Mobi|Android|iPhone|iPad|iPod)/i.test(navigator.userAgent) ||
	tippy("#upIcon", { animation: "shift-toward", content: "Back To Top", placement: "left", hideOnClick: !0 });
const easterAlert = tippy("#imgclick", {
	content: "Double click to pause the song",
	animation: "shift-toward",
	placement: "left",
	multiple: !0,
	trigger: "manual",
	hideOnClick: !1,
	delay: [200, 200],
});
$(document).ready(function () {
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
	$("form").submit(function (a) {
		a.preventDefault();
		formData = $(this).serialize();
		a = $("#name").val().trim();
		var b = $("#email").val().trim(),
			f = $("#subject").val().trim(),
			g = $("#message").val().trim();
		let e = "";
		"" === a || "" === b || "" === f || "" === g
			? ("" === a && (e += "<li>Name is required</li>"),
			  "" === b && (e += "<li>Email is required</li>"),
			  "" === f && (e += "<li>Subject is required</li>"),
			  "" === g && (e += "<li>Message is required</li>"),
			  $(".formError ul").html(e),
			  scrollError(),
			  $(".formError").slideDown())
			: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b)
			? ($(".formError").hide(),
			  $("#submit").addClass("disabled"),
			  $.ajax({
					url: "https://formsubmit.co/ajax/athena3140@gmail.com",
					method: "POST",
					accepts: "application/json",
					data: formData,
					success: function (c) {
						"true" == (c = JSON.parse(c)).success
							? ($("form").hide(),
							  $(".formAlert").show(),
							  setTimeout(() => {
									$("form").show();
									$(".formAlert").hide();
							  }, 9e3),
							  $("#submit").removeClass("disabled"),
							  $("input, textarea").val(""),
							  $("input, textarea").blur())
							: console.error("Form submission failed: " + c);
					},
					error: function (c) {
						console.error(c),
							$(".formError ul").html(c),
							$(".formError").slideDown(),
							scrollError();
					},
			  }))
			: ((e += "Please enter a valid email address."),
			  $(".formError").slideDown(),
			  scrollError(),
			  $(".formError ul").html(e));
	});

	window.addEventListener("load", () => {
		document.body.style.cssText = "overflow:hidden; height: 100svh";
		icon.style.cssText = "opacity: 0; pointer-events: none";
		setTimeout(() => {
			loader.style.cssText = "opacity:0;pointer-events:none";
			500 > scrollY
				? (document.getElementById("spinner").style.cssText = "transform:scale(7.5)")
				: (document.getElementById("spinner").style.cssText = "transform:scale(.2)");
			setTimeout(() => {
				new Typewriter("#typewriter", {
					strings: ["Athena", "Linn Myat Htet"],
					autoStart: !0,
					loop: !0,
					pauseFor: 1800,
				});
				document.getElementById("home").classList.add("animate__animated", "animate__zoomIn");
				500 > scrollY &&
					document.getElementById("navbar").classList.add("animate__animated", "animate__zoomIn");
			}, 20);
			document.body.style.cssText = "overflow: auto; height: auto";
		}, 500);
		setTimeout(() => {
			$("#loader").hide();
		}, 1e3);
	});

	scrollError = () => {
		$("#formError").length ? o() : setTimeout(o, 200);
		function o() {
			$("html, body").scrollTop($(".formError").offset().top - window.innerHeight / 2 + 150);
		}
	};
});

document.onreadystatechange = function () {
	(loadStatus = document.getElementById("loadStatus")),
		"interactive" === document.readyState
			? (loadStatus.style.width = "50%")
			: "complete" === document.readyState && (loadStatus.style.width = "100%");
};
