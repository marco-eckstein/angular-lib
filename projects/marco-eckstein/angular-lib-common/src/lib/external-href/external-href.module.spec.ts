import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ExternalHrefOptions } from "./external-href-options";
import { ExternalHRefDirective } from "./external-href.directive";
import { ExternalHRefModule } from "./external-href.module";

@Component({
    selector: "lib-test-component",
    template: `<a href="http://foo"></a>`,
})
class TestComponent { }

describe("ExternalHRefModule", () => {
    it("works without configuration", () => {
        test()
            .then(aElement => expect(aElement.getAttribute("target")).toBeNull());
    });
    it("works with configuration", () => {
        test({ externalHRefTargetDefaultsToBlank: true })
            .then(aElement => expect(aElement.getAttribute("target")).toBe("_blank"));
    });
    it("works with empty configuration", () => {
        test({})
            .then(aElement => expect(aElement.getAttribute("target")).toBeNull());
    });
});

function test(options?: ExternalHrefOptions): Promise<HTMLAnchorElement> {
    const externalHrefModule = options ? ExternalHRefModule.forRoot(options) : ExternalHRefModule;
    TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [externalHrefModule]
    });
    return TestBed.compileComponents().then(() => {
        const componentFixture = TestBed.createComponent(TestComponent);
        const directiveElement = componentFixture.debugElement.query(By.directive(ExternalHRefDirective));
        componentFixture.detectChanges();
        return directiveElement.nativeElement;
    });
}
