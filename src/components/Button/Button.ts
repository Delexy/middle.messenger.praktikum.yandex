import template from './template.pug';
import Block from "../Block/Block";

type ButtonProps = {
	text: string,
	href?: string,
	attributes?: any
}

class Button extends Block {

	constructor(props: ButtonProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Button;
