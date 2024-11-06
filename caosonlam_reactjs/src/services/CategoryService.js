import httpAxios from "./httpAxios"

const CategoryService ={
    index: async ()=>{
        return await httpAxios.get(`category`);
    },
    trash: async ()=>{
        return await httpAxios.get(`category/trash`);
    },
    show: async (id)=>{
        return await httpAxios.get(`category/show/${id}`);
    },
    insert: async (data)=>{
        return await httpAxios.post(`category/insert`,data);
    },
    update: async (data,id)=>{
        return await httpAxios.post(`category/update/${id}`, data);
    },
    status: async (id)=>{
        return await httpAxios.get(`category/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`category/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`category/restore/${id}`);
    },
    destroy: async (id)=>{
        return await httpAxios.delete(`category/destroy/${id}`);
    },
    add: async (category) => {
        console.log('Data to be sent:', category);
        const response = await httpAxios.post('category/store', category);
        console.log('Response from API:', response);
        return response.data;
    },
}

export default CategoryService;