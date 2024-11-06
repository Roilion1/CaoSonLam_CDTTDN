<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements AuthenticatableContract
{
    use Notifiable; // Sử dụng trait Notifiable nếu bạn muốn sử dụng thông báo

    protected $table = 'user'; // Tên bảng trong cơ sở dữ liệu
    protected $fillable = ['email', 'password']; // Các thuộc tính có thể được gán

    protected $hidden = ['password', 'remember_token']; // Ẩn mật khẩu và token khỏi JSON
}
