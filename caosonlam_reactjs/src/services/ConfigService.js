import httpAxios from "./httpAxios";

const ConfigService = {
    index: async () => {
        return await httpAxios.get('config');
    },
    trash: async () => {
        return await httpAxios.get('config/trash');
    },
    show: async (id) => {
        return await httpAxios.get(`config/show/${id}`);
    },
    store: async (data) => {
        return await httpAxios.post('config/store', data);
    },
    update: async (data, id) => {
        return await httpAxios.post(`config/update/${id}`, data);
    },
    status: async (id)=>{
        return await httpAxios.get(`config/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`config/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`config/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`config/destroy/${id}`);
    },
    replyContact: async (id) => {
        return await httpAxios.post(`config/reply/${id}`);
    },
    add: async (config) => {
        console.log('Data to be sent:', config);
        const response = await httpAxios.post('config/store', config);
        console.log('Response from API:', response);
        return response.data;
    },
};

export default ConfigService;
