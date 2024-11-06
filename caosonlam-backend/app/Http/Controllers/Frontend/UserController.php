<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    // Đăng ký người dùng
    public function register(StoreUserRequest $request)
    {
        // Tạo mới người dùng
        $user = new User();
        $user->name = $request->name;
        $user->fullname = $request->fullname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password); // Mã hóa mật khẩu
        $user->gender = $request->gender;
        $user->address = $request->address;
        $user->roles = $request->roles;
        $user->status = 1;
        $user->created_by = Auth::id() ?? 1;
        $user->created_at = now();

        // Lưu ảnh đại diện
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/userImages'), $fileName);
            $user->thumbnail = $fileName;
        }

        // Lưu người dùng vào cơ sở dữ liệu
        if ($user->save()) {
            // Tạo token cho người dùng mới
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'status' => true,
                'message' => 'Đăng ký thành công',
                'user' => $user,
                'thumbnail_url' => asset('images/userImages/' . $user->thumbnail),
                'token' => $token // Trả về token JWT
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể đăng ký'
        ]);
    }

    // Đăng nhập người dùng
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password'); // Lấy email và password từ request

        // Kiểm tra thông tin đăng nhập
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401); // Nếu không thành công, trả về lỗi 401
        }

        // Lấy thông tin người dùng sau khi đăng nhập thành công
        $user = auth()->user();

        return response()->json([
            'token' => $token, // Trả về token JWT
            'user' => $user // Trả về thông tin người dùng
        ]);
    }

    // Lấy thông tin quên mật khẩu
    public function getForget()
    {
        return response()->json([
            'status' => true,
            'message' => 'Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu.'
        ]);
    }

    // Xử lý yêu cầu quên mật khẩu
    public function postForget(Request $request)
    {
        // Xác thực email
        $request->validate(['email' => 'required|email|exists:users,email']);

        // Gửi email đặt lại mật khẩu
        $status = Password::sendResetLink($request->only('email'));

        return $status == Password::RESET_LINK_SENT
            ? response()->json(['status' => true, 'message' => 'Link đặt lại mật khẩu đã được gửi đến email của bạn.'])
            : response()->json(['status' => false, 'message' => 'Không thể gửi link đặt lại mật khẩu.']);
    }
}
