const arrowsAppear = 2000;
const arrowsBreathe = 2000;

const { projects } = await import("./fetchProjectsData.js")
import ProjectHandler from "./projectPost.js"

const projectsHandler = new ProjectHandler(document.getElementById("main"), projects)
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const shadow = document.getElementById("mouse-shadow");
let breatheInterval;
let breatheTimeout;
const registerEvents = (btn, btn2, side = "right") => {
    btn.addEventListener("click", () => {
        projectsHandler.startLoad(side)
    })
    btn.addEventListener("mouseenter", () => {
        clearInterval(breatheInterval);
        clearTimeout(breatheTimeout);
        btn.classList.add("post-btn")
        shadow.style.setProperty("--shadow-opacity","1")
        shadow.style.left = btn.textContent === "<"?"0":"100%";
        // btn2.classList.add("post-btn")
    })
    btn.addEventListener("mouseleave", () => {
        btn.classList.remove("post-btn")
        btn2.classList.remove("post-btn")

        shadow.style.setProperty("--shadow-opacity","0")
        breatheTimeout = setTimeout(() => {
            breatheInterval = setInterval(() => {
                btn.classList.toggle("post-btn")
                btn2.classList.toggle("post-btn")
            }, arrowsBreathe);
        }, arrowsAppear);
    })
    btn.addEventListener("mousemove", (e) => {
        shadow.style.transform = `translateY(${e.clientY}px)`;
    })
}
breatheTimeout = setTimeout(() => {
    breatheInterval = setInterval(() => {
        nextBtn.classList.toggle("post-btn")
        prevBtn.classList.toggle("post-btn")
    }, arrowsBreathe);
}, arrowsAppear);
registerEvents(nextBtn, prevBtn)
registerEvents(prevBtn, nextBtn, "left")