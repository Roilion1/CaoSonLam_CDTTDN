<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Bạn có thể thay đổi điều này nếu cần kiểm tra quyền truy cập
    }

    public function rules()
    {
        return [
           //
        ];
    }
}
