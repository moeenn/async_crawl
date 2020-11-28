// queue of unique objects
class Queue {
	constructor() {
		this.__elements = new Set();
		this.__datatype = null;
		this.__callback = null;
	}

	setDataType(typename) {
		this.__datatype = typename;
	}

	setCallback(callback) {
		if(callback.constructor.name != "AsyncFunction") {
			throw new Error("Invalid Argument: Setting Queue Callback Failed");
		}

		this.__callback = callback;
	}

	enqueue(set) {
		if (set.constructor.name != "Set") {
			throw new Error("Invalid Argument: Enqueue failed");
		}

		set.forEach(element => {
			this.__elements.add(element);
			this.__callback(element);
		});
	}
}

module.exports = Queue;