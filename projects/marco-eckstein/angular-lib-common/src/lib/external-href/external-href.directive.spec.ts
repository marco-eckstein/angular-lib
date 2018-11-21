import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ExternalHrefOptions, optionsToken } from "./external-href-options";
import { ExternalHRefDirective } from "./external-href.directive";

@Component({
    selector: "lib-test-component",
    template: `<a href="http://foo"></a>`,
})
class TestComponent {
    href = "foo";
    rel = "author";
}

describe("ExternalHRefDirective", () => {
    describe("Default config", () => {
        it("should exist", async(() => {
            test(`<a></a>`).then(args => {
                expect(args.directiveElement).not.toBeNull();
            });
        }));

        it("gets proper input", async(() => {
            test(`<a href="http://foo" rel="author"></a>`).then(args => {
                expect(args.directive.href).toBe("http://foo");
                expect(args.directive.target).toBeUndefined();
                expect(args.directive.rel).toBe("author");
            });
        }));

        it("does not change anything when target is not '_blank'", async(() => {
            test(`<a href="http://foo" rel="author"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBeNull();
                expect(args.aElement.getAttribute("rel")).toBe("author");
            });
        }));

        it("adds 'noopener noreferrer' when target is '_blank'", async(() => {
            test(`<a href="http://foo" target="_blank" rel="author"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("author noopener noreferrer");
            });
        }));

        it("does not change anything when href is internal", async(() => {
            test(`<a href="foo" target="_blank"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBeNull();
            });
        }));

        it("behaves correctly for dynamic href (1)", async(() => {
            test(`<a [href]="href" target="_blank"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBeNull();

                args.component.href = "http://foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("noopener noreferrer");

                args.component.href = "foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBeNull();
            });
        }));

        it("behaves correctly for dynamic href (2)", async(() => {
            test(`<a [href]="href" target="_blank" rel="author"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("author");

                args.component.href = "http://foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("author noopener noreferrer");

                args.component.href = "foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("author");
            });
        }));

        it("behaves correctly for multiple dynamic attributes", async(() => {
            test(`<a [href]="href" target="_blank" [rel]="rel"></a>`).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("author");

                args.component.href = "http://foo";
                args.component.rel = "external";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("external noopener noreferrer");

                args.component.href = "http://bar";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://bar");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("external noopener noreferrer");

                args.component.href = "foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("external");
            });
        }));
    });

    describe("externalHRefTargetDefaultsToBlank: true", () => {

        it("adds target '_blank'", async(() => {
            test(`<a href="http://foo"></a>`, { externalHRefTargetDefaultsToBlank: true }).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("noopener noreferrer");
            });
        }));

        it("does not add target '_blank' when there is '_self'", async(() => {
            test(
                `<a href="http://foo" target="_self"></a>`,
                { externalHRefTargetDefaultsToBlank: true }
            ).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_self");
                expect(args.aElement.getAttribute("rel")).toBeNull();
            });
        }));

        it("adds target '_blank' for dynamic href", async(() => {
            test(`<a [href]="href"></a>`, { externalHRefTargetDefaultsToBlank: true }).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBeNull();
                expect(args.aElement.getAttribute("rel")).toBeNull();

                args.component.href = "http://foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("noopener noreferrer");

                args.component.href = "foo";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBeNull();
                expect(args.aElement.getAttribute("rel")).toBeNull();
            });
        }));
    });

    describe("safeBlankRelTokens: ['noopener']", () => {
        it("only adds 'noopener'", async(() => {
            test(
                `<a href="http://foo" target="_blank"></a>`,
                { safeBlankRelTokens: ["noopener"] }
            ).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("http://foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("noopener");
            });
        }));
    });

    describe("safeBlankRelTokens: ['unsafeToken']", () => {
        it("rejects unsafe tokens", async(() => {
            test(`<a></a>`,  { safeBlankRelTokens: ["unsafeToken"] })
                .then(() => fail("Promise should have failed."))
                .catch((error: Error) => expect(error.message).toContain("unsafeToken"));
        }));
    });

    describe("isExternalHRef", () => {
        it("works", async(() => {
            test(
                `<a [href]="href" target="_blank"></a>`,
                { isExternalHRef: href => href.includes("foo") }
            ).then(args => {
                expect(args.aElement.getAttribute("href")).toBe("foo");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBe("noopener noreferrer");

                args.component.href = "http://bar";
                args.fixture.detectChanges();

                expect(args.aElement.getAttribute("href")).toBe("http://bar");
                expect(args.aElement.getAttribute("target")).toBe("_blank");
                expect(args.aElement.getAttribute("rel")).toBeNull();
            });
        }));
    });
});

function test(template: string, options: ExternalHrefOptions = {}): Promise<Arguments> {
    TestBed.configureTestingModule({
        declarations: [
            TestComponent,
            ExternalHRefDirective
        ],
        providers: [
            {
                provide: optionsToken,
                useValue: options
            }
        ]
    });
    TestBed.overrideComponent(TestComponent, {
        set: { template: template }
    });
    return TestBed.compileComponents().then(() => {
        const componentFixture = TestBed.createComponent(TestComponent);
        const directiveElement = componentFixture.debugElement.query(By.directive(ExternalHRefDirective));
        componentFixture.detectChanges();
        return {
            fixture: componentFixture,
            component: componentFixture.componentInstance,
            directiveElement: directiveElement,
            directive: directiveElement.injector.get(ExternalHRefDirective),
            aElement: directiveElement.nativeElement,
        };
    });
}

interface Arguments {
    fixture: ComponentFixture<TestComponent>;
    component: TestComponent;
    directiveElement: DebugElement;
    directive: ExternalHRefDirective;
    aElement: HTMLAnchorElement;
}
