class Game extends egret.DisplayObjectContainer {

	private bg:egret.Bitmap;
	private hero:egret.MovieClip;
	private scorePanel:ScorePanel;
	private drumContainer:DrumContainer;

	private jieZouArr:Array<number>;
	private level:number;
	private jieZouLength:number;
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
		this.hero.x = 15;
		this.hero.y = 10;

		this.scorePanel = new ScorePanel();
		this.addChild(this.scorePanel);
		this.scorePanel.x = 10;
		this.scorePanel.y = 10;

		this.drumContainer = new DrumContainer();
		this.addChild(this.drumContainer);
		this.drumContainer.x = 40;
		this.drumContainer.y = 402;
		this.drumContainer.addEventListener(DrumContainerEvent.TAP_ONE_DRUM, this.onTapOneDrum, this);

		this.startGame();
	}

	private startGame():void {
		this.scorePanel.setScore(0);
		this.hero.addEventListener(egret.Event.ENTER_FRAME, this.onHeroEnterFrame, this);
		this.hero.gotoAndStop("dengdai");
		this.jieZouArr = [];
		this.startLevel(1);
	}

	private startLevel(level:number):void {
		this.level = level;
		this.jieZouLength = level + 2;
		if (level == 1) {
			this.jieZouArr = Util.getRandomArray(this.jieZouLength);
		} else {
			this.jieZouArr.push(Util.getRandomInt());
		}
		console.log("level " + this.level);
		console.log("jieZouArr " + this.jieZouArr);
		this.startExample(this, 0);
	}

	private startExample(me:any, i:number):void {
		if (i >= me.jieZouLength) { //到了
			me.startUserImitation();
		} else {
			me.drumContainer.oneDrumLight(me.jieZouArr[i], Drum.LVQUAN);
			i++;
			setTimeout(me.startExample, 500, me, i);
		}
	}

	private userIndexCount:number;

	private startUserImitation():void {
		this.userIndexCount = 0;
		this.hero.gotoAndPlay("gainile");
		this.drumContainer.addEvents();
	}

	private onTapOneDrum(e:DrumContainerEvent):void {
		console.log("onTapOneDrum");
		var drumType:number = e.data.drumType;
		if (drumType == this.jieZouArr[this.userIndexCount]) {
			this.hero.gotoAndPlay("qiaogu");
			this.userIndexCount++;
		} else {
			this.hero.gotoAndPlay("cuo");
			console.log("错误了，直接下一个");
		}
	}

	private onHeroEnterFrame(e:egret.Event):void {
		var hero:egret.MovieClip = e.currentTarget;
		switch (hero.currentFrame) {

		}
	}

}










