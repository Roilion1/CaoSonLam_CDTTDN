<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBrandRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Đảm bảo rằng người dùng có quyền cập nhật thương hiệu
        return true; // Hoặc kiểm tra phân quyền cụ thể nếu cần
    }

    public function rules(): array
    {
        return [
            'name' => 'required',
            'slug' => 'required|unique:brand,slug,' . $this->route('id'), // Kiểm tra slug
            'description' => 'nullable',
            'sort_order' => 'integer',
            'status' => 'required|in:1,2', // Giả sử status có thể là 1 hoặc 2
            'image' => 'image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống',
            'slug.required' => 'Slug không được để trống',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors(),
        ], 422));
    }
}
