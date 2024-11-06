<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreBrandRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Cho phép mọi người dùng thực hiện yêu cầu này
    }

    // Khai báo các ràng buộc cho Brand
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:brand,slug',
            'image' => [
                'required',
                'image',
                'mimes:jpeg,png,webp',
                'max:2048' // Giới hạn kích thước file là 2MB
            ],
        ];
    }

    // Khai báo thông báo lỗi
    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống',
            'slug.required' => 'Slug không được để trống',
            'slug.unique' => 'Slug đã tồn tại',
            'image.required' => 'Hình ảnh là bắt buộc',
            'image.image' => 'File phải là hình ảnh',
            'image.mimes' => 'Hình ảnh phải có định dạng jpeg, png hoặc webp',
            'image.max' => 'Hình ảnh không được vượt quá 2MB'
        ];
    }

    // Xử lý phản hồi lỗi xác thực
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ]));
    }
}
