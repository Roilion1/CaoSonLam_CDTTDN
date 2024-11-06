import httpAxios from "./httpAxios";

const ProductImageService = {
    index: async () => {
        return await httpAxios.get(`productimage`);
    },
    trash: async () => {
        return await httpAxios.get(`productimage/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`productimage/show/${id}`);
    },
    insert: async (data) => {
        return await httpAxios.post(`productimage/insert`, data);
    },
    update: async (data, id) => {
        return await httpAxios.post(`productimage/update/${id}`, data);
    },
    status: async (id) => {
        return await httpAxios.get(`productimage/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`productimage/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`productimage/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`productimage/destroy/${id}`);
    },
};

export default ProductImageService;
