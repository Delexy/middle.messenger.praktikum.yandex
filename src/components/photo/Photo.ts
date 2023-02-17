import template from './template.pug';
import Block from "../Block/Block";
import defaultSrc from "../../utils/default-photo"

type PhotoProps = {
  title: string,
  photoSrc?: string,
  canChange?: boolean,
  attributes: {
    class?: string,
    alt: string
  }
}

class Photo extends Block {
	constructor(props: PhotoProps) {
		super(props);

		if(!this.props.photoSrc) {
			this.props.photoSrc = defaultSrc;
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Photo;
