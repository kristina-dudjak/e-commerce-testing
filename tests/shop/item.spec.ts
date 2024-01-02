import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("")
})

test.describe("Shop item tests", () => {
  test("Sale items have visible sale tag, old and new price", async ({
    page,
  }) => {
    const item = page.locator(".product.sale").first()
    expect(item.locator(".onsale")).toHaveText("Sale!")
    expect(await item.locator(".amount").count()).toBe(2)
  })

  test("Shop item hover - Add to cart displays view cart message", async ({
    page,
  }) => {
    const item = page.locator(".product.sale").first()
    await item.locator(".add_to_cart_button ").click()
    const cart = item.getByTitle("View cart")
    expect(cart).toBeVisible()
    expect(await cart.getAttribute("href")).toEqual(
      "https://cms.demo.katalon.com/cart/"
    )
  })

  test("Click on page 2 displays page two of shop items", async ({ page }) => {
    const item = page.locator(".product.sale").first()
    await page.getByRole("link", { name: "2", exact: true }).click()
    const secondItem = page.locator(".product.sale").first()
    expect(page.url().includes("/page/2/")).toBeTruthy()
    expect(item).not.toBe(secondItem)
  })

  test("Adding non-existent page number in url displays page not found message", async ({
    page,
  }) => {
    await page.goto(`${page.url()}/page/6`)
    expect(page.getByText("Oops! That page can’t be found.")).toBeVisible()
  })

  test("Last page paginator navigates to last item page", async ({ page }) => {
    const href = await page.locator(".next").getAttribute("href")
    expect(href).toEqual("https://cms.demo.katalon.com/page/2/")
  })

  test("First page paginator navigates to first item page", async ({
    page,
  }) => {
    await page.goto("https://cms.demo.katalon.com/page/2/")
    const href = await page.locator(".prev").getAttribute("href")
    expect(href).toEqual("https://cms.demo.katalon.com/page/1/")
  })

  test("Shop item image click navigates to item page", async ({ page }) => {
    const item = page.locator(".product.sale").first()
    const href = await item
      .locator(".woocommerce-loop-product__link")
      .first()
      .getAttribute("href")
    expect(href).toBe("https://cms.demo.katalon.com/product/flying-ninja/")
  })

  test("Add to cart adds correct item to the cart", async ({ page }) => {
    const item = page.locator(".product.sale").first()
    const itemImg = await item
      .locator(".attachment-woocommerce_thumbnail")
      .getAttribute("src")
    await item.locator(".add_to_cart_button ").click()
    await item.getByTitle("View cart").click()
    const cartItem = page.locator(".cart_item")
    const cartItemImg = await cartItem
      .locator(".attachment-woocommerce_thumbnail")
      .getAttribute("src")
    expect(itemImg).toBe(cartItemImg)
  })
})
