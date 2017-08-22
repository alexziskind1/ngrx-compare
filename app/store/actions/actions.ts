import { Action } from "@ngrx/store";


export const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
export const SWITCH_TOGGLED = 'SWITCH_TOGGLED';
export const SWITCH_TOGGLE_ERROR = 'SWITCH_TOGGLE_ERROR';

export class ToggleSwitchAction implements Action {
    type = TOGGLE_SWITCH;
    constructor(public payload: boolean) { }
}

export class SwitchToggledAction implements Action {
    type = SWITCH_TOGGLED;
    constructor(public payload: boolean) { }
}

export class SwitchToggleErrorAction implements Action {
    type = SWITCH_TOGGLE_ERROR;
    constructor(public payload: boolean) { }
}