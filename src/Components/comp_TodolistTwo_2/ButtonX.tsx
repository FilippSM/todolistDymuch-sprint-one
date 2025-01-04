type ButtonPropsType = {
    callBack: () => void
    name: string
};

export const ButtonX = (props: ButtonPropsType) => {
    const callBackHandler = () => {
        props.callBack()
    };

    return (
        <button onClick={callBackHandler}>
            {props.name}
        </button>
    );
};