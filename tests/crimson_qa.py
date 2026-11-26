"""Browser regressions for the reference hero and readable project navigation."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

url = os.environ.get("PORTFOLIO_URL", "http://localhost:3000")
shots = Path(__file__).resolve().parents[1] / "test-results"
shots.mkdir(exist_ok=True)
errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (1024, 768), (820, 1180), (768, 1024), (390, 844), (320, 740), (844, 390)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(url, wait_until="networkidle")
        page.locator(".hero-photo").first.evaluate("img => img.decode()")
        page.wait_for_timeout(1000)
        assert "GUPTA" in page.locator("h1").inner_text()
        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth"), f"overflow at {width}"
        actions = page.locator(".hero-actions").bounding_box()
        photo = page.locator(".hero-photo").first.bounding_box()
        assert actions["y"] + actions["height"] < height, f"actions below fold {width}"
        if width <= 900 and height > width:
            assert photo["y"] >= actions["y"] + actions["height"] - 8, f"portrait overlaps actions {width}"
        page.screenshot(path=str(shots / f"crimson-{width}x{height}.png"))
        assert page.locator(".smoke").first.evaluate("el => el.getAnimations().some(a => a.playState === 'running')")
        assert page.get_by_role("button", name="Pause motion").count() == 0
        if width == 1440:
            page.mouse.move(900, 350)
            page.wait_for_timeout(700)
            first = page.locator(".hero-photo").first.evaluate("el => getComputedStyle(el).transform")
            page.mouse.move(1200, 650)
            page.wait_for_timeout(700)
            assert first != page.locator(".hero-photo").first.evaluate("el => getComputedStyle(el).transform")
            page.mouse.move(0, 0)
            page.wait_for_timeout(750)
            assert page.locator(".film-hero").evaluate("el => el.style.getPropertyValue('--pointer-x')") == "0px"
        if width <= 760:
            button = page.get_by_role("button", name="Toggle navigation")
            button.click()
            page.keyboard.press("Escape")
            assert button.get_attribute("aria-expanded") == "false"
            button.click()
            page.locator("#mobile-nav a[href='#projects']").click()
            assert button.get_attribute("aria-expanded") == "false"
        else:
            page.locator(".hero-actions a[href='#projects']").click()
        page.wait_for_timeout(1000)
        cards = page.locator(".reference-project")
        assert cards.count() == 3
        assert cards.evaluate_all("cs => cs.every(c => getComputedStyle(c).opacity === '1' && Math.abs(c.offsetWidth - c.getBoundingClientRect().width) < 2)")
        cards.first.locator("summary").click()
        assert cards.first.get_attribute("open") is not None
        assert cards.first.locator(".project-technologies").is_visible()
        if width in [1440, 390]:
            page.screenshot(path=str(shots / f"crimson-projects-{width}.png"))
        page.close()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(url + "/#projects", wait_until="networkidle")
        assert page.locator(".reference-project").first.is_visible()
        page.close()
        print(f"PASS {width}x{height}: layout, motion, navigation, project details")
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    page.goto(url, wait_until="networkidle")
    assert page.locator("h1").is_visible()
    assert page.locator(".smoke").first.evaluate("el => getComputedStyle(el).animationDuration") == "60s"
    browser.close()

assert not errors, errors
print("PASS: seven viewports, automatic motion, pointer reset, menu Escape, direct project links, no runtime errors")
