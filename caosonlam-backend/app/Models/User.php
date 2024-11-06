<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable; // Sử dụng trait Notifiable nếu bạn muốn sử dụng thông báo

    protected $table = 'user'; // Tên bảng trong cơ sở dữ liệu
    protected $fillable = ['email', 'password']; // Các thuộc tính có thể được gán

    protected $hidden = ['password', 'remember_token']; // Ẩn mật khẩu và token khỏi JSON

    /**
     * Lấy định danh của người dùng cho JWT
     *
     * @return string
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Lấy các thuộc tính mà JWT có thể bao gồm.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
