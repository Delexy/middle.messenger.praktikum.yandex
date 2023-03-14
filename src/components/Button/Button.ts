import template from './template.pug';
import Block from "../Block/Block";

type ButtonProps = {
	text: string,
	href?: string,
	attributes?: Record<string, unknown>;
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
