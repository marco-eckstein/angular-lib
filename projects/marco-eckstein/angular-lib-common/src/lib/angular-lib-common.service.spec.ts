import { TestBed } from "@angular/core/testing";

import { AngularLibCommonService } from "./angular-lib-common.service";

describe("AngularLibCommonService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: AngularLibCommonService = TestBed.get(AngularLibCommonService);
        expect(service).toBeTruthy();
    });
});
