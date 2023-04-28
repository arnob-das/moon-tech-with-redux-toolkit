import React, { useEffect } from "react";
import { useGetProductsQuery, useRemoveProductMutation } from "../../features/api/apiSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductList = () => {

  const { data, isLoading, isError, error, isSuccess, } = useGetProductsQuery();
  const [removeProduct, result] = useRemoveProductMutation();

  const rmIsLoading = result.isLoading;
  const rmIsError = result.isError;
  const rmIsSuccess = result.isSuccess;
  const rmError = result.error;

  const products = data?.data;

  // for removing product
  useEffect(() => {
    if (rmIsSuccess) {
      toast.success("Successfully deleted Product", { id: "productDeleted" });
    }
    if (rmIsError) {
      toast.error(rmError, { id: "deleteError" });
    }
  }, [rmError, rmIsError, rmIsLoading, rmIsSuccess])


  return (
    <div className='flex flex-col justify-center items-center h-full w-full '>
      {/* for loading */}
      {isLoading && <p>Loading...</p>}


      {/* for error */}
      {isError && <span>{error?.error}</span>}

      {/* successfully loaded data */}
      {(isSuccess) &&
        <div className='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
          <header className='px-5 py-4 border-b border-gray-100'>
            <div className='font-semibold text-gray-800'>Products</div>
          </header>
          <div className='overflow-x-auto p-3'>
            <table className='table-auto w-full'>
              <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                <tr>
                  <th></th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Product Name</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Brand</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>In Stock</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Price</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Edit</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-center'>Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className='text-sm divide-y divide-gray-100'>
                {products.map(({ model, brand, price, status, _id }) => (
                  <tr key={_id}>
                    <td className='p-2'>
                      <input type='checkbox' className='w-5 h-5' value='id-1' />
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>{model}</div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left capitalize'>{brand}</div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left'>
                        {status ? (
                          <p className='text-green-500 font-medium'>Available</p>
                        ) : (
                          <p className='text-red-500 font-medium'>Stock out</p>
                        )}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left font-medium text-indigo-500'>
                        {price}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='flex justify-center'>
                        <Link to={`edit-product/${_id}`}
                        >
                          <svg
                            className='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px"
                            width="30" height="30"
                            viewBox="0 0 30 30">
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d="M24 11l2.414-2.414c.781-.781.781-2.047 0-2.828l-2.172-2.172c-.781-.781-2.047-.781-2.828 0L19 6 24 11zM17 8L5.26 19.74C7.886 19.427 6.03 21.933 7 23c.854.939 3.529-.732 3.26 1.74L22 13 17 8zM4.328 26.944l-.015-.007c-.605.214-1.527-.265-1.25-1.25l-.007-.015L4 23l3 3L4.328 26.944z"></path>
                          </svg>
                        </Link>
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='flex justify-center'>
                        <button
                          onClick={() => { removeProduct(_id) }}
                        >
                          <svg
                            className='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
    // </section>
  );
};

export default ProductList;
