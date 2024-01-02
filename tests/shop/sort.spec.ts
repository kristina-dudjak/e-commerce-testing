import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("")
  await page.getByTitle("Default sorting").click()
})

test.describe("Sort tests", () => {
  test("Sort price low to high displays items in ascending price order", async ({
    page,
  }) => {
    await page
      .getByRole("treeitem", { name: "Sort by price: low to high" })
      .click()

    let previousPrice = 0
    for (const item of await page.locator(".product").all()) {
      const priceText = await item.locator(".amount").last().innerText()
      const price = parseFloat(priceText.replace("$", ""))
      expect(price >= previousPrice).toBeTruthy()
      previousPrice = price
    }
  })

  test("Sort price high to low displays items in descending price order", async ({
    page,
  }) => {
    await page
      .getByRole("treeitem", { name: "Sort by price: high to low" })
      .click()

    let previousPrice = Number.MAX_VALUE
    for (const item of await page.locator(".product").all()) {
      const priceText = await item.locator(".amount").last().innerText()
      const price = parseFloat(priceText.replace("$", ""))
      expect(price <= previousPrice).toBeTruthy()
      previousPrice = price
    }
  })

  test("Sort by popularity sorts items accordingly", async ({ page }) => {
    await page.getByRole("treeitem", { name: "Sort by popularity" }).click()
    expect(page.url().includes("?orderby=popularity")).toBeTruthy()
  })

  test("Sort by average rating sorts items accordingly", async ({ page }) => {
    await page.getByRole("treeitem", { name: "Sort by average rating" }).click()
    expect(page.url().includes("?orderby=rating")).toBeTruthy()
  })

  test("Sort by latest sorts items accordingly", async ({ page }) => {
    await page.getByRole("treeitem", { name: "Sort by latest" }).click()
    expect(page.url().includes("?orderby=date")).toBeTruthy()
  })
})
