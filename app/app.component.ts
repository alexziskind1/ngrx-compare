import { Component, ViewChild, ElementRef } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Switch } from 'ui/switch';
import { FromEventObservable } from "rxjs/observable/FromEventObservable";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    private baseUrl: string = 'https://tns-fn-app1.azurewebsites.net/api';

    //public checked: boolean = false;
    public localMessage: string;
    public message$: Observable<string>;
    public message: string;
    private counter = 1;

    private delay = 5000;

    @ViewChild('btn') buttonRef: ElementRef;

    constructor(private http: Http) { }

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
        fetch(`${this.baseUrl}/HttpTriggerJS1?checked=${checked}`)
            .then(res => {
                res.text().then(s => {
                    this.message = 'cloud checked: ' + s;
                    //this.checked
                });
            });
    }

    getStuffCounter() {
        fetch(`${this.baseUrl}/HttpTriggerJS1?name=${this.counter}`)
            .then(res => {
                res.text().then(s => {
                    this.message = 'cloud counter: ' + s;
                    this.counter = parseInt(s);
                });
            });
    }

    getStuffDelay(d) {
        fetch(`${this.baseUrl}/HttpTriggerJS1?delay=${d}`)
            .then(res => {
                res.text().then(s => this.message = s);
            });
    }

    getStuffObs(): Observable<string> {
        return this.http.get(`${this.baseUrl}/HttpTriggerJS1?name=${this.counter}`)
            .map(res => res.text())
            .do(console.log);
    }

}
