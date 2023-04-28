import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../features/api/apiSlice";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();

    console.log(id);

    // data fetching for single product
    const { data } = useGetSingleProductQuery(id);

    const singleProductStatus = {
        isError: useGetSingleProductQuery(id).isError,
        isLoading: useGetSingleProductQuery(id).isLoading,
        isSuccess: useGetSingleProductQuery(id).isSuccess,
        error: useGetSingleProductQuery(id).error
    }

    // update data for single product
    const [updateProduct, { isError, isLoading, isSuccess, error }] = useUpdateProductMutation();

    const singleProduct = data?.data;

    useEffect(() => {
        if (isLoading) {
            toast.loading("Updating product", { id: "updateProduct" })
        }
        if (isSuccess) {
            toast.success("Successfully Updated Product", { id: "updateProduct" })
        }
        if (!isLoading && isError) {
            toast.error(error, { id: "updateProduct" })
        }
    }, [error, isError, isLoading, isSuccess])


    const submit = (data) => {
        const product = {
            model: data.model,
            brand: data.brand,
            image: data.image,
            status: data.status === "true" ? true : false,
            price: data.price,
            rating: data.rating,
            keyFeature: [
                data.keyFeature1,
                data.keyFeature2,
                data.keyFeature3,
                data.keyFeature4,
            ],
            spec: [],
        };
        updateProduct({ product: product, id: id });
        reset();
    };

    return (
        <div className='flex justify-center items-center h-full '>
            {/* loading data */}
            {singleProductStatus.isLoading && <p>Loading...</p>}
            {/* loading error */}
            {singleProductStatus.isError && <p>{singleProductStatus.error}</p>}
            {/* loading successful */}
            {singleProductStatus.isSuccess &&
                <form
                    className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
                    onSubmit={handleSubmit(submit)}
                >
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='model'>
                            Model
                        </label>
                        <input defaultValue={singleProduct?.model} required={true} type='text' id='model' {...register("model")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='image'>
                            Image
                        </label>
                        <input defaultValue={singleProduct?.image} required={true} type='text' name='image' id='image' {...register("image")} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' htmlFor='brand'>
                            Brand
                        </label>
                        <select name='brand' id='brand' {...register("brand")}>
                            <option value='amd'>AMD</option>
                            <option value='intel'>Intel</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='price'>
                            Price
                        </label>
                        <input defaultValue={singleProduct?.price} required={true} type='text' name='price' id='price' {...register("price")} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='rating'>
                            Rating
                        </label>
                        <input defaultValue={singleProduct?.rating} required={true} type='text' name='rating' id='rating' {...register("rating")} />
                    </div>

                    <div className='flex flex-col w-full max-w-xs'>
                        <h1 className='mb-3'>Availability</h1>
                        <div className='flex gap-3'>
                            <div>
                                <input required={true}
                                    type='radio'
                                    id='available'
                                    value={true}
                                    {...register("status")}
                                    defaultChecked={singleProduct?.status === true ? true : false}
                                />
                                <label className='ml-2 text-lg' htmlFor='available'>
                                    Available
                                </label>
                            </div>
                            <div>
                                <input required={true}
                                    type='radio'
                                    id='stockOut'
                                    name='status'
                                    value={false}
                                    {...register("status")}
                                    defaultChecked={singleProduct?.status === false ? true : false}
                                />
                                <label className='ml-2 text-lg' htmlFor='stockOut'>
                                    Stock out
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature1'>
                            Key Feature 1
                        </label>
                        <input
                            defaultValue={singleProduct?.keyFeature[0]}
                            type='text'
                            name='keyFeature1'
                            id='keyFeature1'
                            {...register("keyFeature1")}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature2'>
                            Key Feature 2
                        </label>
                        <input
                            defaultValue={singleProduct?.keyFeature[1]}
                            type='text'
                            name='keyFeature2'
                            id='keyFeature2'
                            {...register("keyFeature2")}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature3'>
                            Key Feature 3
                        </label>
                        <input
                            defaultValue={singleProduct?.keyFeature[2]}
                            type='text'
                            name='keyFeature3'
                            id='keyFeature3'
                            {...register("keyFeature3")}
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='keyFeature4'>
                            Key Feature 4
                        </label>
                        <input
                            defaultValue={singleProduct?.keyFeature[3]}
                            type='text'
                            name='keyFeature4'
                            id='keyFeature4'
                            {...register("keyFeature4")}
                        />
                    </div>

                    <div className='flex justify-between items-center w-full'>
                        <button
                            className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default EditProduct;