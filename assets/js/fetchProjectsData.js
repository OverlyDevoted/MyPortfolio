let origin = window.origin;
let isLocalHost = origin.includes("localhost") || origin.includes("127.0.0.1")
const response = await fetch(`${origin}${isLocalHost ? "" : "/MyPortfolio"}/assets/data/projects.json`)
export const projects = await response.json()
projects.sort((a, b) => a.id - b.id)