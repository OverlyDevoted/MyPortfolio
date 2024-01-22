export default class ProjectHandler {
    constructor(parent, initPost) {
        this.parent = parent;
        this.title = document.createElement("h2");
        this.description = document.createElement("p");
        this.icon = document.createElement("img");
        
        this.desktop = document.createElement("img");
        this.desktop.classList.add("preview-desk")

        this.loadPost(initPost);

        this.div = document.createElement("div");
        this.innerContainer = document.createElement("div");
        this.innerContainer.append(this.title, this.description, this.icon, this.desktop);
        this.div.append(this.innerContainer);
        this.parent.innerHTML = this.div.innerHTML;
    }
    loadPost(post) {
        console.log(post)
        this.title.textContent = post.title;
        this.description.textContent = post.description;
        this.icon.src = post.icon;
        this.desktop.src = post.desktop;
    }
    //so that we could change fill color
    async loadInlineIcon(link) {

    }
}

