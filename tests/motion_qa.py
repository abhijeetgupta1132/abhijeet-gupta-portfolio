from pathlib import Path
import os
from playwright.sync_api import sync_playwright

shots = Path(__file__).resolve().parents[1] / "test-results"
shots.mkdir(exist_ok=True)
url = os.environ.get("PORTFOLIO_URL", "http://localhost:3000")
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.goto(url, wait_until="networkidle")
    assert page.locator(".film-intro").count() == 0
    assert page.get_by_role("heading", level=1).is_visible()
    page.locator(".hero-photo").first.evaluate("image => image.decode()")
    page.screenshot(path=shots / "film-hero.png")

    def scroll_to(y):
        page.evaluate("y => window.scrollTo({top:y,behavior:'instant'})", y)
        page.evaluate("() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))")

    def transform(selector):
        return page.locator(selector).first.evaluate("el => getComputedStyle(el).transform")

    before = transform(".shard-0")
    scroll_to(280)
    assert transform(".shard-0") != before
    top = page.locator("#projects").evaluate("el => el.offsetTop")
    scroll_to(top - 200)
    # Project navigation must never leave cards scaled down or transparent.
    scroll_to(top + 480)
    assert transform(".reference-project") == "none"
    page.screenshot(path=shots / "film-projects.png")
    page.locator(".reference-project summary").first.click()
    assert page.locator(".reference-project").first.get_attribute("open") is not None
    page.locator(".service summary").first.click()
    assert page.locator(".service").first.get_attribute("open") is not None
    assert page.get_by_role("button", name="Pause motion").count() == 0
    assert page.get_by_role("button", name="Play motion").count() == 0
    assert page.locator(".atmosphere i").first.evaluate("el => el.getAnimations().length") > 0
    page.close()
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page.goto(url + "/#projects", wait_until="networkidle")
    cards = page.locator("#projects .reference-project")
    assert cards.evaluate_all("""cards => cards.every(card =>
      getComputedStyle(card).opacity === '1' &&
      Math.abs(card.getBoundingClientRect().width - card.offsetWidth) < 1
    )""")
    heading = page.locator("#projects h2").bounding_box()
    first_card = cards.first.bounding_box()
    assert 0 < first_card["y"] - heading["y"] - heading["height"] < 100
    browser.close()

print("PASS: motion starts automatically, hero opens directly, scroll effects run, details expand, and no motion button is shown")
