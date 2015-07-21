class StartContainer extends egret.DisplayObjectContainer {
	private startBtn:egret.Bitmap
	private bg:egret.Bitmap;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		this.bg = Util.createBitmapByName("startBg");
		this.addChild(this.bg);
		this.bg.width = this.stage.stageWidth;
		this.bg.height = this.stage.stageHeight;

		this.startBtn = Util.createBitmapByName("startBtn");
		this.startBtn.x = 30;
		this.startBtn.y = 600;
		this.startBtn.touchEnabled = true;
		this.addChild(this.startBtn);
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStartBtn, this);
	}

	private onClickStartBtn():void {
		this.dispatchEventWith(StartContainerEvent.START_GAME_EVENT);
	}

	public destory():void {
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStartBtn, this);
		this.removeChild(this.startBtn);
		this.startBtn = null;

		this.removeChild(this.bg);
		this.bg = null;
	}
}