const { projects } = await import("./fetchProjectsData.js")
import ProjectHandler from "./projectPost.js"

const projectsHandler = new ProjectHandler(document.getElementById("main"), projects)

const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
let breatheInterval;
let breatheTimeout;
const registerEvents = (btn, btn2, back = false) => {
    btn.addEventListener("click", () => {
        projectsHandler.loadPost(back)

    })
    btn.addEventListener("mouseenter", () => {
        clearInterval(breatheInterval);
        clearTimeout(breatheTimeout);
        btn.classList.add("post-btn")
        btn2.classList.add("post-btn")
    })
    btn.addEventListener("mouseleave", () => {
        btn.classList.remove("post-btn")
        btn2.classList.remove("post-btn")
        breatheTimeout = setTimeout(() => {
            breatheInterval = setInterval(() => {
                btn.classList.toggle("post-btn")
                btn2.classList.toggle("post-btn")

            }, 2000);
        }, 10000);
    })
}
registerEvents(nextBtn, prevBtn)
registerEvents(prevBtn, nextBtn, true)