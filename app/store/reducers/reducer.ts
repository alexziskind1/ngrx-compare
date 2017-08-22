
import { ApplicationState, INITIAL_APPLICATION_STATE } from "../../models/application-state.interface";
import { Action } from "@ngrx/store";
import { TOGGLE_SWITCH, SWITCH_TOGGLED, SWITCH_TOGGLE_ERROR } from "../../store/actions/actions";


export function reducer(
    state: ApplicationState = INITIAL_APPLICATION_STATE,
    action: Action): ApplicationState {

    switch (action.type) {
        case TOGGLE_SWITCH:
            const toggleState = Object.assign({}, state);
            toggleState.localSwitch = action.payload;
            return toggleState;

        case SWITCH_TOGGLED:
            const toggledState = Object.assign({}, state);
            toggledState.remoteSwitch = action.payload;
            return toggledState;

        case SWITCH_TOGGLE_ERROR:
            const toggleErrorState = Object.assign({}, state);
            toggleErrorState.localSwitch = !action.payload;
            return toggleErrorState;

        default:
            return state;
    }
}