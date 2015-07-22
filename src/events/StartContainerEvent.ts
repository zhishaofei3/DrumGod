class StartContainerEvent extends egret.Event {
	public static START_GAME_EVENT:string = "startGameEvent";

	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
		super(type, bubbles, cancelable);
	}
}