import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'jsonresumeview',
    template: `
<b>Template: {{templateFile}}</b><br>
<b>Json: {{jsonFile}}</b> <br>
Text: {{meutexto}}
    `
})

export class JsonResumeViewComponent {
    @Input() templateFile: string = "";
    @Input() jsonFile: string = "";

    private meutexto: string;

    constructor() {
        // if (this.jsonFile != "") {
        //     this.jsonLoad();
        // }
    }

    ngOnInit() {
        if (this.jsonFile != "") {
            this.jsonLoad();
        }
    }

    jsonLoad() {
        // <JsonModels.JsonResume>JSON.parse(this.data);
        let self = this;

        var request = new XMLHttpRequest();
        request.onload = function (e) {
            self.meutexto = request.responseText;
        };
        request.open("get", self.jsonFile, true);
        request.send();
    }

    onLoadFile() {

    }
}
