class LifeBar extends egret.DisplayObjectContainer {
	private mc:egret.MovieClip;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.mc = new egret.MovieClip(Main.mcFactory.generateMovieClipData("life"));
		this.mc.gotoAndStop("life3");
		this.addChild(this.mc);
		this.touchEnabled = true;
	}

	public setLife(life:number):void {
		this.mc.gotoAndStop("life" + life);
	}
}