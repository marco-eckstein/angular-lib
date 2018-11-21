import { InjectionToken } from "@angular/core";

export interface ExternalHrefOptions {

    /**
     * The function that determines whether `href` is considered external.
     *
     * By default, a `href` starting with "http://" or "https://" but
     * not starting with `window.location.origin` is considered external.
     */
    readonly isExternalHRef?: (href: string) => boolean;

    /**
     * Set whether an `a` element with an external `href` and no `target` will automatically
     * be given `target="_blank"`.
     *
     * The default is `false`.
     */
    readonly externalHRefTargetDefaultsToBlank?: boolean;

    /**
     * Set one or many tokens that will be added to `rel` if `target="blank"`.
     * At least one must be "noopener" or "noreferrer".
     *
     * The default is the most secure value `["noopener", "noreferrer"]`, but you might want to consider
     * using `"noopener"`. You could also use something like `["noopener", "external"]`.
     *
     * See:
     * - https://developers.google.com/web/tools/lighthouse/audits/noopener.
     * - https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
     * - https://caniuse.com/#feat=rel-noopener
     */
    readonly safeBlankRelTokens?: string[];
}

export const defaultOptions = {
    isExternalHRef:
        (href: string) =>
            (href.startsWith("http://") || href.startsWith("https://"))
            && !href.startsWith(window.location.origin),
    externalHRefTargetDefaultsToBlank: false,
    safeBlankRelTokens: ["noopener", "noreferrer"],
};

export const optionsToken = new InjectionToken<ExternalHrefOptions>("ExternalHrefOptions");
