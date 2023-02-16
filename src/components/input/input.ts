import template from './input.pug';
import Block from "../Block/Block";

class Input extends Block {
	render() {
		return this.compile(template, this.props);
	}
}

export default Input;
