import * as trc from "trclib/trc2";

export class MyPlugin {
    private pluginContainer:HTMLElement;
    private sheetInfo:trc.ISheetInfoResult;
    
    public constructor(sheet:trc.Sheet, container:HTMLElement) {
        this.pluginContainer = container;
    }

    public static BrowserEntry(
        sheet:trc.ISheetReference,
        container:HTMLElement,
        opts:trc.IPluginOptions,
        next:(plugin : MyPlugin) => void 
    ):void {

        let trcSheet = new trc.Sheet(sheet);
        let plugin = new MyPlugin(trcSheet, container);

        plugin.init(trcSheet);

        next(plugin);
    }

    private init = (sheet:trc.Sheet) => {
        sheet.getInfo((result:trc.ISheetInfoResult) => {
            this.sheetInfo = result;
            let message:string = `There are ${result.CountRecords} records`;
            console.log(message);
            this.pluginContainer.innerHTML = message;
        });
    };
}