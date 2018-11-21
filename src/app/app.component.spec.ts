import { TestBed } from "@angular/core/testing";
import { ExternalHRefModule } from "@marco-eckstein/angular-lib-common";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    it("should create the app", () => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        });
    });
});

describe("ExternalHRefModule import", () => {
    it("should work without configuration", () => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [ExternalHRefModule],
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.querySelector(".a1").getAttribute("target")).toBeNull();
            expect(rootElement.querySelector(".a1").getAttribute("rel")).toBeNull();
            expect(rootElement.querySelector(".a2").getAttribute("target")).toBe("_blank");
            expect(rootElement.querySelector(".a2").getAttribute("rel")).toBeNull();
            expect(rootElement.querySelector(".a3").getAttribute("target")).toBeNull();
            expect(rootElement.querySelector(".a3").getAttribute("rel")).toBeNull();
        });
    });

    it("should work with configuration", () => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [ExternalHRefModule.forRoot({ externalHRefTargetDefaultsToBlank: true })],
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.querySelector(".a1").getAttribute("target")).toBe("_blank");
            expect(rootElement.querySelector(".a1").getAttribute("rel")).toBe("noopener noreferrer");
            expect(rootElement.querySelector(".a2").getAttribute("target")).toBe("_blank");
            expect(rootElement.querySelector(".a2").getAttribute("rel")).toBeNull();
            expect(rootElement.querySelector(".a3").getAttribute("target")).toBeNull();
            expect(rootElement.querySelector(".a3").getAttribute("rel")).toBeNull();
        });
    });
});
