import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { salesforce } from '@/axios/actions/salesforce';

export const fetchUser:any = createAsyncThunk(
  'user',
  async () => {
    try {
      const response = await salesforce({ method: 'GET', url: 'objects' });
      console.log(response,'from thunk:::');
      return response.data;
    } catch (error:any) {
      console.log(error);
      throw error
    }
  }
);

const initialState = {
  user: null,  
  loading:true,
  error:null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(init,action){
      const state = init;
      state.user = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        console.log('failed',action);
        
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const {
  setUser
} = AuthSlice.actions;
export default AuthSlice.reducer;

