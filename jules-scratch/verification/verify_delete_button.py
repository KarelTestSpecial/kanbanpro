from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Generate unique user credentials
    unique_id = str(int(time.time()))
    username = f"testuser_{unique_id}"
    password = "password123"
    task_title = f"My Test Task {unique_id}"
    task_description = "This is a test task for verification."

    try:
        # Go to registration page
        page.goto("http://localhost:5173/register")

        # Handle the alert dialog that appears after registration
        page.on("dialog", lambda dialog: dialog.accept())

        # Register a new user
        page.get_by_label("Username").fill(username)
        page.get_by_label("Password").fill(password)
        page.get_by_role("button", name="Sign Up").click()

        # Wait for navigation to login page
        expect(page).to_have_url("http://localhost:5173/login")

        # Log in
        page.get_by_label("Username").fill(username)
        page.get_by_label("Password").fill(password)
        page.get_by_role("button", name="Sign In").click()

        # Wait for navigation to Kanban board
        expect(page).to_have_url("http://localhost:5173/kanban")
        expect(page.get_by_text("TO DO")).to_be_visible()

        # Create a new task
        page.get_by_label("Title").fill(task_title)
        page.get_by_label("Description").fill(task_description)
        page.get_by_role("button", name="Create Task").click()

        # Verify the task card is visible
        task_card = page.get_by_text(task_title)
        expect(task_card).to_be_visible()

        # Take a screenshot before deleting
        page.screenshot(path="jules-scratch/verification/before_delete.png")

        # Find the delete button within the task card and click it
        # We locate the card first, then find the delete button inside it.
        card_locator = page.locator('div.MuiCardContent-root', has_text=task_title)
        delete_button = card_locator.get_by_label("delete")
        delete_button.click()

        # Verify the task card is no longer visible
        expect(task_card).not_to_be_visible()

        # Take a screenshot after deleting
        page.screenshot(path="jules-scratch/verification/after_delete.png")

    finally:
        context.close()
        browser.close()

with sync_playwright() as p:
    run(p)
