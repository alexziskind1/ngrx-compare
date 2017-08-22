import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { BackendService } from "../../services/backend.service";
import { TOGGLE_SWITCH } from "../../store/actions/actions";
import { SwitchToggledAction, SwitchToggleErrorAction } from "../../store/actions/actions";

@Injectable()
export class SwitchEffects {

    constructor(private actions$: Actions, private backendService: BackendService) { }


    @Effect() toggleSwitchEffect: Observable<Action> = this.actions$
        .ofType(TOGGLE_SWITCH).delay(1000)
        .switchMap(action => this.backendService.toggleSwitchObs(action.payload)
            .map((res: boolean) => new SwitchToggledAction(res))
            .catch(err => {
                if (err.ok) {
                    return Observable.of(new SwitchToggledAction(err.json()))
                    //.delay(1000);
                } else {
                    return Observable.of(new SwitchToggleErrorAction(action.payload))
                    //.delay(1000);
                }
            }));



}