import LoadingSpinnerSmall from "./LoadingSpinnerSmall";

const ValidationFeedbackWithSpinner = ({ type, message }) => {

    let colorClass = "bg-red-200 text-red-400";
    if (type === 'warning') {
        colorClass = "bg-yellow-200 text-yellow-400";
    } else if (type === 'success') {
        colorClass = "bg-green-200 text-green-400";
    }

    return (
        <div className={`${colorClass} text-xs font-bold p-2 rounded mt-[20px] flex gap-2 justify-between items-center`}>
            <p>{message}</p>
            <div className="size-6">
                <LoadingSpinnerSmall />
            </div>
        </div>
    );
}

export default ValidationFeedbackWithSpinner;