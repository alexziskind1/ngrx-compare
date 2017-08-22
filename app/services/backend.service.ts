import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ApplicationState, INITIAL_APPLICATION_STATE } from "../models/application-state.interface";


@Injectable()
export class BackendService {

    private baseUrl: string = 'https://tns-fn-app1.azurewebsites.net/api';
    private callNumber = 1;
    //public localModelSwitchValue = false;
    public applicationState: ApplicationState = INITIAL_APPLICATION_STATE;

    constructor(private http: Http) { }

    toggleSwitchObs(checked: boolean): Observable<boolean> {
        //this.localModelSwitchValue = checked;
        let url = 'HttpTriggerJS1';
        if (this.callNumber % 3 === 0) {
            url = 'fakeUrl';
        }
        this.callNumber++;
        return this.http.post(`${this.baseUrl}/${url}?checked=${checked}`, JSON.stringify({ checked: checked }))
            .map(res => res.json());
    }

    toggleSwitchPromise(checked: boolean) {
        this.applicationState.localSwitch = checked;
        let url = 'HttpTriggerJS1';
        if (this.callNumber % 3 === 0) {
            url = 'fakeUrl';
        }
        this.callNumber++;
        return new Promise<boolean>((resolve, reject) => {
            fetch(`${this.baseUrl}/${url}?checked=${checked}`, {
                method: 'POST',
                body: JSON.stringify({ checked: checked })
            })
                .then(res => {
                    if (res.ok) {
                        res.json()
                            .then(s => {
                                if (typeof s === 'boolean') {
                                    this.applicationState.localSwitch = s;
                                    resolve(this.applicationState.localSwitch);
                                } else if (s.statusCode === 500) {
                                    this.applicationState.localSwitch = !checked;
                                    reject('server error');
                                }
                            });
                    } else {
                        setTimeout(() => {
                            this.applicationState.localSwitch = !checked;
                            reject('result not ok');
                        }, 1000);
                    }
                })
                .catch((er) => {
                    this.applicationState.localSwitch = !checked;
                    reject(er);
                });
        });
    }

    getStuffCounter(counter) {
        return fetch(`${this.baseUrl}/HttpTriggerJS1?name=${counter}`);
    }

    getStuffDelay(delay) {
        return fetch(`${this.baseUrl}/HttpTriggerJS1?delay=${delay}`);
    }

    getStuffObs(counter): Observable<string> {
        return this.http.get(`${this.baseUrl}/HttpTriggerJS1?name=${counter}`)
            .map(res => res.text())
            .do(console.log);
    }
}