import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export const useUserStore = create((set, get) => ({
  currentUser: null,
  loading: false,
  error: null,
  signedIn:false,

  formData: {
    username: "",
    fname: "",
    lname: "",
    password: "",
  },

  setFormData: (formData) => set({ formData }),
  resetFormData: () =>
    set({ formData: { username: "", fname: "", lname: "", password: "" } }),

  addUser: async () => {
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${API_URL}/api/users`, formData);
      set({signedIn:true});
      console.log("User Added Successfully!");
      toast.success(`Welcome ${formData.fname}!`);
      get().resetFormData();
    } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.success("Username already exists. Please Login!");
    } else {
      toast.error("Failed to Add User, Try again!");
    }      
    console.log("Error occured which adding new user", error);
    } finally {
      set({ loading: false });
    }
  },

  checkUser: async (username) => {
    set({ loading: true });
    const { formData }=get();
    try {
      const response = await axios.get(`${API_URL}/api/users/${username}`);
      const un = response.data.data.username;
      const fn = response.data.data.fname;
      const ln = response.data.data.lname;
      const pass = response.data.data.password;
      console.log(formData.password);
      if(formData.password===pass){
        set({signedIn:true});
        console.log("User Added Successfully");
        get().resetFormData();
        toast.success(`Welcome ${fn}!`);
      } else{
        console.log("Wrong password");
        toast.error("Wrong username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("First time? Please sign up first!");
      } else {
        toast.error("Internal Server Error");
      }
      console.log("Error while fetching user:", error);
    } finally{
      set({loading:false});
    }
  },
}));
