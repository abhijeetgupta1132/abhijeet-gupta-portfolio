from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
shots = root / "test-results"
shots.mkdir(exist_ok=True)

errors = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for name, width, height in [("mobile-390x844", 390, 844), ("tablet-768x1024", 768, 1024), ("desktop-1440x900", 1440, 900)]:
        page = browser.new_page(viewport={"width": width, "height": height}, reduced_motion="reduce")
        page.on("console", lambda msg: errors.append(f"console:{msg.type}:{msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(f"page:{exc}"))
        page.goto("http://127.0.0.1:52002", wait_until="networkidle")
        assert page.locator("h1").inner_text().startswith("ABHIJEET")
        assert page.locator("#projects .reference-project").count() == 3
        assert page.locator("#skills .technical-row").count() == 6
        assert page.locator(".hero-photo").first.is_visible()
        overflow = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not overflow, f"horizontal overflow at {name}"
        page.screenshot(path=str(shots / f"{name}.png"), full_page=True)
        if width == 390:
            page.get_by_role("button", name="Toggle navigation").click()
            assert page.locator("#mobile-nav").get_attribute("class").endswith("is-open")
            page.locator("#mobile-nav").get_by_role("link", name="projects", exact=False).click()
            assert page.url.endswith("#projects")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://127.0.0.1:52002", wait_until="networkidle")
    page.get_by_role("button", name="Start a conversation").click()
    assert "Please complete" in page.locator(".form-status").inner_text()
    page.goto("http://127.0.0.1:52002/not-a-route", wait_until="networkidle")
    assert page.get_by_text("This path doesn’t exist.").is_visible()
    browser.close()

assert not errors, "\n".join(errors)
print("PASS: 390x844, 768x1024, 1440x900; navigation, validation, 404, overflow, console")
