export default class ProjectHandler {
    constructor(parent, projects) {
        // setup initial HTML
        const postContainer = document.createElement("div");
        parent.replaceChild(postContainer, document.getElementById("loading-container"))
        postContainer.classList.add("post-container")

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

        postContainer.append(this.title, previewDiv, info);


        //other variables
        this.projects = projects
        this.curPost = -1;

        //loading data
        this.loadPost();
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
    loadPost(decrement = false) {
        
        const dec = decrement ? -1 : 1;
        this.curPost = (this.projects.length + (this.curPost + dec)) % this.projects.length;

        this.title.textContent = this.projects[this.curPost].title;
        this.description.textContent = this.projects[this.curPost].description;
        this.icon.src = this.projects[this.curPost].icon;
        this.desktop.src = this.projects[this.curPost].desktop;

        this.repo.href = this.projects[this.curPost].repo_url;
        this.project.href = this.projects[this.curPost].url;

        this.languages.innerHTML = ""
        this.projects[this.curPost].languages.forEach((language) => {
            this.languages.appendChild(this.createTagLanguage(language.toLowerCase()));
        })
    }
    //so that we could change fill color
    async loadInlineIcon(link) {

    }
}

