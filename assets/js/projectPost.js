import { months } from "./constants/months.js";

export default class ProjectHandler {
  constructor(parent, projects) {
    // setup initial HTML
    this.postContainer = document.createElement("article");
    parent.replaceChild(
      this.postContainer,
      document.getElementById("loading-container")
    );
    this.postContainer.classList.add("post-container");
    this.postContainer.classList.add("first");
    this.postContainer.id = "post";
    setTimeout(() => {
      this.postContainer.classList.remove("first");
    }, 1);

    // create post elements
    this.title = document.createElement("h2");
    this.date = document.createElement("h3");
    this.description = document.createElement("p");
    this.icon = document.createElement("img");

    const previewDiv = document.createElement("section");
    previewDiv.classList.add("preview-container");
    this.desktop = document.createElement("img");
    this.desktop.classList.add("preview-desk");
    previewDiv.append(this.desktop);

    const info = document.createElement("section");
    const additionalInf = document.createElement("div");
    additionalInf.classList.add("additional-info");

    this.languages = document.createElement("div");
    this.languages.classList.add("languages");

    this.links = document.createElement("div");
    this.links.classList.add("links");

    additionalInf.append(this.links, this.languages);
    info.append(additionalInf, this.description);

    this.postContainer.append(this.title, this.date, previewDiv, info);

    //other variables
    this.projects = projects;
    this.curPost = 1;

    //loading data
    this.loadPost();
    this.side = undefined;
    this.loading = false;
    this.root = document.querySelector(":root");
    this.counter = 0;
    document
      .getElementById("post")
      .addEventListener("transitionend", async (e) => {
        if (e.target.classList.contains("default-pos")) {
          this.loading = false;
          e.target.classList.remove("default-pos");
          return;
        }
        if (!e.target.classList.contains(`${this.side}-fade-out`)) return;
        this.root.style.setProperty("--fade-in-timer", "unset");
        e.target.classList.add(`${this.side}-fade-in`);
        const promise = () =>
          new Promise((res) => {
            setTimeout(() => {
              res();
            }, 0);
          });
        await promise();
        if (!e.target.classList.contains("default-pos")) this.loadPost();

        this.root.style.setProperty(
          "--fade-in-timer",
          getComputedStyle(this.root).getPropertyValue(
            "--default-fade-in-timer"
          )
        );
        e.target.classList.remove(`${this.side}-fade-in`);
        e.target.classList.remove(`${this.side}-fade-out`);
        e.target.classList.add("default-pos");
      });
  }

  createLink(link) {
    const aTag = document.createElement("a");
    aTag.textContent = link.text;
    aTag.setAttribute("href", link.url);
    aTag.setAttribute("target", "_blank");
    aTag.setAttribute("referrerpolicy", "no-referrer");
    return aTag;
  }

  createTagLanguage(language) {
    const element = document.createElement("span");
    const langFormatted = language.toLowerCase();
    element.classList.add(
      langFormatted.replace(/[$&+,:;=?@#|'<>.^*()%!-]/g, "") + "-lang"
    );
    element.textContent = langFormatted;
    return element;
  }

  startLoad(side) {
    if (!this.loading) {
      this.side = side;
      this.postContainer.classList.add(`${this.side}-fade-out`);

      this.loading = true;
    }
  }

  loadPost() {
    const dec = this.side == "left" ? 1 : -1;
    this.curPost =
      (this.projects.length + (this.curPost + dec)) % this.projects.length;

    this.title.textContent = this.projects[this.curPost].title;
    const postDate = new Date(this.projects[this.curPost].date * 1000);
    const formatedDate = `${postDate.getFullYear()} ${
      months[postDate.getUTCMonth()]
    }`;
    this.date.textContent = formatedDate;
    this.description.textContent = this.projects[this.curPost].description;
    this.desktop.src = this.projects[this.curPost].desktop;

    this.links.innerHTML = "";
    this.projects[this.curPost].links.map((link) => {
      const linkElement = this.createLink(link);
      this.links.append(linkElement);
    });

    this.languages.innerHTML = "";
    this.projects[this.curPost].languages.forEach((language) => {
      this.languages.appendChild(this.createTagLanguage(language));
    });
  }
}
