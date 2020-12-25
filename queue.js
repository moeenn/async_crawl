// queue of unique objects
class Queue {
	constructor() {
		this.__elements = new Set();
		this.__callback = null;
	}

	setCallback(callback) {
		if(callback.constructor.name != "AsyncFunction") {
			throw new Error("Invalid Argument: Setting Queue Callback Failed");
		}

		this.__callback = callback;
	}

	async add(element) {
		this.__elements.add(element);
		const result = await this.__callback(element);

		if(result) {
			this.__elements.delete(element);
		}
	}
}

module.exports = Queue;