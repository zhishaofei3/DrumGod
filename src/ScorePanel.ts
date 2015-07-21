class ScorePanel extends egret.DisplayObjectContainer {
	private bg:egret.Bitmap;
	private tf:egret.TextField;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		this.bg = Util.createBitmapByName("scorePanel.png");
		this.addChild(this.bg);

		this.tf = new egret.TextField();
		this.tf.x = 9;
		this.tf.y = 14;
		this.tf.width = 118;
		this.tf.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.tf);
		this.setScore(0);
	}

	public setScore(score:number):void {
		this.tf.text = score.toString();
	}

	public destory():void {
		this.removeChild(this.bg);
		this.bg = null;
		this.removeChild(this.tf);
		this.tf = null;
	}
}
