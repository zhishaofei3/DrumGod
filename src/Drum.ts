class Drum extends egret.DisplayObjectContainer {
	private mc:egret.MovieClip;
	private _drumType:number;

	public static JIDA:string = "jida";
	public static PUTONG:string = "putong";
	public static LVQUAN:string = "lvquan";

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.mc = new egret.MovieClip(Main.mcFactory.generateMovieClipData("gu"));
		this.mc.gotoAndStop(Drum.PUTONG);
		this.addChild(this.mc);
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
	}

	private onTouchTapHandler(e:egret.TouchEvent):void {
		this.dispatchEventWith(DrumEvent.TAP);
	}

	private onEnterFrame(e:egret.Event) {
		var mc:egret.MovieClip = e.currentTarget;
		switch (mc.currentFrame) {
			case 12:
				mc.gotoAndStop(Drum.PUTONG);
				this.dispatchEventWith(DrumEvent.JI_DA_COMPLETE_EVENT);
				this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
				break;
			case 25:
				mc.gotoAndStop(Drum.PUTONG);
				this.dispatchEventWith(DrumEvent.LV_QUAN_COMPLETE_EVENT);
				this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
				break;
		}
	}

	public setStatus(statusType:string):void {
		if (statusType == Drum.JIDA) {
			this.mc.gotoAndPlay(Drum.JIDA);
			this.mc.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		} else if (statusType == Drum.PUTONG) {
			if (this.mc.currentLabel != Drum.PUTONG) {
				this.mc.gotoAndStop(Drum.PUTONG);
			}
		} else if (statusType == Drum.LVQUAN) {
			this.mc.gotoAndPlay(Drum.PUTONG);
			this.mc.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
	}

	public get drumType():number {
		return this._drumType;
	}

	public set drumType(value:number) {
		this._drumType = value;
	}

	public destory():void {
		this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeChild(this.mc);
		this.mc = null;
	}
}