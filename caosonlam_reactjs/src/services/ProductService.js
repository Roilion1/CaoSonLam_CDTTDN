import httpAxios from "./httpAxios"

const ProductService ={
    index: async ()=>{
        return await httpAxios.get(`product`);
    },
    trash: async ()=>{
        return await httpAxios.get(`product/trash`);
    },
    show: async (id)=>{
        return await httpAxios.get(`product/show/${id}`);
    },
    insert: async (data)=>{
        return await httpAxios.post(`product/insert`,data);
    },
    update: async (data,id)=>{
        return await httpAxios.post(`product/update/${id}`, data);
    },
    status: async (id)=>{
        return await httpAxios.get(`product/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`product/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`product/restore/${id}`);
    },
    destroy: async (id)=>{
        return await httpAxios.delete(`product/destroy/${id}`);
    },
    add: async (product) => {
        console.log('Data to be sent:', product);
        const response = await httpAxios.post('product/store', product);
        console.log('Response from API:', response);
        return response.data;
    },
}

export default ProductService;