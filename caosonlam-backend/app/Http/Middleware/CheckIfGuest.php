<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckIfGuest
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (Auth::check()) {
            // Nếu đã đăng nhập, chuyển hướng người dùng đến trang chính hoặc trang khác
            return redirect('/home'); // Thay đổi '/home' theo yêu cầu của bạn
        }

        return $next($request);
    }
}

