import { test as base } from "@playwright/test"
import ShopPage from "./shopPage"

export const test = base.extend<{ shopPage: ShopPage }>({
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page))
  },
})
// exports.expect = base.expect;
