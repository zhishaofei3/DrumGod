class DrumContainerEvent extends egret.Event {
	public static TAP_ONE_DRUM:string = "TapOneDrum";

	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
		super(type, bubbles, cancelable);
	}
}