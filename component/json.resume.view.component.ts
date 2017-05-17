//import { Component, ContentChildren, QueryList, Input, Output, EventEmitter, Directive, Inject, ElementRef } from '@angular/core';
import { Component, Input, Output, Directive, ViewContainerRef } from '@angular/core';

/* 
references:
http://stackoverflow.com/questions/31692416/dynamic-template-urls-in-angular-2
*/

@Component({
    selector: 'jsonresumeview',
    template: `<div id="#jsonresume"></div>`
})

export class JsonResumeViewComponent {
    @Input() templateFile: string = "";
    @Input() jsonFile: string = "";

    private jsonConten: string;

    constructor() {
        
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
            self.jsonConten = request.responseText;
        };
        request.open("get", self.jsonFile, true);
        request.send();
    }

    onLoadFile() {

    }
}
