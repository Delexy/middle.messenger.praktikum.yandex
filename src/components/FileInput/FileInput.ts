import template from "./template.pug";
import Block from "../Block/Block";

type FileInputProps = {
  title: string;
  name: string;
  currentImg?: string;
  imgName?: string;
  attributes: {
    class: string;
  };
  events?: any;
};

class FileInput extends Block {
  value: File;

  constructor(props: FileInputProps) {
		if(!props.events) {
			props.events = {};
		}

    props.events.change = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input && input.files) {
        const file = input.files[0];
        this.value = file;

        if(file.type.startsWith('image')) {
          let fileBase64 = null;
          const reader = new FileReader();
          reader.onload = (e) => {
            fileBase64 = e.target ? e.target.result : null;
            this.setProps({
              imgName: file.name,
              currentImg: fileBase64
            });
          };
          reader.readAsDataURL(file);
        }
      }
    };
		
    super(props);
  }

  componentDidMount() {
    return true;
  }

  componentDidUpdate() {
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FileInput;
