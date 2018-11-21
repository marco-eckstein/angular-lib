import { AppPage } from "./app.po";

describe("workspace-project App", () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it("should correctly integrate ExternalHRefModule", () => {
        page.navigateTo();
        expect(page.getAnchorTarget("a1")).toBe("_blank");
        expect(page.getAnchorRel("a1")).toBe("noopener noreferrer");
        expect(page.getAnchorTarget("a2")).toBe("_blank");
        expect(page.getAnchorRel("a2")).toBe("");
        expect(page.getAnchorTarget("a3")).toBe("");
        expect(page.getAnchorRel("a3")).toBe("");
    });
});
