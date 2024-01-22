export default class ProjectHandler {
    constructor(parent, initPost) {
        // setup initial HTML
        const postContainer = document.createElement("div");
        parent.replaceChild(postContainer, document.getElementById("loading-container"))
        postContainer.classList.add("post-container")

        // create post elements
        this.title = document.createElement("h2");
        this.description = document.createElement("p");
        this.icon = document.createElement("img");

        this.desktop = document.createElement("img");
        this.desktop.classList.add("preview-desk");

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
        postContainer.append(this.title, this.desktop, additionalInf, this.description);

        //loading data
        this.loadPost(initPost);
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
        element.classList.add(language.replace(/[$&+,:;=?@#|'<>.^*()%!-]/g,"") + "-lang");
        element.textContent = language;
        return element;
    }
    loadPost(post) {
        this.title.textContent = post.title;
        this.description.textContent = post.description;
        this.icon.src = post.icon;
        this.desktop.src = post.desktop;

        this.repo.href = post.repo_url;
        this.project.href = post.url;

        this.languages.innerHTML = ""
        post.languages.forEach((language) => {
            this.languages.appendChild(this.createTagLanguage(language.toLowerCase()));
        })

    }
    //so that we could change fill color
    async loadInlineIcon(link) {

    }
}

