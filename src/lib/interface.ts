export interface ConfigOptions {
    clientId: string;
    autoSelect?: boolean;
    loginUri?: string;
    cancelOnTapOutside?: boolean;
    promptParentId?: string;
    nonce?: string;
    context?: 'signin' | 'signup' | 'use';
    stateCookieDomain?: string;
    uxMode?: 'redirect' | 'popup';
    allowedParentOrigin?: string;
    itpSupport?: boolean;
    callback?: (response: any) => void;
    nativeCallback?: (response: any) => void;
    intermediateIframeCloseCallback?: (response: any) => void;
}

export interface GoogleButtonViewOptions {
    clickListener?: (response: any) => void;
    buttonContainer: HTMLElement;
    style: {
        type?: 'standard' | 'icon';
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        logoAlignment?: 'left' | 'center';
        width?: number;
        locale?: string;
    };
}