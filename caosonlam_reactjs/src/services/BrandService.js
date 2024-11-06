import httpAxios from "./httpAxios"

const BrandService ={
    index: async ()=>{
        return await httpAxios.get(`brand`);
    },
    trash: async ()=>{
        return await httpAxios.get(`brand/trash`);
    },
    show: async (id)=>{
        return await httpAxios.get(`brand/show/${id}`);
    },
    insert: async (data)=>{
        return await httpAxios.post(`brand/insert`,data);
    },
    update: async (data,id)=>{
        return await httpAxios.post(`brand/update/${id}`, data);
    },
    status: async (id)=>{
        return await httpAxios.get(`brand/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`brand/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`brand/restore/${id}`);
    },
    destroy: async (id)=>{
        return await httpAxios.delete(`brand/destroy/${id}`);
    },
    add: async (brand) => {
        console.log('Data to be sent:', brand);
        const response = await httpAxios.post('brand/store', brand);
        console.log('Response from API:', response);
        return response.data;
    },
}

export default BrandService;