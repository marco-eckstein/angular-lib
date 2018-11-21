import { ModuleWithProviders, NgModule } from "@angular/core";

import { ExternalHrefOptions, optionsToken } from "./external-href-options";
import { ExternalHRefDirective } from "./external-href.directive";

/**
 * The module containing {@link ExternalHRefDirective}.
 *
 * You can configure this module and hence the directive via {@link configure(options)}
 * as follows:
 * ```
 * @NgModule({
 *   ...
 *   imports: [
 *     ...
 *     ExternalHRefModule.configure({ ... }),
 *     ...
 *   ],
 *   ...
 * ```
 */
@NgModule({
    declarations: [ExternalHRefDirective],
    imports: [],
    exports: [ExternalHRefDirective],
    providers: [
        {
            provide: optionsToken,
            useValue: {}
        }
    ]
})
export class ExternalHRefModule {

    /**
     * Configures this module and thus {@link ExternalHRefDirective}.
     *
     * #### Options
     *
     * (copied from {@link ExternalHRefOptions})
     *
     * ##### isExternalHRef
     *
     * The function that determines whether `href` is considered external.
     *
     * By default, a `href` starting with "http://" or "https://" but
     * not starting with `window.location.origin` is considered external.
     *
     * ##### externalHRefTargetDefaultsToBlank
     *
     * Set whether an `a` element with an external `href` and no `target` will automatically
     * be given `target="_blank"`.
     *
     * The default is `false`.
     *
     * ##### safeBlankRelTokens
     *
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
     *
     * #### Examples
     *
     * By default:
     * - `<a href="http://foo"></a>` stays\
     *   `<a href="http://foo"></a>`.
     * - `<a href="http://foo" target="_blank"></a>` becomes\
     *   `<a href="http://foo" target="_blank" rel="noopener noreferrer"></a>`.
     * - `<a href="http://foo" target="_blank" rel="noopener"></a>` becomes\
     *   `<a href="http://foo" target="_blank" rel="noopener noreferrer"></a>`.
     * - `<a href="http://foo" target="_blank" rel="author"></a>` becomes\
     *   `<a href="http://foo" target="_blank" rel="author noopener noreferrer"></a>`
     * - `<a href="foo"></a>` stays\
     *   `<a href="foo"></a>`.
     * - `<a href="foo" target="_blank"></a>` stays\
     *   `<a href="foo" target="_blank"></a>`.
     *
     * If `externalHRefTargetDefaultsToBlank: true`:
     * - `<a href="http://foo"></a>` becomes
     *   `<a href="http://foo" target="_blank" rel="noopener noreferrer"></a>`.
     *
     * If `safeBlankRelTokens: ["noopener"]`:
     * - `<a href="http://foo" target="_blank"></a>` becomes
     *   `<a href="http://foo" target="_blank" rel="noopener"></a>`.
     * - `<a href="http://foo" target="_blank" rel="noreferrer"></a>` becomes
     *   `<a href="http://foo" target="_blank" rel="noreferrer noopener"></a>`.
     *
     */
    static configure(options: ExternalHrefOptions): ModuleWithProviders<ExternalHRefModule> {
        return {
            ngModule: ExternalHRefModule,
            providers: [
                {
                    provide: optionsToken,
                    useValue: options
                }
            ]
        };
    }
}
