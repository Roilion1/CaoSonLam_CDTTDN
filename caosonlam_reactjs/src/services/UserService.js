import httpAxios from "./httpAxios";

const UserService = {
    index: async () => {
        return await httpAxios.get(`user`);
    },
    trash: async () => {
        return await httpAxios.get(`user/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`user/show/${id}`);
    },
    store: async (data) => {
        return await httpAxios.post(`user/store`, data);
    },
    update: async (data, id) => {
        return await httpAxios.post(`user/update/${id}`, data);
    },
    status: async (id) => {
        return await httpAxios.get(`user/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`user/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`user/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`user/destroy/${id}`);
    },
    add: async (user) => {
        console.log('Data to be sent:', user);
        const response = await httpAxios.post('user/store', user);
        console.log('Response from API:', response);
        return response.data;
    },
};

export default UserService;
