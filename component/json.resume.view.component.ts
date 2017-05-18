import {
    Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver,
    NgModule, Compiler, ComponentFactory, ModuleWithComponentFactories
} from '@angular/core';
import * as JsonModels from '../../ng2-json-resume-view/model/JsonResumeModel';

/* 
references:
http://stackoverflow.com/questions/40092639/how-to-render-a-dynamic-template-with-components-in-angular2
https://plnkr.co/edit/27x0eg?p=preview

http://blog.rangle.io/dynamically-creating-components-with-angular-2/
http://plnkr.co/edit/ZXsIWykqKZi5r75VMtw2?p=preview
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
    template: `<div #jsonResumeViewTemplate></div>`
})

export class JsonResumeViewComponent {
    @Input() templateFile: string = "";
    @Input() jsonFile: string = "";

    @ViewChild('jsonResumeViewTemplate', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    private currentComponent: any = null;

    private data: JsonModels.JsonResumeViewTemplate;

    constructor(private resolver: ComponentFactoryResolver, private vcRef: ViewContainerRef, private compiler: Compiler) { }

    ngOnInit() {
        // start async calls
        if (this.jsonFile != "") {
            this.data = new JsonModels.JsonResumeViewTemplate();
            this.jsonLoad();
        }
    }

    jsonLoad() {
        let self = this;

        var request = new XMLHttpRequest();
        request.onload = function (e) {
            self.data.jsonContent = request.responseText;
            self.data.jsonObject = <JsonModels.JsonResume>JSON.parse(self.data.jsonContent);
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
            self.data.htmlContent = request.responseText;
            self.bindHTML();
        };
        request.open("get", self.templateFile, true);
        request.send();
    }

    bindHTML() {
        let self = this;

        const html = self.data.htmlContent;
        if (html == "")
            return;

        if (self.currentComponent) {
            self.currentComponent.destroy();
        }

        const compMetadata = new Component({
            selector: 'jsonResumeViewTemplate',
            template: html,
        });

        createComponentFactory(self.compiler, compMetadata).then(factory => {
            // Inputs need to be in the following format to be resolved properly
            let inputProviders = Object.keys(self.data).map((inputName) => {
                return { provide: inputName, useValue: self.data[inputName] };
            });
            let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

            // We create an injector out of the data we want to pass down and this components injector
            const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, self.vcRef.parentInjector);
            self.currentComponent = self.vcRef.createComponent(factory, 0, injector, []);
        });
    }

    ngOnDestroy() {
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
    }
}
