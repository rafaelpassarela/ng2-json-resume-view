import {
    Component,
    Directive,
    NgModule,
    Input,
    ViewContainerRef,
    Compiler,
    ComponentFactory,
    ModuleWithComponentFactories,
    ComponentRef,
    ReflectiveInjector,
    ViewChild    ,
    
} from '@angular/core';

/* 
references:
http://stackoverflow.com/questions/40092639/how-to-render-a-dynamic-template-with-components-in-angular2
https://plnkr.co/edit/27x0eg?p=preview
*/

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent { };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [], declarations: [decoratedCmp] })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
            return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
        });
}

@Component({
    selector: 'jsonresumeview',
    template: `<div id="#jsonresume">NONE</div>`
})

export class JsonResumeViewComponent {
    //@ViewChild("placeholder", { read: ViewComponentRef }) placeholderRef: ViewComponentRef;

    @Input() templateFile: string = "";
    @Input() jsonFile: string = "";

    cmpRef: ComponentRef<any>;

    private jsonContent: string;
    private htmlContent: string;

    constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

    ngOnInit() {
        // start async calls
        if (this.jsonFile != "") {
            this.jsonLoad();
        }
    }

    jsonLoad() {
        let self = this;

        var request = new XMLHttpRequest();
        request.onload = function (e) {
            self.jsonContent = request.responseText;
            // another sync call
            self.htmlLoad();
        };
        request.open("get", self.jsonFile, true);
        request.send();
    }

    htmlLoad() {
        let self = this;

        var request = new XMLHttpRequest();
        request.onload = function (e) {
            self.htmlContent = request.responseText;
            self.bindHTML();
        };
        request.open("get", self.templateFile, true);
        request.send();
    }

    bindHTML() {
        const html = this.htmlContent;
        if (html == "")
            return;

        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const compMetadata = new Component({
            selector: 'jsonresumeview-template',
            template: html,
        });

        createComponentFactory(this.compiler, compMetadata).then(factory => {
            const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
            this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
        });

    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
