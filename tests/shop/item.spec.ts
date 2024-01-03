import { test } from "../../pages/base"
import { expect } from "@playwright/test"

test.beforeEach(async ({ shopPage }) => {
  await shopPage.goto()
})

test.describe("Shop item tests", () => {
  test("Sale items have visible sale tag, old and new price", async ({
    shopPage,
  }) => {
    expect(shopPage.productSaleTag).toHaveText("Sale!")
    expect(await shopPage.getNumberOfPrices()).toBe(2)
  })

  test("Shop item hover - Add to cart displays view cart message", async ({
    shopPage,
  }) => {
    await shopPage.addToCart()
    expect(shopPage.viewCartBtn).toBeVisible()
    expect(await shopPage.getViewCartHref()).toEqual(
      "https://cms.demo.katalon.com/cart/"
    )
  })

  test("Click on page 2 displays page two of shop items", async ({
    shopPage,
  }) => {
    const itemImg = await shopPage.getProductImgHref()
    await shopPage.goToPage2()
    const secondItemImg = await shopPage.getProductImgHref()
    expect(shopPage.isValidUrl()).toBeTruthy()
    expect(itemImg).not.toBe(secondItemImg)
  })

  test("Adding non-existent page number in url displays page not found message", async ({
    shopPage,
  }) => {
    await shopPage.goToPage6()
    expect(shopPage.pageNotFoundTitle).toBeVisible()
  })

  test("Last page paginator navigates to last item page", async ({
    shopPage,
  }) => {
    const href = await shopPage.getNextPageHref()
    expect(href).toEqual("https://cms.demo.katalon.com/page/2/")
  })

  test("First page paginator navigates to first item page", async ({
    shopPage,
  }) => {
    await shopPage.goToPage2()
    const href = await shopPage.getPrevPageHref()
    expect(href).toEqual("https://cms.demo.katalon.com/page/1/")
  })

  test("Shop item image click navigates to item page", async ({ shopPage }) => {
    const href = await shopPage.getProductImgHref()
    expect(href).toBe("https://cms.demo.katalon.com/product/flying-ninja/")
  })

  // test("Add to cart adds correct item to the cart", async ({ shopPage }) => { //add cartPage
  //   const itemImg = await shopPage.getProductImgHref()
  //   await shopPage.addToCart()
  //   await shopPage.viewCart()
  //   const cartItem = page.locator(".cart_item")
  //   const cartItemImg = await cartItem
  //     .locator(".attachment-woocommerce_thumbnail")
  //     .getAttribute("src")
  //   expect(itemImg).toBe(cartItemImg)
  // })
})
