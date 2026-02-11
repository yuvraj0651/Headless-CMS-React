import Counter from "../../UI/Counter/Counter"

const StatCards = ({ title, value, visible }) => {
    return (
        <>
            <div className={`rounded-xl cursor-pointer border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-700 ease-out ${visible ? "opacity-100" : "opacity-0"}`}>
                <p className="text-sm text-slate-500">{title}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-800">
                    {visible ? <Counter target={value} /> : 0}
                </h2>
            </div>
        </>
    )
}

export default StatCards