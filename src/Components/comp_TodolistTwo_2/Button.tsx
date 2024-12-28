type ButtonPropsType = {
    callBack: () => void
    name: string
};

export const Button = (props: ButtonPropsType) => {
    const callBackHandler = () => {
        props.callBack()
    };

    return (
        <button onClick={callBackHandler}>
            {props.name}
        </button>
    );
};