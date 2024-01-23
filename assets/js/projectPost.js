export default class ProjectHandler {
    constructor(parent, projects) {
        // setup initial HTML
        this.postContainer = document.createElement("div");
        parent.replaceChild(this.postContainer, document.getElementById("loading-container"))
        this.postContainer.classList.add("post-container")
        this.postContainer.classList.add("first")
        this.postContainer.id = "post"
        setTimeout(() => {
            this.postContainer.classList.remove("first")
        }, 1);

        // create post elements
        this.title = document.createElement("h2");
        this.description = document.createElement("p");
        this.icon = document.createElement("img");

        const previewDiv = document.createElement("div")
        previewDiv.classList.add("preview-container")
        this.desktop = document.createElement("img");
        this.desktop.classList.add("preview-desk");
        previewDiv.append(this.desktop)

        const info = document.createElement("div")
        const additionalInf = document.createElement("div");
        additionalInf.classList.add("additional-info");

        this.languages = document.createElement("div");
        this.languages.classList.add("languages");

        const links = document.createElement("div");
        links.classList.add("links");

        this.repo = this.createLink("Repository")
        this.project = this.createLink("Live Project")

        links.append(this.repo, this.project)

        additionalInf.append(links, this.languages);
        info.append(additionalInf, this.description)

        this.postContainer.append(this.title, previewDiv, info);

        //other variables
        this.projects = projects
        this.curPost = 1;
        this.callbacks = {
            onStart: {
                fn: undefined,
                args: undefined
            },
            onEnd: {
                fn: undefined,
                args: undefined
            }
        }

        //loading data
        this.loadPost();
        this.side = undefined;
        this.loading = false;
        this.root = document.querySelector(":root");
        this.counter = 0;
        document.getElementById("post").addEventListener("transitionend", async (e) => {
            if (e.target.classList.contains("default-pos")) {
                this.loading = false;
                e.target.classList.remove("default-pos")
                return;
            }
            if (!e.target.classList.contains(`${this.side}-fade-out`))
                return;
            this.root.style.setProperty("--fade-in-timer", "unset")
            e.target.classList.add(`${this.side}-fade-in`)
            const promise = () => new Promise((res) => {
                setTimeout(() => {
                    res();
                }, 0);
            })
            await promise()
            if (!e.target.classList.contains("default-pos"))
                this.loadPost()

            this.root.style.setProperty("--fade-in-timer", getComputedStyle(this.root).getPropertyValue("--default-fade-in-timer"))
            e.target.classList.remove(`${this.side}-fade-in`)
            e.target.classList.remove(`${this.side}-fade-out`)
            e.target.classList.add("default-pos")
        })
    }
    createLink(name) {
        const aTag = document.createElement("a");
        aTag.textContent = name;
        aTag.setAttribute("target", "_blank");
        aTag.setAttribute("referrerpolicy", "no-referrer");
        return aTag;
    }
    createTagLanguage(language) {
        const element = document.createElement("span");
        element.classList.add(language.replace(/[$&+,:;=?@#|'<>.^*()%!-]/g, "") + "-lang");
        element.textContent = language;
        return element;
    }
    startLoad(side) {
        if (!this.loading) {
            this.side = side;
            this.postContainer.classList.add(`${this.side}-fade-out`)

            this.loading = true;
        }
    }
    loadPost() {
        const dec = this.side == "left" ? 1 : -1;
        this.curPost = (this.projects.length + (this.curPost + dec)) % this.projects.length;

        this.title.textContent = this.projects[this.curPost].title;
        this.description.textContent = this.projects[this.curPost].description;
        this.desktop.src = this.projects[this.curPost].desktop;

        this.repo.href = this.projects[this.curPost].repo_url;
        if (this.projects[this.curPost].url) {
            this.project.href = this.projects[this.curPost].url;
            this.project.textContent = "Live Project"
        }
        else
            this.project.textContent = ""

        this.languages.innerHTML = ""
        this.projects[this.curPost].languages.forEach((language) => {
            this.languages.appendChild(this.createTagLanguage(language.toLowerCase()));
        })
    }
    addLoadCallback(name, fn, ...args) {
        if (this.callbacks[name]) {
            this.callbacks[name].fn = fn
            this.callbacks[name].args = args
        }
    }

    //so that we could change fill color

}

