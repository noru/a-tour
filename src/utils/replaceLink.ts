/**
 * Replace the link with a <a> tag in the raw text
 * @param raw 
 * @returns replaced
 */

export function replaceLink(raw: string): string {
  let urlReg = /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/g
  return raw.replace(urlReg, (match) => {
    return `<a href="${match}" target="__blank">${match}</a>`
  })
}