import './style.css'
import { html } from '../../README.md'
import ATour from '../../src/index'

const app = document.querySelector<HTMLDivElement>('#app')!

const defaultConfig = `{
  id: 'my-app',
  container: '#app',
  steps: [
    {
      target: '#app > h1',
      title: 'Hello',
      hint: 'This is the main title',
    },
    {
      target: '#app > h2',
      title: 'Disclaimer',
      hint: 'This lib is not very ready',
    },
    {
      target: '#app > pre:nth-child(6)',
      title: 'Installation',
      hint: 'How to install this library',
    },
    {
      target: '#app > pre:nth-child(8) > code',
      title: 'Usage',
      hint: 'A minimum example of usage',
    },
    {
      target: '#app > h2:nth-child(11)',
      title: 'TODO',
      hint: 'This an element out side of the screen',
    }
  ],
}

`

const config = `
<div class="config-wrapper">
  <textarea class="config-input" rows="40" cols="50">${defaultConfig}</textarea>
  <div class="btn-wrapper">
    <button id="apply-btn">Apply</button>
  </div>
</div>
`

app.innerHTML = `
  ${html}
  ${config}
`

app.querySelector('#apply-btn')!.addEventListener('click', () => {
  document.cookie = 'atour_inactive_my-app=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  const configInput = app.querySelector<HTMLTextAreaElement>('.config-input')!
  try {
    const config = eval(`
      (function() {
        return ${configInput.value}
      })()
    `)
    new ATour(config).start()
  } catch (e: any) {
    console.error(e);
    alert(e.message)
  }
})