<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:product,slug',
            'category_id' => 'required|exists:category,id',
            'brand_id' => 'required|exists:brand,id',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'status' => 'nullable|boolean',                 
            'thumbnail.*' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống',
            'slug.required' => 'Slug không được để trống',
            'slug.unique' => 'Slug đã tồn tại, vui lòng chọn slug khác',
            'category_id.required' => 'Danh mục không được để trống',
            'category_id.exists' => 'Danh mục không tồn tại',
            'brand_id.required' => 'Thương hiệu không được để trống',
            'brand_id.exists' => 'Thương hiệu không tồn tại',
            'price.required' => 'Giá không được để trống',
            'price.numeric' => 'Giá phải là một số',
            'price.min' => 'Giá không thể nhỏ hơn 0',
            'thumbnail.*.required' => 'Hình ảnh không được để trống',
            'thumbnail.*.image' => 'Tệp tải lên phải là hình ảnh',
            'thumbnail.*.mimes' => 'Hình ảnh phải có định dạng jpeg, png hoặc jpg',
            'thumbnail.*.max' => 'Kích thước hình ảnh không được vượt quá 2MB',
        ];
    }
}
