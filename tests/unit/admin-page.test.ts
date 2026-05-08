import { describe, expect, test } from 'bun:test'
import { renderAdminPage } from '../../src/admin-page'

describe('admin page shell', () => {
  test('renders a boot skeleton outside the client root before the app loads', () => {
    const html = renderAdminPage('/owner/example')

    expect(html).toContain('data-edgegist-boot-shell')
    expect(html).toContain('aria-busy="true"')
    expect(html).toContain('eg-boot-detail')
    expect(html).toContain('<div id="root"></div>')
    expect(html.indexOf('data-edgegist-boot-shell')).toBeLessThan(html.indexOf('<div id="root"></div>'))
  })

  test('renders the detail boot skeleton for owner detail routes', () => {
    const html = renderAdminPage('/owner/example')

    expect(html).toContain('data-edgegist-boot-shell')
    expect(html).toContain('eg-boot-detail')
  })

  test('adds owner-scoped PWA metadata and service worker registration', () => {
    const html = renderAdminPage('/owner%20name/example')

    expect(html).toContain('<link rel="manifest" href="/owner%20name/manifest.webmanifest" />')
    expect(html).toContain('<link rel="icon" href="/icons/edgegist.svg" type="image/svg+xml" />')
    expect(html).toContain("navigator.serviceWorker.register('/owner%20name/edgegist-sw.js', { scope: '/owner%20name/' })")
  })

  test('does not render the detail boot skeleton for the new gist route', () => {
    const html = renderAdminPage('/owner/new')

    expect(html).toContain('data-edgegist-boot-shell')
    expect(html).not.toContain('<section class="eg-boot-detail">')
  })
})
