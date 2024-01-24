let origin = window.origin;
console.log(origin)
const response = await fetch(`${origin}/assets/data/projects.json`)
const promise = await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 1000))

export const projects = await response.json()
projects.sort((a, b) => a.id - b.id)
