<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'phone' => 'nullable|string|max:15',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'status' => 'nullable|in:active,inactive',
            'replay_id' => 'nullable|integer|exists:contacts,id', // Phản hồi liên hệ, phải tồn tại trong bảng `contacts`
            'user_id' => 'nullable|integer|exists:users,id', // Người tạo, phải tồn tại trong bảng `users`
            'updated_by' => 'nullable|integer|exists:users,id', // Người cập nhật, phải tồn tại trong bảng `users`
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
            'replay_id.exists' => 'ID phản hồi không tồn tại.',
            'user_id.exists' => 'ID người dùng không tồn tại.',
            'updated_by.exists' => 'ID người cập nhật không tồn tại.',
        ];
    }
}
