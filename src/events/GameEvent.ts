class GameEvent extends egret.Event {
	public static GAME_OVER_EVENT:string = "gameOverEvent";

	public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
		super(type, bubbles, cancelable);
	}
}