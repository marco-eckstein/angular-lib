import { Directive, ElementRef, Inject, Input, OnChanges } from "@angular/core";

import { defaultOptions, ExternalHrefOptions, optionsToken } from "./external-href-options";

// tslint:disable-next-line:directive-selector
@Directive({ selector: "a" })
/**
 * A directive that makes sure all HTML `a` elements with `target="_blank"` and an external `href`
 * will have "noopener" and/or "noreferrer" in the `rel` attribute. This solves security and performance
 * issues described in https://developers.google.com/web/tools/lighthouse/audits/noopener.
 *
 * It can also be configured to set `target="_blank"` on all `a` elements with external `href` automatically.
 * This allows for more concise source HTML.
 *
 * Use `configure(options: ExternalHrefOptions)` for configuration and also see `ExternalHrefOptions`.
 *
 * ### Credits
 *
 * The code was inspired by https://kevinphelps.me/blog/2017-06-30/handling-external-links-in-angular.
 */
export class ExternalHRefDirective implements OnChanges {

    @Input() href?: string;
    @Input() target?: string;
    @Input() rel?: string;
    private readonly anchorElement: HTMLAnchorElement;
    private readonly isExternalHRef = defaultOptions.isExternalHRef;
    private readonly externalHRefTargetDefaultsToBlank = defaultOptions.externalHRefTargetDefaultsToBlank;
    private readonly safeBlankRelTokens = defaultOptions.safeBlankRelTokens;
    private lastManipulated: {
        target?: { value?: string },
        rel?: { value?: string },
    } = {};


    constructor(element: ElementRef, @Inject(optionsToken) options: ExternalHrefOptions) {
        this.anchorElement = element.nativeElement;
        if (options.isExternalHRef !== undefined) {
            this.isExternalHRef = options.isExternalHRef;
        }
        if (options.externalHRefTargetDefaultsToBlank !== undefined) {
            this.externalHRefTargetDefaultsToBlank = options.externalHRefTargetDefaultsToBlank;
        }
        if (options.safeBlankRelTokens !== undefined) {
            if (!options.safeBlankRelTokens.some(it => it === "noopener" || it === "noreferrer")) {
                throw new Error(
                    `Illegal argument. '${options.safeBlankRelTokens}' is not safe for target="blank".`
                );
            }
            this.safeBlankRelTokens = options.safeBlankRelTokens;
        }
    }

    ngOnChanges() {
        if (this.href !== undefined && this.isExternalHRef(this.href)) {
            if (this.externalHRefTargetDefaultsToBlank) {
                if (!this.target) {
                    this.lastManipulated.target = { value: this.target };
                    this.target = "_blank";
                }
            }
            if (this.target === "_blank") {
                const relTokens = this.rel ? this.rel.split(/\s+/) : [];
                for (const mandatoryToken of this.safeBlankRelTokens) {
                    if (!relTokens.includes(mandatoryToken)) {
                        this.lastManipulated.rel = { value: this.rel };
                        relTokens.push(mandatoryToken);
                    }
                }
                this.rel = relTokens.join(" ");
            }
        } else {
            if (this.lastManipulated.target) {
                this.target = this.lastManipulated.target.value;
            }
            if (this.lastManipulated.rel) {
                this.rel = this.lastManipulated.rel.value;
            }
        }

        this.setAttribute("href", this.href);
        this.setAttribute("target", this.target);
        this.setAttribute("rel", this.rel);
    }

    private setAttribute(qualifiedName: string, value: string | undefined) {
        if (value === undefined) {
            this.anchorElement.removeAttribute(qualifiedName);
        } else {
            this.anchorElement.setAttribute(qualifiedName, value);
        }
    }
}
