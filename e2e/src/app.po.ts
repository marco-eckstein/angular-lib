import { browser, by, element, ElementFinder, promise } from "protractor";

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getAnchorTarget(cssClass: string): promise.Promise<string> {
        return this.getAnchorElement(cssClass).getAttribute("target");
    }

    getAnchorRel(cssClass: string): promise.Promise<string> {
        return this.getAnchorElement(cssClass).getAttribute("rel");
    }

    private getAnchorElement(cssClass: string): ElementFinder {
        return element(by.css(`.${cssClass}`));
    }
}
