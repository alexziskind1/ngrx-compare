import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Switch } from 'ui/switch';
import { FromEventObservable } from "rxjs/observable/FromEventObservable";
import { BackendService } from "./services/backend.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {



    //public checked: boolean = false;
    public localMessage: string;
    public message$: Observable<string>;
    public message: string;
    private counter = 1;

    private delay = 5000;

    public get localSwitchMessage() {
        return 'local switch: ' + this.backendService.localModelSwitchValue;
    }

    @ViewChild('btn') buttonRef: ElementRef;

    constructor(private backendService: BackendService) { }

    ngAfterViewInit() {
        let theButton = this.buttonRef.nativeElement;

        var o = Observable.fromEvent(theButton, 'tap')
            .subscribe(o => {
                var a = 0;
            });

    }



    onCheckedChange(args) {
        let theSwitch = <Switch>args.object;
        //this.checked = !this.checked;
        this.getStuffChecked(theSwitch.checked);
        //this.localMessage = theSwitch.checked ? 'local checked: true' : 'local checked: false';
    }

    onTapCounter(args) {
        this.counter++;
        this.getStuffCounter();
        this.localMessage = 'local counter: ' + this.counter;
    }
    onTapDelay(args) {
        this.getStuffDelay(this.delay);
        this.localMessage = 'local delay: ' + this.delay;
        this.counter++;
        if (this.delay === 0) {
            this.delay = 5000;
        } else {
            this.delay -= 1000;
        }
    }

    getStuffChecked(checked: boolean) {
        this.backendService.toggleSwitch(checked)
            .then((backendChecked) => {
                this.message = 'cloud checked: ' + backendChecked;
            })
            .catch((er) => {
                this.message = 'cloud checked: error';
                //this.localMessage = checked ? 'local checked: false' : 'local checked: true';
            });
    }

    getStuffCounter() {
        this.backendService.getStuffCounter(this.counter)
            .then(res => {
                res.text().then(s => {
                    this.message = 'cloud counter: ' + s;
                    this.counter = parseInt(s);
                });
            });
    }

    getStuffDelay(delay) {
        this.backendService.getStuffDelay(delay)
            .then(res => {
                res.text().then(s => this.message = s);
            });
    }

    getStuffObs(): Observable<string> {
        return this.backendService.getStuffObs(this.counter);
    }

}
