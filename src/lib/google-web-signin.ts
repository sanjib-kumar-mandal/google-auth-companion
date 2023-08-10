import { ConfigOptions, GoogleButtonViewOptions } from "./interface";

export class GoogleAuthCompanion {

    private readonly scriptUrl = 'https://accounts.google.com/gsi/client';
    private isScriptLoaded = false;
    private google: any;

    /**
     * This method is intented only for uploading the script
     * and initialize the SSO locally
     * @param config - ConfigOptions
     * @returns - Promise<unknown>
     */
    initialize(config: ConfigOptions): Promise<unknown> {
        try {
            if (window !== undefined) {
                const headTag = document.head;
                let isScriptExists = false;                
                const allScripts = headTag.getElementsByTagName('script');

                for (let i = 0, l = allScripts.length; i < l; i++) {
                    if (allScripts[i].src === this.scriptUrl) {
                        isScriptExists = true;
                        break;
                    }
                }
    
                const initializeOptions = config ? {
                    ...(config.hasOwnProperty('autoSelect') && { auto_select: config.autoSelect }),
                    ...(config.hasOwnProperty('cancelOnTapOutside') && { cancel_on_tap_outside: config.cancelOnTapOutside }),
                    ...(config.hasOwnProperty('itpSupport') && { itp_support: config.itpSupport }),
                    ...(config.callback && { callback: config.callback }),
                    ...(config.nativeCallback && { native_callback: config.nativeCallback }),
                    ...(config.intermediateIframeCloseCallback && { intermediate_iframe_close_callback: config.intermediateIframeCloseCallback }),
                    ...(config.clientId && { client_id: config.clientId }),
                    ...(config.loginUri && { login_uri: config.loginUri }),
                    ...(config.promptParentId && { prompt_parent_id: config.promptParentId }),
                    ...(config.nonce && { nonce: config.nonce }),
                    ...(config.context && { context: config.context }),
                    ...(config.stateCookieDomain && { state_cookie_domain: config.stateCookieDomain }),
                    ...(config.uxMode && { ux_mode: config.uxMode }),
                    ...(config.allowedParentOrigin && { allowed_parent_origin: config.allowedParentOrigin })
                } : {}

                if (isScriptExists) {
                    this.isScriptLoaded = true;
                    this.google = (window as any).google;
                    this.google.accounts.id.initialize(initializeOptions);
                } else {
                    const scriptTag = document.createElement('script');
                    scriptTag.src = this.scriptUrl;
                    scriptTag.async = true;
                    scriptTag.onload = () => {
                        this.google = (window as any).google;
                        this.google.accounts.id.initialize(initializeOptions);
                        this.isScriptLoaded = true;
                    }
                    headTag.appendChild(scriptTag);
                }
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("[window]: Couldn't find window."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * When users visit your website, if there is an active Google session in the browser, 
     * Sign in with Google may prompt users to sign in or sign up on your website with their Google account. 
     * @param data - InvokeTapdata
     * @returns - Promise<unknown>
     */
    invokeOneTap(notificationCallback?: (data: any) => void): Promise<unknown> {
        try {
            if (this.isScriptLoaded) {
                if (this.google) {
                    this.google.accounts.id.prompt((notification: any) => notificationCallback && notificationCallback(notification));
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error("[google]: Couldn't find google."));
                }
            } else {
                return Promise.reject(new Error("[script]: Script is not loaded yet."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * You can cancel the One Tap flow if you remove the prompt from the relying party DOM. 
     * The cancel operation is ignored if a credential is already selected.
     * @returns Promise<unknown>
     */
    cancelTap(): Promise<unknown> {
        try {
            if (this.google) {
                this.google.accounts.id.cancel();
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("[google]: Couldn't find google."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * When the user signs out of your website, you need to call the method google.accounts.id.disableAutoSelect to record the status in cookies.
     * @returns - Promise<unknown>
     */
    disableAutoSelect(): Promise<unknown> {
        try {
            if (this.google) {
                this.google.accounts.id.disableAutoSelect();
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("[google]: Couldn't find google."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * This method is a simple wrapper for the store() method of the browser's native credential manager API. 
     * Therefore, it can only be used to store a password credential.
     * @param credential - any
     * @param callback - callback method
     * @returns - Promise<unknown>
     */
    storeCredential(credential: any, callback?: () => void): Promise<unknown> {
        try {
            if (this.google) {
                credential && this.google.accounts.id.storeCredential(credential, callback);
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("[google]: Couldn't find google."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * The google.accounts.id.revoke method revokes the OAuth grant used to share the ID token for the specified user.
     * @param loginHint - string
     * @param callback - Function
     * @returns - Promise<unknown>
     */
    revoke(loginHint: string, callback?: () => void): Promise<unknown> {
        try {
            if (this.google) {
                loginHint && this.google.accounts.id.revoke(loginHint, callback);
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("[google]: Couldn't find google."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * A personalized button displays profile information for the first Google session that approves your website. 
     * An approved Google session has a corresponding account on your website who has signed in via Sign In With Google before.
     * @param options - GoogleButtonViewOptions
     * @returns - Promise<unknown>
     */
    renderGoogleButton(options: GoogleButtonViewOptions):Promise<unknown> {
        try {
            if (window !== undefined) {
                if (options.style) {
                    const styles = {
                        ...(options.style.type && { type: options.style.type }),
                        ...(options.style.theme && { theme: options.style.theme }),
                        ...(options.style.size && { size: options.style.size }),
                        ...(options.style.text && { text: options.style.text }),
                        ...(options.style.shape && { shape: options.style.shape }),
                        ...(options.style.logoAlignment && { logo_alignment: options.style.logoAlignment }),
                        ...(options.style.width && { width: options.style.width }),
                        ...(options.style.locale && { locale: options.style.locale }),
                        ...(options.hasOwnProperty('clickListener') && { click_listener: options.clickListener })
                    };

                    if (this.google) {
                        if (options.buttonContainer) {
                            this.google.accounts.id.renderButton(options.buttonContainer, styles);
                            return Promise.resolve();
                        } else {
                            return Promise.reject(new Error("[button] is not defined."));
                        }
                    } else {
                        return Promise.reject(new Error("[google] is not defined."));
                    }
                } else {
                    return Promise.reject(new Error("[style]: Please mention the style properties."));
                }
            } else {
                return Promise.reject(new Error("[window] is not defined."));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }
}