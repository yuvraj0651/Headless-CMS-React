import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductForm = ({ onSubmit, loading = false }) => {

    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        status: "active",
    });

    const { productsData } = useSelector((state) => state.products);
    console.log("Products Form Comp:", productsData);

    useEffect(() => {
        if (productsData?.length > 0) {
            const firstProduct = productsData[0];

            const emptyForm = {};

            Object.keys(firstProduct).forEach((key) => {
                const value = firstProduct[key];

                if (typeof value === "object" && value !== null) {
                    emptyForm[key] = { ...value };
                } else {
                    emptyForm[key] = value || "";
                }
            });

            setForm(emptyForm);
        }
    }, [productsData]);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");

            setForm((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const imageHandler = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            [key]: previewURL
        }));
    };

    const renderFields = () => {

        return Object.entries(form).map(([key, value]) => {

            // 🔥 Nested Object
            if (typeof value === "object" && value !== null) {
                return (
                    <div key={key} className="border p-4 rounded-lg md:col-span-2">
                        <h3 className="font-semibold mb-3 capitalize">{key}</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(value).map(([childKey, childValue]) => (
                                <div key={childKey} className="flex flex-col gap-1">
                                    <label className="capitalize font-medium">
                                        {childKey}
                                    </label>

                                    <input
                                        type={typeof childValue === "number" ? "number" : "text"}
                                        name={`${key}.${childKey}`}
                                        value={childValue}
                                        onChange={changeHandler}
                                        className="border px-3 py-2 rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            // 🔥 Image Field
            if (key.toLowerCase().includes("image")) {
                return (
                    <div key={key} className="space-y-2 md:col-span-2">
                        <label className="font-medium capitalize">{key}</label>

                        {value && (
                            <img
                                src={value}
                                alt="preview"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => imageHandler(e, key)}
                            className="border p-2 rounded"
                        />
                    </div>
                );
            }

            // 🔥 Normal Field
            return (
                <div key={key} className="flex flex-col gap-1">
                    <label className="capitalize font-medium">{key}:</label>

                    <input
                        type={typeof value === "number" ? "number" : "text"}
                        name={key}
                        value={value}
                        onChange={changeHandler}
                        className="border px-3 py-2 rounded-lg"
                    />
                </div>
            );
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow border">

                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Product Information
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className="p-6 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFields()}
                    </div>

                    <div className="flex justify-end border-t pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                            hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ProductForm;
