// queue of unique objects
class Queue {
	constructor() {
		this.__elements = new Set();
		this.__addCallback = null;
		this.__finishCallback = null;
	}

	setAddCallback(callback) {
		if(callback.constructor.name != "AsyncFunction") {
			throw new Error("Invalid Argument: Setting Queue Callback Failed");
		}

		this.__callback = callback;
	}

	setFinishCallback(callback) {
		if(callback.constructor.name != "AsyncFunction") {
			throw new Error("Invalid Argument: Setting Queue Callback Failed");
		}

		this.__callback = callback;
	}

	async add(element) {
		this.__elements.add(element);
		const result = await this.__addCallback(element);

		if(result) {
			this.__finishCallback(element);
			this.__elements.delete(element);
		}
	}
}

module.exports = Queue;