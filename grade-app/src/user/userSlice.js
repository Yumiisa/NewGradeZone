import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const profileAPi = createApi({
    reducerPath: 'profile',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders:(headers, {getState}) =>{
            getState()
            const {auth} = getState()
            const {token} =auth
            console.log(token)
            if(token){
                headers.set('Authorization', token)
            }
            return headers
        },
    }),
    endpoints: (builder) =>({
        getProfileUsers:builder.query({
            query:(action)=>({
                url:`api/${action.url}`
            })
            
        })
    })
})
// export const { useGetProfileUsersQuery } = profileAPi;
