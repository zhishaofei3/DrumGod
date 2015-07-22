class Game extends egret.DisplayObjectContainer {
	private bg:egret.Bitmap;
	private hero:egret.MovieClip;
	private scorePanel:ScorePanel;
	private lifeBar:LifeBar;
	private drumContainer:DrumContainer;

	private jieZouArr:Array<number>;
	private level:number;
	private jieZouLength:number;
	private _score:number;
	private _life:number;

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
		this.hero.y = 40;

		this.scorePanel = new ScorePanel();
		this.addChild(this.scorePanel);
		this.scorePanel.x = 10;
		this.scorePanel.y = 10;

		this.drumContainer = new DrumContainer();
		this.addChild(this.drumContainer);
		this.drumContainer.x = 40;
		this.drumContainer.y = 402;
		this.drumContainer.addEventListener(DrumContainerEvent.TAP_ONE_DRUM, this.onTapOneDrum, this);

		this.lifeBar = new LifeBar();
		this.addChild(this.lifeBar);
		this.lifeBar.x = 340;
		this.lifeBar.y = 5;

		this.startGame();
	}

	private startGame():void {
		this.score = 0;
		this.life = 3;
		this.hero.addEventListener(egret.Event.ENTER_FRAME, this.onHeroEnterFrame, this);
		this.jieZouArr = [];
		this.startLevel(1);
	}

	private startLevel(level:number):void {
		this.level = level;
		this.jieZouLength = Math.floor(level / 3) + 3;
		this.jieZouArr = Util.getRandomArray(this.jieZouLength);
		console.log("level " + this.level);
		console.log("jieZouArr " + this.jieZouArr);
		this.hero.gotoAndStop("dengdai");
		this.startExample(this, 0);
	}

	private startExample(me:any, i:number):void {
		if (i >= me.jieZouLength) { //到了
			me.startUserImitation();
		} else {
			me.drumContainer.oneDrumLight(me.jieZouArr[i], Drum.LVQUAN);
			i++;
			setTimeout(me.startExample, 350, me, i);
		}
	}

	private userIndexCount:number;

	private startUserImitation():void {
		this.userIndexCount = 0;
		this.hero.gotoAndStop("gainile");
		this.drumContainer.addEvents();
	}

	private onTapOneDrum(e:DrumContainerEvent):void {
		var me = this;
		console.log("onTapOneDrum");
		var drumType:number = e.data.drumType;
		if (drumType == me.jieZouArr[me.userIndexCount]) {
			me.hero.gotoAndStop("qiaogu");
			me.userIndexCount++;
			if (me.userIndexCount != me.jieZouArr.length) {
				me.score += 50;
			} else {
				me.score += 80;
				setTimeout(function ():void {
					me.startLevel(me.level + 1);
				}, 1500);
			}
		} else {
			console.log("错误了，直接下一个");
			this.life--;
			me.hero.gotoAndStop("cuo");
			me.drumContainer.removeEvents();
			setTimeout(function ():void {
				if (me.life == 0) {
					me.dispatchEventWith(GameEvent.GAME_OVER_EVENT);
				} else {
					me.startLevel(me.level + 1);
				}
			}, 1500);
		}
	}

	private onHeroEnterFrame(e:egret.Event):void {
		var hero:egret.MovieClip = e.currentTarget;
		switch (hero.currentFrame) {

		}
	}

	public set score(value:number) {
		this._score = value;
		this.scorePanel.setScore(value);
	}

	public get score():number {
		return this._score;
	}

	public get life():number {
		return this._life;
	}

	public set life(value:number) {
		this.lifeBar.setLife(value);
		this._life = value;
	}

	public destory():void {
		this.hero.removeEventListener(egret.Event.ENTER_FRAME, this.onHeroEnterFrame, this);
		this.removeChild(this.bg);
		this.removeChild(this.lifeBar);
		this.removeChild(this.drumContainer);
		this.removeChild(this.scorePanel);
		this.removeChild(this.hero);
		this.bg = null;
		this.lifeBar = null;
		this.drumContainer = null;
		this.scorePanel = null;
		this.hero = null;
	}
}










