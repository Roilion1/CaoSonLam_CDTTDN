<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Xác định quyền truy cập của người dùng.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Định nghĩa các quy tắc kiểm tra cho từng trường dữ liệu.
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:15',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'nullable|integer',
        ];
    }

    /**
     * Thông báo lỗi tùy chỉnh (nếu cần).
     */
    public function messages()
    {
        return [
            'name.required' => 'Tên không được bỏ trống.',
            'email.required' => 'Email không được bỏ trống.',
            'email.email' => 'Email không hợp lệ.',
            'title.required' => 'Tiêu đề không được bỏ trống.',
            'content.required' => 'Nội dung không được bỏ trống.',
        ];
    }
}
