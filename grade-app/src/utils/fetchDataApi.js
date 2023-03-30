import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:5000',
  // other axios config options can go here
});
export const getDataApi = async (url,token) => {
    const res = await instance.get(`/api/${url}`,{
        headers : {Authorization : token}
    })
    return res
}

export const patchDataApi = async (url,post,token) => {
    const res = await instance.patch(`/api/${url}`,post,{
        headers:{Authorization: token}
    })
     return res
}

export const putDataApi = async (url,post,token) => {
    const res = await instance.put(`/api/${url}`,post,{
        headers:{Authorization: token}
    })
     return res
}


export const postDataApi = async (url, post, token) => {
  try {
    const response = await instance.post(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDataApi = async (url,token) => {
    const res = await instance.delete(`/api/${url}`,{
        headers:{Authorization: token}
    })
     return res
}