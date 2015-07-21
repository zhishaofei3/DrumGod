class Game extends egret.DisplayObjectContainer {

	private bg:egret.Bitmap;
	private hero:egret.MovieClip;
	private scorePanel:ScorePanel;
	private drumContainer:DrumContainer;

	private jieZouArr:Array<number>;
	private level:number;
	private score:number;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		this.bg = Util.createBitmapByName("gameBg");
		this.addChild(this.bg);
		this.bg.width = this.stage.stageWidth;
		this.bg.height = this.stage.stageHeight;

		this.hero = new egret.MovieClip(Main.mcFactory.generateMovieClipData("xiaoren_mc"));
		this.addChild(this.hero);
		this.hero.gotoAndStop("dengdai");
		this.hero.x = 30;
		this.hero.y = 10;

		this.scorePanel = new ScorePanel();
		this.addChild(this.scorePanel);
		this.scorePanel.x = 10;
		this.scorePanel.y = 10;

		this.drumContainer = new DrumContainer();
		this.addChild(this.drumContainer);
		this.drumContainer.x = 40;
		this.drumContainer.y = 402;

		this.startGame();
	}

	private startGame():void {

		this.scorePanel.setScore(0);
		this.jieZouArr = [];
		this.startLevel(1);
	}

	private startLevel(level:number):void {
		this.level = level;
	}


}










