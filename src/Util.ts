class Util {
	public static createBitmapByName(name:string):egret.Bitmap {
		var result:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}

	public static getRandomArray(length:number, min:number = 1, max:number = 4):Array<number> {
		var arr:Array<number> = [];
		for (var i:number = 0; i < length; i++) {
			arr.push(this.getRandomInt(min, max));
		}
		return arr;
	}

	public static getRandomInt(min:number = 1, max:number = 4):number {
		return Math.floor((max - min + 1) * Math.random() + min);
	}

}