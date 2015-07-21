class DrumEvent extends egret.Event {
	public static JI_DA_COMPLETE_EVENT:string = "JiDaCompleteEvent";
	public static LV_QUAN_COMPLETE_EVENT:string = "LvQuanCompleteEvent";
	public static TAP:string = "Tap";

	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
		super(type, bubbles, cancelable);
	}
}