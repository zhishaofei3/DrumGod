class DrumContainer extends egret.DisplayObjectContainer {

	private drumArr:Array<Drum>;
	private drumSoundArr:Array<egret.Sound>;
	private drumOptions:Array<any> = [
		{x: 0, y: 0, drumType: 1},
		{x: 240, y: 0, drumType: 2},
		{x: 0, y: 190, drumType: 3},
		{x: 240, y: 190, drumType: 4},
	]

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.drumArr = [];
		this.drumSoundArr = [];
		for (var i in this.drumOptions) {
			var drum:Drum = new Drum();
			this.addChild(drum);
			drum.x = this.drumOptions[i].x;
			drum.y = this.drumOptions[i].y;
			drum.drumType = this.drumOptions[i].drumType;
			this.drumArr.push(drum);
			var sound:egret.Sound = RES.getRes("drum" + this.drumOptions[i].drumType);
			this.drumSoundArr.push(sound);
		}
	}

	public addEvents():void {
		for (var i in this.drumArr) {
			this.drumArr[i].addEventListener(DrumEvent.TAP, this.onTapDrumHandler, this);
		}
	}

	public removeEvents():void {
		for (var i in this.drumArr) {
			this.drumArr[i].removeEventListener(DrumEvent.TAP, this.onTapDrumHandler, this);
		}
	}

	private onTapDrumHandler(e:DrumEvent):void {
		var drum:Drum = e.currentTarget;
		drum.setStatus(Drum.JIDA);
		this.drumSoundArr[drum.drumType - 1].play();
		this.dispatchEventWith(DrumContainerEvent.TAP_ONE_DRUM, false, {drumType:drum.drumType});
	}

	public oneDrumLight(index:number, mode:string):void {
		index--;
		this.drumArr[index].setStatus(mode);
		this.drumSoundArr[index].play();
	}

}