from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height, reduced in [(1440, 900, 'no-preference'), (390, 844, 'no-preference'), (390, 844, 'reduce')]:
        page = browser.new_page(viewport={'width': width, 'height': height}, reduced_motion=reduced)
        def delay_image(route):
            page.wait_for_timeout(3000)
            route.continue_()
        page.route('**/_next/image**', delay_image)
        page.goto('http://localhost:3000', wait_until='domcontentloaded')
        page.wait_for_function('document.querySelector(".film-hero").dataset.intro === "playing"')
        assert page.locator('.hero-photo').first.evaluate('el => el.complete && el.naturalWidth > 0')
        hero = page.locator('.film-hero')
        if reduced == 'no-preference':
            assert hero.evaluate('el => getComputedStyle(el).transform') != 'none'
        panels = page.locator('.panel-arrival')
        assert panels.count() == 4
        start = panels.first.evaluate('el => getComputedStyle(el).opacity')
        assert float(start) < .8
        page.wait_for_timeout(600)
        middle = float(panels.first.evaluate('el => getComputedStyle(el).opacity'))
        assert float(start) < middle < 1
        page.wait_for_timeout(3000)
        assert hero.evaluate('el => getComputedStyle(el).transform') in ['none', 'matrix(1, 0, 0, 1, 0, 0)']
        assert panels.first.evaluate('el => getComputedStyle(el).opacity') == '1'
        assert panels.first.evaluate('el => getComputedStyle(el).transform') in ['none', 'matrix(1, 0, 0, 1, 0, 0)']
        page.wait_for_timeout(2400)
        assert page.locator('.hero-actions').is_visible()
        assert page.locator('.film-intro').count() == 0
        assert page.locator('.smoke').first.evaluate('el => el.getAnimations().some(a => a.playState === "running")')
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')
        page.unroute('**/_next/image**')
        page.reload(wait_until='domcontentloaded')
        page.wait_for_function('document.querySelector(".film-hero").dataset.intro === "playing"')
        assert float(panels.first.evaluate('el => getComputedStyle(el).opacity')) < .8
        print(f'PASS actual delayed-image opening and reload {width}x{height}, motion={reduced}')
        page.close()
    browser.close()
