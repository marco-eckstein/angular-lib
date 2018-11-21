import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AngularLibCommonComponent } from "./angular-lib-common.component";

describe("AngularLibCommonComponent", () => {
    let component: AngularLibCommonComponent;
    let fixture: ComponentFixture<AngularLibCommonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AngularLibCommonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AngularLibCommonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
