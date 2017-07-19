import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { BackendService } from "./services/backend.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./store/reducers/reducer";
import { INITIAL_APPLICATION_STATE } from "./models/application-state.interface";
import { SwitchEffects } from "./store/effects/switch-effects";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule,
        StoreModule.provideStore(reducer, INITIAL_APPLICATION_STATE),
        EffectsModule.run(SwitchEffects)
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        BackendService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule { }
