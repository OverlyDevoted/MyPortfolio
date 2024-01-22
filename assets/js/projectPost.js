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
        this.desktop.classList.add("preview-desk")

        postContainer.append(this.title, this.description, this.desktop)

        //loading data
        this.loadPost(initPost);
    }
    loadPost(post) {
        this.title.textContent = post.title;
        this.description.textContent = post.description;
        this.icon.src = post.icon;
        this.desktop.src = post.desktop;
    }
    //so that we could change fill color
    async loadInlineIcon(link) {

    }
}

