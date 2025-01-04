import { ChangeEvent} from "react";

type InputPropsType = {
	currentText: string 
	setCurrentText: React.Dispatch<React.SetStateAction<string>> 
};

export const InputX = (props: InputPropsType) => {
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		props.setCurrentText(event.currentTarget.value)
	};

	return (
	  <input id={'hw04-input'} type="text" value={props.currentText} onChange={onChangeHandler} />
	);
};