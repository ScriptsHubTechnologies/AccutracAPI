export interface MenuItem {
    label: string;
    showOnMobile: boolean;
    showOnTablet: boolean;
    showOnDesktop: boolean;
    requiresAdmin?: boolean;
    route: string;
}
