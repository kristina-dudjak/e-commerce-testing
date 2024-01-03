import { Locator, Page } from "@playwright/test"

export default class ShopPage {
  readonly page: Page
  readonly firstProduct: Locator
  readonly productImg: Locator
  readonly productSaleTag: Locator
  readonly productPrices: Locator
  readonly addToCartBtn: Locator
  readonly viewCartBtn: Locator
  readonly secondPage: Locator
  readonly pageNotFoundTitle: Locator
  readonly nextPage: Locator
  readonly prevPage: Locator
  readonly cartItem: Locator

  constructor(page: Page) {
    this.page = page
    this.firstProduct = page.locator(".product.sale").first()
    this.productImg = this.firstProduct
      .locator(".woocommerce-loop-product__link")
      .first()
    this.productSaleTag = this.firstProduct.locator(".onsale")
    this.productPrices = this.firstProduct.locator(".amount")
    this.addToCartBtn = this.firstProduct.locator(".add_to_cart_button ")
    this.viewCartBtn = this.firstProduct.getByTitle("View cart")
    this.secondPage = page.getByRole("link", { name: "2", exact: true })
    this.pageNotFoundTitle = page.getByText("Oops! That page can’t be found.")
    this.nextPage = this.page.locator(".next")
    this.prevPage = this.page.locator(".prev")
    this.cartItem = this.page.locator(".cart_item")
  }

  async goto() {
    await this.page.goto("")
  }

  async getNumberOfPrices() {
    return await this.firstProduct.locator(".amount").count()
  }

  async addToCart() {
    await this.addToCartBtn.click()
  }

  async viewCart() {
    await this.viewCartBtn.click()
  }

  async getViewCartHref() {
    return await this.viewCartBtn.getAttribute("href")
  }

  async goToPage2() {
    await this.secondPage.click()
  }

  isValidUrl() {
    console.log(this.page.url().includes("/page/2/"))
    return this.page.url().includes("/page/2/")
  }

  async goToPage6() {
    await this.page.goto(`${this.page.url()}/page/6`)
  }

  async getNextPageHref() {
    return await this.nextPage.getAttribute("href")
  }

  async getPrevPageHref() {
    return await this.prevPage.getAttribute("href")
  }

  async getProductImgHref() {
    return await this.productImg.getAttribute("href")
  }
}
