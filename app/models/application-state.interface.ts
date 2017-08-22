export interface ApplicationState {
    localSwitch: boolean;
    remoteSwitch: boolean;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    localSwitch: false,
    remoteSwitch: false
};