import template from './button.pug';
import Block from "../Block/Block";

class Button extends Block {
	
	render() {
		return this.compile(template, this.props);
	}
}

export default Button;
