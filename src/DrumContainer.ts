class DrumContainer extends egret.DisplayObjectContainer {

	private drumArr:Array<Drum>;
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
		for (var i in this.drumOptions) {
			var drum:Drum = new Drum();
			this.addChild(drum);
			drum.addEventListener(DrumEvent.TAP, this.onTapDrumHandler, this);
			drum.x = this.drumOptions[i].x;
			drum.y = this.drumOptions[i].y;
			drum.drumType = this.drumOptions[i].drumType;
			this.drumArr.push(drum);
		}
	}

	private onTapDrumHandler(e:DrumEvent):void {
		console.log("tap");
	}

}