let audio = new Audio("./static/audio.mp3");
icon = document.getElementById("upIcon");
easterImg = document.getElementById("imgclick");
loader = document.getElementById("loader");
document.querySelectorAll("body *").forEach((e) => {
	e.tabIndex = -1;
});
//Icon That Go To Top
window.addEventListener("scroll", () => {
	//Show To Top Icon When It's Under
	if (scrollY > 500) {
		icon.style.cssText = `opacity: 1;pointerEvents: "auto"`;
	} else {
		icon.style.cssText = `opacity: 0;pointerEvents: "none";bottom: 0%;transform:scale(0);border-radius:0`;
	}

	//Icon Onclick That Scroll To Top
	icon.addEventListener("click", function (e) {
		e.preventDefault();
		$("#upIcon").tooltip("hide");
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	});
});

//Title Change Function When Page Is Hidden
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		document.title = `| \u00A0\u00A0See You Later !`;
	} else {
		document.title = `| \u00A0\u00A0Welcome !`;
		setTimeout(() => {
			document.title = `| \u00A0\u00A0Athena's Portfolio`;
		}, 2000);
	}
});

if (window.location.href.indexOf("#formSubmit") > -1) {
	$("#loader").remove();
	$("form").css("opacity", "1");
	$("form").css("pointer-events", "none");
	$(".formAlert").hide();
	setTimeout(() => {
		$(".formAlert").show();
		$("form").css("opacity", "0");
		setTimeout(() => {
			$("form").css("opacity", "1");
			$("form").css("pointer-events", "auto");
			$(".formAlert").hide();
		}, 9000);
	}, 1000);
} else {
	$(".formAlert").hide();
}
//Load Function
window.addEventListener("load", () => {
	if (window.location.href.indexOf("#formSubmit") > -1) {
		window.scrollTo({
			top: document.getElementById("contact").offsetTop,
			behavior: "instant",
		});
		setTimeout(() => {
			$(".check-icon").show();
		}, 500);
	} else {
		document.body.style.cssText = "overflow:hidden; height: 100svh";
		icon.style.cssText = "opacity: 0; pointer-events: none";
		//Hiding The Loader After 0.3s of page Load
		setTimeout(() => {
			loader.style.cssText = "opacity:0;pointer-events:none";
			if (scrollY < 500) {
				document.getElementById("spinner").style.cssText = `transform:scale(7.5)`;
			} else {
				document.getElementById("spinner").style.cssText = `transform:scale(.2)`;
			}
			setTimeout(() => {
				document.getElementById("home").classList.add("animate__animated", "animate__zoomIn");
				if (scrollY < 500) {
					document.getElementById("navbar").classList.add("animate__animated", "animate__zoomIn");
				}
			}, 20);
			document.body.style.cssText = "overflow: auto; height: auto";
		}, 500);
	}
});

//Add More Height To Scroll Element So that Id hash link will not go under nav bar
document.querySelectorAll(".nav-item a").forEach((link) => {
	link.addEventListener("click", function (event) {
		event.preventDefault();
		var linkHref = event.target.getAttribute("href");
		var element = document.querySelector(linkHref);
		location.hash = linkHref;
		setTimeout(function () {
			history.replaceState({}, document.title, window.location.pathname);
		}, 1000);
		var elementY = element.getBoundingClientRect().top + window.pageYOffset;
		window.scrollTo({ top: elementY - document.querySelector(".navbar").offsetHeight - 10, behavior: "smooth" });
	});
});

// setTimeout(() => {
// 	console.clear();
// }, 4000);

let clickCount = 0;
let fadeOutInterval;
easterImg.addEventListener("click", () => {
	clickCount += 1;
	if (clickCount == 5) {
		toolTip[0].disable();
		clickCount = 0;
		audio.volume = 0.5;
		audio.play();
		easterAlert[0].show();
	}
	easterImg.classList.remove("shadow-sm");
	easterImg.style.transform = "scale(.97)";
	easterImg.style.boxShadow = `0px 0px 90px -10px rgba(190,190,190,1)`;
	easterImg.style.border = `1px solid #c22424`;
	setTimeout(() => {
		easterImg.style.transform = "scale(1)";
		easterImg.style.boxShadow = ``;
		easterImg.style.border = `none`;
	}, 130);
});

easterImg.addEventListener("dblclick", () => {
	easterAlert[0].hide();
	toolTip[0].enable();
	let volume = audio.volume;
	if (!audio.paused) {
		const fadeOutInterval = setInterval(() => {
			if (volume >= 0) {
				volume -= 0.05;
				audio.volume = volume;
			} else {
				clearInterval(fadeOutInterval);
				audio.pause();
			}
		}, 100);
	}
});

function mousedown() {
	easterImg.classList.remove("shadow-sm");
	easterImg.style.transform = "scale(.97)";
	easterImg.style.boxShadow = `0px 0px 90px -10px rgba(190,190,190,1)`;
	easterImg.style.border = `1px solid #c22424`;
}
function mouseup() {
	easterImg.classList.add("shadow-sm");
	easterImg.style.transform = "scale(1)";
	easterImg.style.boxShadow = ``;
	easterImg.style.border = `none`;
}
//
//
//
//
//
//
//
//
//

const navLinks = document.querySelectorAll(".navbar-nav a");
const sections = document.querySelectorAll("section");

const options = {
	threshold: 0.5, // When 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const sectionId = entry.target.getAttribute("id");
			setActiveClass(sectionId);
		} else {
			const sectionId = entry.target.getAttribute("id");
			setInactiveClass(sectionId);
		}
	});
}, options);

sections.forEach((section) => {
	observer.observe(section);
});

function setActiveClass(id) {
	navLinks.forEach((navLink) => {
		navLink.parentElement.classList.remove("outtro");
		if (navLink.getAttribute("href") === `#${id}`) {
			navLink.parentElement.classList.add("navActive");
		} else {
			navLink.parentElement.classList.remove("navActive");
		}
	});
}

function setInactiveClass(id) {
	navLinks.forEach((navLink) => {
		if (navLink.getAttribute("href") === `#${id}`) {
			navLink.parentElement.classList.add("outtro");
			setTimeout(() => {
				navLink.parentElement.classList.remove("navActive", "outtro");
			}, 200); // Remove the navActive and outtro classes after the animation is complete
		}
	});
}
