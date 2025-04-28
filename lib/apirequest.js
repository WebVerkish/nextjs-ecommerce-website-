
// import toast from "react-hot-toast";

// export async function makePostRequest(
//   setLoading,
//   endpoint,
//   data,
//   resourceName,
//   reset,
//   redirect
// ) {
  
//   try {
//     setLoading(true);
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//     // //console.log(`${baseUrl}/${endpoint}`,data);
//     const response = await fetch(`${baseUrl}/${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (response.ok) {
//       setLoading(false);
//       toast.success(`New ${resourceName} Created Successfully`);
//       reset();
//       redirect();
//     } else {
//       setLoading(false);
//       if (response.status === 409) {
//         toast.error("The Giving Warehouse Stock is NOT Enough");
//       } else {
//         toast.error("Something Went wrong");
//       }
//     }
//   } catch (error) {
//     setLoading(false);
//     //console.log(error);
//   }
// }

// export async function makePutRequest(
//   setLoading,
//   endpoint,
//   data,
//   resourceName,
//   redirect,
//   reset
// ) {
//   try {
//     setLoading(true);
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//     const response = await fetch(`${baseUrl}/${endpoint}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (response.ok) {
//       //console.log(response);
//       setLoading(false);
//       toast.success(`${resourceName} Updated Successfully`);
//       redirect();
//     } else {
//       setLoading(false);
//       toast.error("Something Went wrong");
//     }
//   } catch (error) {
//     setLoading(false);
//     //console.log(error);
//   }
// }

import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset = () => {},
  redirect = () => {}
) {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      throw new Error("Base URL is not defined. Please check your environment variables.");
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (response.ok) {
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      redirect();
    } else {
      const errorMessage = response.status === 409 
        ? "The Giving Warehouse Stock is NOT Enough" 
        : "Something Went Wrong";
      toast.error(errorMessage);
    }
  } catch (error) {
    setLoading(false);
    toast.error("An unexpected error occurred");
    console.error("POST Request Error:", error);
  }
}

export async function makePutRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  redirect = () => {},
  reset = () => {}
) {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined. Please check your environment variables.");
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (response.ok) {
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
    } else {
      toast.error("Something Went Wrong");
    }
  } catch (error) {
    setLoading(false);
    toast.error("An unexpected error occurred");
    console.error("PUT Request Error:", error);
  }
}
