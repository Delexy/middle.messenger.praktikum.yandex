import template from './button.pug';
import Block from "../Block/Block";

class Button extends Block {
	
	render() {
		const test = this.compile(template, this.props);
		return test;
	}
}

export default Button;
