"""Record a real fresh load for reviewing the visible entrance."""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(
        viewport={"width": 1280, "height": 800},
        record_video_dir="test-results/opening-video",
        record_video_size={"width": 1280, "height": 800},
    )
    page = context.new_page()
    page.goto("http://localhost:3000", wait_until="domcontentloaded")
    page.wait_for_function('document.querySelector(".film-hero").dataset.intro === "playing"')
    page.wait_for_timeout(4500)
    video = page.video
    context.close()
    video.save_as("test-results/opening-preview.webm")
    browser.close()
