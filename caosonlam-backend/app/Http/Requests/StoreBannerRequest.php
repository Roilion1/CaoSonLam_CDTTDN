<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreBannerRequest extends FormRequest
{
    public function authorize(): bool
    {
            return true;//true
    }

    //Khai báo ràng buộc
    public function rules(): array
    {
            return [
                'name' => 'required',
                'image' => [
                    'required',
                    'image',
                    'mimes:jpeg,png',
                    'mimetypes:image/jpeg,image/png,image/jpg',
                ],
            ];

    }

    //Khai báo thông báo
    public function messages()
    {
            return [
                'name.required' => 'Tên không được để trống'
            ];

    }

    //Xuất thông báo nếu bị lỗi
    public function failedValidation(Validator $validator)
    {
            throw new HttpResponseException(response()->json([
                'status'   => false,
                'message'   => 'Validation errors',
                'banners'      => $validator->errors()
            ]));
    }

}
